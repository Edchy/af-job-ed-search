import {
  FormInputSearchVariation,
  FormInputType,
  LayoutBlockContainer,
  LayoutBlockVariation,
  LayoutColumnsElement,
  LayoutColumnsVariation,
  LoaderSkeletonVariation,
} from "@digi/arbetsformedlingen";
import {
  DigiFormInputSearch,
  DigiLayoutBlock,
  DigiLayoutColumns,
  DigiLayoutContainer,
  DigiLoaderSkeleton,
  DigiTypography,
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
      afVariation={LayoutBlockVariation.SECONDARY}
      aria-busy={loading}
    >
      <DigiLayoutBlock afContainer={LayoutBlockContainer.STATIC}>
        <DigiTypography>
          <h2>Sök efter jobb</h2>
        </DigiTypography>
        <DigiFormInputSearch
          afLabel="Sök ett eller flera ord"
          afVariation={FormInputSearchVariation.MEDIUM}
          afType={FormInputType.SEARCH}
          afButtonText="Sök"
          onAfOnSubmitSearch={handleSearch}
        ></DigiFormInputSearch>
      </DigiLayoutBlock>
      <div
        style={{ display: loading ? "block" : "none" }}
        aria-hidden={!loading}
      >
        <DigiLayoutContainer>
          <DigiLoaderSkeleton
            afVariation={LoaderSkeletonVariation.SECTION}
            afCount={4}
          ></DigiLoaderSkeleton>
        </DigiLayoutContainer>
      </div>

      <div
        style={{ display: loading ? "none" : "block" }}
        aria-hidden={loading}
      >
        <DigiLayoutContainer>
          {searchMeta !== null && (
            <DigiTypography role="status" aria-live="polite">
              <p>
                <strong>{searchMeta.total} annonser</strong> med{" "}
                {searchMeta.positions} jobb
              </p>
            </DigiTypography>
          )}
        </DigiLayoutContainer>
        <DigiLayoutBlock afContainer={LayoutBlockContainer.FLUID}>
          {searchResults.map((job, idx) => (
            <JobAd job={job} key={job.id || `job-${idx}`} />
          ))}
        </DigiLayoutBlock>
      </div>
    </DigiLayoutBlock>
  );
}
