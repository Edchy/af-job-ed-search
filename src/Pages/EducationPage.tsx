import {
  FormInputSearchVariation,
  FormInputType,
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
import { fetchEducations } from "../services/educationService";

export default function EducationPage() {
  const [educationAds, setEducationAds] = useState<IEdAd[]>([]);
  // searchParams för att behålla sökningen vid navigering
  const [searchParams, setSearchParams] = useSearchParams();
  // searchQuery för att behålla sökfrågan
  // const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const q = searchParams.get("q") || "";
  // check for query param on mount
  useEffect(() => {
    const q = searchParams.get("q");
    if (q) {
      // simulate a search with that query
      (async () => {
        setLoading(true);
        try {
          const results = await fetchEducations(q);
          setEducationAds(results);
        } catch (error) {
          console.error("Error fetching educations:", error);
        } finally {
          setLoading(false);
        }
      })();
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
    <DigiLayoutBlock aria-busy={loading}>
      <DigiLayoutBlock>
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
      </DigiLayoutBlock>
      <DigiLayoutBlock>
        {!loading && educationAds.length > 0 && (
          <DigiLayoutContainer>
            {educationAds.map((ed: IEdAd) => (
              <EdAd key={ed.id} ed={ed} />
            ))}
          </DigiLayoutContainer>
        )}
      </DigiLayoutBlock>
    </DigiLayoutBlock>
  );
}
