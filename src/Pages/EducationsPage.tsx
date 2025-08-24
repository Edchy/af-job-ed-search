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
  const q = searchParams.get("q") || "";
  const [query, setQuery] = useSessionStorage<string>("educationAdsQuery", q);
  const [loading, setLoading] = useState(false);

  async function search(queryToSearch: string) {
    if (!queryToSearch || queryToSearch === query) {
      // setEducationAds({ hits: 0, result: [] });
      // setQuery("");
      // setSearchParams({}, { replace: true });
      return;
    }
    console.log("Searching for:", queryToSearch);
    setLoading(true);
    setSearchParams({ q: queryToSearch }, { replace: true });
    try {
      const result = await fetchEducations(queryToSearch);
      setEducationAds(result);
      setQuery(queryToSearch);
    } catch (error) {
      console.error("Error fetching educations:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const qFromUrl = searchParams.get("q");
    if (qFromUrl && qFromUrl !== query) {
      search(qFromUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  function handleSearchEvent(e: CustomEvent<string>) {
    search(e.detail);
  }

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
            afButtonText={(loading && "laddar...") || "Sök"}
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
          {/* Keep exactly ONE stable child for the web component to slot */}
          <div className="results-slot">
            {/* Loading */}
            <div aria-live="polite" hidden={!loading}>
              <DigiLoaderSkeleton
                afVariation={LoaderSkeletonVariation.SECTION}
                afCount={10}
              ></DigiLoaderSkeleton>
            </div>

            {/* Empty state */}
            <div hidden={!(!loading && q && (educationAds.hits ?? 0) === 0)}>
              <DigiTypography>
                <h3>Inga utbildningar hittades för "{q}".</h3>
                <p>Menade du (förslag här)</p>
              </DigiTypography>
            </div>

            {/* Results */}
            <div hidden={!(!loading && (educationAds.hits ?? 0) > 0)}>
              <DigiTypography>
                <p>
                  Visar <strong>{educationAds.hits} annonser</strong> för
                  sökningen "{query}"
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
