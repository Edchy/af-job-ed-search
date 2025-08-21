import {
  FormInputSearchVariation,
  FormInputType,
  LayoutBlockContainer,
  LayoutBlockVariation,
  LayoutColumnsElement,
  LayoutColumnsVariation,
  LoaderSkeletonVariation,
  FormSelectVariation,
  FormCheckboxVariation,
} from "@digi/arbetsformedlingen";
import {
  DigiFormInputSearch,
  DigiLayoutBlock,
  DigiLayoutColumns,
  DigiLayoutContainer,
  DigiLoaderSkeleton,
  DigiTypography,
  DigiFormSelect,
  DigiFormCheckbox,
} from "@digi/arbetsformedlingen-react";

import type { IJobAd } from "../Models/JobModel";
import { useState } from "react";
import JobAd from "../Components/JobAd";

type SearchMeta = {
  total: number;
  positions: number;
};

export default function ContactPage() {
  const [searchResults, setSearchResults] = useState<IJobAd[]>([]);
  const [searchMeta, setSearchMeta] = useState<SearchMeta | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSearch(e: CustomEvent<string>) {
    const searchQuery = e.detail;
    console.log(searchQuery);
    if (!searchQuery) {
      console.log("Inga sökord angivna");
      return;
    }

    setLoading(true);
    setSearchMeta(null); // reset meta while loading
    try {
      const res = await fetch(
        `https://jobsearch.api.jobtechdev.se/search?q=${searchQuery}&offset=0&limit=10`
      );
      const data = await res.json();
      setSearchResults(data.hits);
      setSearchMeta({
        total: data?.total?.value ?? 0,
        positions: data?.positions ?? 0,
      });
      console.log(data.positions);
      console.log(data.total.value);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  }
  console.log(searchResults);

  return (
    <DigiLayoutBlock
      // afMarginTop
      afContainer={LayoutBlockContainer.FLUID}
      afVariation={LayoutBlockVariation.SECONDARY}
    >
      <DigiLayoutContainer>
        <DigiTypography>
          <h2 style={{ fontWeight: 700 }}>Sök jobb</h2>
        </DigiTypography>
      </DigiLayoutContainer>
      <DigiLayoutContainer>
        <DigiFormInputSearch
          afLabel="Titel, beskrivning, plats eller företag"
          afVariation={FormInputSearchVariation.LARGE}
          afType={FormInputType.SEARCH}
          afButtonText="Sök"
          onAfOnSubmitSearch={handleSearch}
        ></DigiFormInputSearch>
      </DigiLayoutContainer>
      <DigiLayoutContainer className="job-list">
        {searchMeta !== null && (
          <DigiTypography role="status" aria-live="polite">
            <p>
              <strong>{searchMeta.total} annonser</strong> med{" "}
              {searchMeta.positions} jobb
            </p>
          </DigiTypography>
        )}
        {searchResults.map((job, idx) => (
          <JobAd job={job} key={job.id || `job-${idx}`} />
        ))}
      </DigiLayoutContainer>
    </DigiLayoutBlock>
  );
}
