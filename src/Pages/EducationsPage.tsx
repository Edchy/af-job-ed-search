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

// todo maybe: cache search response in ls for faster acces when navigating back and forth
export default function EducationPage() {
  const [educationAds, setEducationAds] = useState<EducationSearchResult>({
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
    if (q) {
      let cancelled = false;

      (async () => {
        setLoading(true);
        try {
          const result = await fetchEducations(q);
          if (!cancelled) {
            setEducationAds(result);
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
    }
  }, [searchParams]);

  async function handleSearch(e: CustomEvent<string>) {
    const query = e.detail;
    if (!query) return;
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
        afVariation={LayoutBlockVariation.PROFILE}
        // afMarginBottom
        // afMarginTop
        aria-busy={loading}
      >
        <DigiLayoutContainer afVerticalPadding className="search-container">
          <DigiTypography>
            <h2>Sök utbildning</h2>
          </DigiTypography>
          <DigiFormInputSearch
            afLabel="Sök ett eller flera ord"
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
                <h2>{educationAds.hits} Annonser</h2>
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
