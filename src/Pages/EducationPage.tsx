import {
  FormInputSearchVariation,
  FormInputType,
  LayoutBlockVariation,
} from "@digi/arbetsformedlingen";
import {
  DigiFormInputSearch,
  DigiLayoutBlock,
  DigiLayoutContainer,
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
    // setLoading(true);
    setSearchParams({ q: query }, { replace: true });
    // try {
    //   const results = await fetchEducations(query);
    //   setEducationAds(results);
    // } catch (error) {
    //   console.error("Error fetching educations:", error);
    // } finally {
    //   setLoading(false);
    // }
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
      <DigiLayoutBlock afMarginBottom afMarginTop aria-busy={loading}>
        <DigiLayoutContainer>
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
        afVariation={LayoutBlockVariation.PROFILE}
        afMarginBottom
        afMarginTop
      >
        {!loading && educationAds.result.length > 0 && (
          <DigiLayoutContainer>
            <DigiTypography>
              <h2>{educationAds.hits} Annonser</h2>
            </DigiTypography>
            {educationAds.result.map((ed: IEdAd) => (
              <EdAd key={ed.id} ed={ed} />
            ))}
          </DigiLayoutContainer>
        )}
      </DigiLayoutBlock>
    </>
  );
}
