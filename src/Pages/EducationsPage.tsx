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
  // const [educationAds, setEducationAds] = useState<EducationSearchResult>({
  //   hits: 0,
  //   result: [],
  // });
  const [educationAds, setEducationAds] =
    useSessionStorage<EducationSearchResult>("educationAds", {
      hits: 0,
      result: [],
    });
  // searchParams för att behålla sökningen vid navigering
  const [searchParams, setSearchParams] = useSearchParams();
  // searchQuery för att behålla sökfrågan
  // const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const q = searchParams.get("q") || "";

  useEffect(() => {
    const q = searchParams.get("q");
    if (!q) return;

    // Check if we already have results for this query
    const lastQuery = sessionStorage.getItem("educationAdsQuery");
    if (educationAds.result?.length && q === lastQuery) {
      // Already have results for this query
      return;
    }

    let cancelled = false;

    (async () => {
      setLoading(true);
      try {
        const result = await fetchEducations(q);
        if (!cancelled) {
          setEducationAds(result);
          sessionStorage.setItem("educationAdsQuery", q);
        }
      } catch (error) {
        if (!cancelled) {
          console.error("Error fetching educations:", error);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [searchParams]);

  async function handleSearch(e: CustomEvent<string>) {
    const query = e.detail;
    if (!query) return;
    // replace, för att inte gå bakåt till tidigare sökningar
    setSearchParams({ q: query }, { replace: true });
  }

  console.log(educationAds);

  useEffect(() => {
    console.log("✅ Component mounted");

    return () => {
      console.log("❌ Component unmounted");
    };
  }, []);

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
            onAfOnSubmitSearch={handleSearch}
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
