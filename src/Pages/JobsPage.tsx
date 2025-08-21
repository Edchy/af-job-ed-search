import {
  FormInputSearchVariation,
  FormInputType,
  LayoutBlockContainer,
  LayoutBlockVariation,
} from "@digi/arbetsformedlingen";
import {
  DigiFormInputSearch,
  DigiLayoutBlock,
  DigiLayoutContainer,
  DigiTypography,
} from "@digi/arbetsformedlingen-react";

import type { IJobAd } from "../Models/JobModel";
import { useState } from "react";
import JobAd from "../Components/JobAd";
import { useEffect } from "react";
import { useSearchParams } from "react-router";

type SearchMeta = {
  total: number;
  positions: number;
};

export default function ContactPage() {
  const [jobs, setJobs] = useState<IJobAd[]>([]);
  const [searchMeta, setSearchMeta] = useState<SearchMeta | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQ = searchParams.get("q") ?? "";
  const [query, setQuery] = useState<string>(initialQ);

  // simple search handler that accepts either a CustomEvent<string> (from the component)
  // or a plain string (when called programmatically)
  async function handleSearch(eOrQ: CustomEvent<string> | string) {
    const searchQuery =
      typeof eOrQ === "string" ? eOrQ : (eOrQ as CustomEvent<string>).detail;

    if (!searchQuery) {
      // clear results if empty search
      setJobs([]);
      setSearchMeta(null);
      setSearchParams({});
      setQuery("");
      return;
    }

    // keep input and URL in sync
    setQuery(searchQuery);
    setSearchParams({ q: searchQuery });

    setLoading(true);
    setSearchMeta(null);
    try {
      const res = await fetch(
        `https://jobsearch.api.jobtechdev.se/search?q=${encodeURIComponent(
          searchQuery
        )}&offset=0&limit=10`
      );
      const data = await res.json();
      setJobs(data.hits ?? []);
      setSearchMeta({
        total: data?.total?.value ?? 0,
        positions: data?.positions ?? 0,
      });
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setJobs([]);
      setSearchMeta(null);
    } finally {
      setLoading(false);
    }
  }

  // run search once on mount if URL has q
  useEffect(() => {
    if (initialQ) {
      handleSearch(initialQ);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once

  console.log(jobs);

  return (
    <DigiLayoutBlock
      // afMarginTop
      afContainer={LayoutBlockContainer.FLUID}
      afVariation={LayoutBlockVariation.SECONDARY}
    >
      <DigiLayoutContainer>
        <DigiTypography>
          <h2>Sök jobb</h2>
        </DigiTypography>
      </DigiLayoutContainer>
      <DigiLayoutContainer>
        <DigiFormInputSearch
          afLabel="Titel, beskrivning, plats eller företag"
          afVariation={FormInputSearchVariation.LARGE}
          afType={FormInputType.SEARCH}
          afButtonText="Sök"
          onAfOnSubmitSearch={handleSearch}
          afValue={query}
        ></DigiFormInputSearch>
      </DigiLayoutContainer>
      <DigiLayoutContainer afVerticalPadding className="job-list">
        {searchMeta !== null && (
          <DigiTypography role="status" aria-live="polite">
            <p>
              <strong>{searchMeta.total} annonser</strong> med{" "}
              {searchMeta.positions} jobb
            </p>
          </DigiTypography>
        )}
        {jobs.map((job, idx) => (
          <JobAd job={job} key={job.id || `job-${idx}`} />
        ))}
      </DigiLayoutContainer>
    </DigiLayoutBlock>
  );
}
