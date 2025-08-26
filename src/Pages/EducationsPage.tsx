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
  DigiTypography,
} from "@digi/arbetsformedlingen-react";

import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import EdAd from "../Components/EdAd";
import type { IEdAd } from "../Models/EdModel";
import {
  fetchEducations,
  type EducationSearchResult,
} from "../services/educationService";

import { useSessionStorage } from "../hooks/useSessionStorage";

// last query är till för att kunna skippa att fetcha data igen när man navigerar tillbaka, om lastQuery är samma som nuvarande query så skippar vi fetch och använder cached data i session storage istället.
export default function EducationPage() {
  const [educationAds, setEducationAds] = useSessionStorage<
    EducationSearchResult & { lastQuery?: string }
  >("edAds", {
    hits: 0,
    result: [],
    lastQuery: "",
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q") || "";
  const [loading, setLoading] = useState(false);

  function handleSearchEvent(e: CustomEvent<string>) {
    const queryFromSearchInput = e.detail;
    setSearchParams({ q: queryFromSearchInput });
  }

  useEffect(() => {
    if (!q) return;

    if (educationAds.lastQuery === q && educationAds.hits > 0) {
      return;
    }

    setLoading(true);
    const fetchData = async () => {
      try {
        const result = await fetchEducations(q);
        setEducationAds({ ...result, lastQuery: q });
      } catch (error) {
        console.error("Error fetching educations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  const showLoading = loading;
  const showEmptyState = !loading && q && (educationAds.hits ?? 0) === 0;
  const showResults = !loading && (educationAds.hits ?? 0) > 0;

  return (
    <>
      <DigiLayoutBlock
        afVariation={LayoutBlockVariation.TERTIARY}
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
        afMarginBottom
        afMarginTop
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
                <h3>Inga utbildningar hittades för "{q}".</h3>
                <p>Menade du (förslag här)</p>
              </DigiTypography>
            </div>

            {/* Results */}
            <div hidden={!showResults}>
              <DigiTypography>
                <p>
                  Visar <strong>{educationAds.hits} annonser</strong> för
                  sökningen "{q}"
                </p>
              </DigiTypography>
              {educationAds.result?.map((ed: IEdAd) => (
                <EdAd key={ed.id} education={ed} />
              ))}
              <DigiLayoutContainer afVerticalPadding>
                <DigiTypography>lägg till paginering</DigiTypography>
              </DigiLayoutContainer>
            </div>
          </div>
        </DigiLayoutContainer>
      </DigiLayoutBlock>
    </>
  );
}
