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

import type { JobAd } from "../Models/JobModel";
import { useState } from "react";

export default function ContactPage() {
  const [searchResults, setSearchResults] = useState<JobAd[]>([]);
  const [searchMeta, setSearchMeta] = useState({ total: 0, positions: 0 });
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  async function handleSearch(e: CustomEvent<string>) {
    const searchQuery = e.detail;
    console.log(searchQuery);
    if (!searchQuery) {
      console.log("Inga sökord angivna");
      return;
    }

    setLoading(true);
    setHasSearched(true);
    try {
      const res = await fetch(
        `https://jobsearch.api.jobtechdev.se/search?q=${searchQuery}&offset=0&limit=10`
      );
      const data = await res.json();
      setSearchResults(data.hits);
      setSearchMeta({
        total: data.total.value,
        positions: data.positions,
      });
      console.log(data.positions);
      console.log(data.total.value);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <DigiLayoutBlock
      afVariation={LayoutBlockVariation.PRIMARY}
      aria-busy={loading}
    >
      <DigiTypography>
        <h2>Sök efter jobb</h2>
      </DigiTypography>
      <DigiFormInputSearch
        afLabel="Yrke, kompetens eller företag"
        afVariation={FormInputSearchVariation.MEDIUM}
        afType={FormInputType.SEARCH}
        afButtonText="Sök"
        onAfOnSubmitSearch={handleSearch}
      ></DigiFormInputSearch>

      {/* Loading skeleton (kept mounted; toggled via CSS to avoid DOM churn) */}
      <div
        style={{ display: loading ? "block" : "none" }}
        aria-hidden={!loading}
      >
        <DigiLayoutBlock>
          <DigiLoaderSkeleton
            afVariation={LoaderSkeletonVariation.SECTION}
            afCount={4}
          ></DigiLoaderSkeleton>
        </DigiLayoutBlock>
      </div>

      {/* Results list (hidden while loading) */}
      <div
        style={{ display: loading ? "none" : "block" }}
        aria-hidden={loading}
      >
        {hasSearched && (
          <DigiTypography role="status" aria-live="polite">
            <p>
              <strong>{searchMeta.total} annonser</strong> med{" "}
              {searchMeta.positions} jobb
            </p>
          </DigiTypography>
        )}
        {searchResults.map((job, idx) => (
          <DigiLayoutContainer key={job.id || `job-${idx}`}>
            <DigiTypography>
              <h3>{job.headline}</h3>
            </DigiTypography>
          </DigiLayoutContainer>
        ))}
      </div>
    </DigiLayoutBlock>
  );
}
