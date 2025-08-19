import {
  FormInputSearchVariation,
  FormInputType,
  LayoutBlockContainer,
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

import { useState } from "react";
import EdAd from "../Components/EdAd";

export default function ContactPage() {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleSearch(e: CustomEvent<string>) {
    const searchQuery = e.detail;
    console.log(searchQuery);
    // if (!searchQuery) {
    //   console.log("Inga sökord angivna");
    //   return;
    // }

    setLoading(true);
    try {
      const res = await fetch(
        `https://jobed-connect-api.jobtechdev.se/v1/educations?query=polis`
      );
      const data = await res.json();
      setSearchResults(data.result);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  }
  console.log(searchResults);

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
        ></DigiFormInputSearch>
      </DigiLayoutBlock>
      <DigiLayoutBlock>
        {!loading && searchResults.length > 0 && (
          <DigiLayoutContainer>
            {searchResults.map((result) => (
              <EdAd key={result.id} ed={result} />
            ))}
          </DigiLayoutContainer>
        )}
      </DigiLayoutBlock>
    </DigiLayoutBlock>
  );
}
