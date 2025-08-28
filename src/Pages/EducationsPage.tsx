import {
  FormInputSearchVariation,
  FormInputType,
  LayoutBlockVariation,
  LoaderSkeletonVariation,
} from "@digi/arbetsformedlingen";
import {
  DigiFormInputSearch,
  DigiLayoutBlock,
  DigiLayoutContainer,
  DigiLoaderSkeleton,
  DigiNavigationPagination,
  DigiTypography,
} from "@digi/arbetsformedlingen-react";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router";
import EdAd from "../Components/EdAd";
import type { IEdAd } from "../Models/EdModel";
import {
  fetchEducations,
  type EducationSearchResult,
} from "../services/educationService";

import { useSessionStorage } from "../hooks/useSessionStorage";

type CachedData = EducationSearchResult & {
  lastQuery?: string;
  lastPage?: number;
};
const initialValues = {
  hits: 0,
  result: [],
  lastQuery: "",
  lastPage: 1,
};

// last query & lastpage är till för att kunna skippa att fetcha data igen när man navigerar tillbaka, om lastQuery är samma som nuvarande query så skippar vi fetch och använder cached data i session storage istället genom att göra return innan fetch anropas i useEffect.
export default function EducationPage() {
  const [educationAds, setEducationAds] = useSessionStorage<CachedData>(
    "edAds",
    initialValues
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q") || "";
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const [loading, setLoading] = useState(false);

  const paginationRef = useRef<any>(null);

  function handleSearchEvent(e: CustomEvent<string>) {
    const queryFromSearchInput = e.detail;
    // trigger a new search
    setSearchParams({ q: queryFromSearchInput, page: "1" });
  }

  const handlePageChange = (newPage: number) => {
    setSearchParams({ q, page: `${newPage}` });
  };

  useEffect(() => {
    if (paginationRef.current?.afMSetCurrentPage) {
      paginationRef.current.afMSetCurrentPage(currentPage);
    }
    console.log("REF UPDATED");
  }, [currentPage]);

  useEffect(() => {
    // If no query in URL, but we have a cached lastQuery, restore it
    if (!q && educationAds.lastQuery) {
      setSearchParams({
        q: educationAds.lastQuery,
        page: `${educationAds.lastPage || 1}`,
      });
      return;
    }
    console.log(q);
    if (!q) return;

    // om senaste query är samma som nuvarande query och senaste sidan är samma som nuvarande sidan och vi har ett resultat = behöver vi inte fetcha igen
    if (
      educationAds.lastQuery === q &&
      educationAds.lastPage === currentPage &&
      educationAds.hits > 0
    ) {
      console.log("no need to fetch");
      return;
    }

    setLoading(true);
    const fetchData = async () => {
      try {
        const offset = (currentPage - 1) * 10;
        const result = await fetchEducations(q, offset);
        setEducationAds({ ...result, lastQuery: q, lastPage: currentPage });
      } catch (error) {
        console.error("Error fetching educations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, currentPage]);

  const showLoading = loading;
  const showEmptyState = !loading && q && (educationAds.hits ?? 0) === 0;
  const showResults = !loading && (educationAds.hits ?? 0) > 0;

  return (
    <>
      <DigiLayoutBlock
        afVariation={LayoutBlockVariation.PROFILE}
        // afMarginBottom
        // afMarginTop
        aria-busy={loading}
      >
        <DigiLayoutContainer afVerticalPadding className="search-container">
          <DigiTypography>
            <h1>Sök utbildning</h1>
          </DigiTypography>
          <DigiFormInputSearch
            afLabel="Ett eller flera ord"
            afVariation={FormInputSearchVariation.LARGE}
            afType={FormInputType.SEARCH}
            afButtonText="Sök"
            onAfOnSubmitSearch={handleSearchEvent}
            afValue={q}
          ></DigiFormInputSearch>
        </DigiLayoutContainer>
      </DigiLayoutBlock>
      <DigiLayoutBlock
        afVariation={LayoutBlockVariation.PRIMARY}
        // afMarginBottom
        // afMarginTop
      >
        <DigiLayoutContainer afVerticalPadding>
          {/* Problem med conditional rendering (webcomponents + react) -  */}
          <div className="results-slot">
            {/* Loading */}
            <div aria-live="polite" hidden={!showLoading}>
              <DigiLoaderSkeleton
                afVariation={LoaderSkeletonVariation.SECTION}
                afCount={10}
              ></DigiLoaderSkeleton>
            </div>

            {/* Empty state */}
            <div hidden={!showEmptyState}>
              <DigiTypography>
                <h3>
                  Inga utbildningar hittades för "{educationAds.lastQuery}".
                </h3>
                <p>Menade du (förslag här)</p>
              </DigiTypography>
            </div>

            {/* Results */}
            <div hidden={!showResults}>
              <DigiTypography>
                <p style={{ marginBottom: "1rem" }}>
                  <strong>{educationAds.hits} annonser</strong> för sökningen "
                  {educationAds.lastQuery}"
                </p>
              </DigiTypography>
              {educationAds.result?.map((ed: IEdAd) => (
                <EdAd key={ed.id} education={ed} />
              ))}
              <DigiLayoutContainer afVerticalPadding>
                <DigiNavigationPagination
                  ref={paginationRef}
                  afTotalPages={Math.ceil(educationAds.hits / 10)}
                  afInitActivePage={currentPage}
                  afCurrentResultStart={currentPage * 10 - 9}
                  afCurrentResultEnd={Math.min(
                    currentPage * 10,
                    educationAds.hits
                  )}
                  afTotalResults={educationAds.hits}
                  afResultName="utbildningar"
                  onAfOnPageChange={(e) => handlePageChange(e.detail)}
                ></DigiNavigationPagination>
              </DigiLayoutContainer>
            </div>
          </div>
        </DigiLayoutContainer>
      </DigiLayoutBlock>
    </>
  );
}
