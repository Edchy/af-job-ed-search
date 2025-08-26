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

export default function EducationPage() {
  const [educationAds, setEducationAds] =
    useSessionStorage<EducationSearchResult>("educationAds", {
      hits: 0,
      result: [],
    });
  // searchParams för att behålla sökningen vid navigering
  const [searchParams, setSearchParams] = useSearchParams();
  // det som finns i url:en. börjar som en tom sträng och sätts sedan till det som skrivs in i search funktionen (setSearchParams({ q: queryToSearch })
  const q = searchParams.get("q") || "";

  const [activeQuery, setActiveQuery] = useSessionStorage<string>(
    "educationAdsQuery",
    q
  );
  const [loading, setLoading] = useState(false);

  async function search(queryToSearch: string) {
    if (!queryToSearch) return;
    console.log("Searching for:", queryToSearch);
    setLoading(true);
    setSearchParams({ q: queryToSearch }, { replace: true }); // sätter sökparameter i URL:en
    try {
      const result = await fetchEducations(queryToSearch);
      setEducationAds(result);
      setActiveQuery(queryToSearch); // sätter den aktiva sökningen till det som söks
    } catch (error) {
      console.error("Error fetching educations:", error);
    } finally {
      setLoading(false);
    }
  }

  // håller resultat i sync med url parametern
  // så att användaren alltid ser samma resultat som i URL:en
  //
  useEffect(() => {
    const qFromUrl = searchParams.get("q");
    console.log("qFromUrl:", qFromUrl, "current activeQuery:", activeQuery);
    if (qFromUrl && qFromUrl !== activeQuery) {
      search(qFromUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  function handleSearchEvent(e: CustomEvent<string>) {
    const queryFromSearchInput = e.detail;
    search(queryFromSearchInput);
  }

  // Conditions for rendering different states
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
                  sökningen "{activeQuery}"
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
