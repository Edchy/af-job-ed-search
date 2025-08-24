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

import type { IJobAd } from "../Models/JobModel";
import { useState } from "react";
import JobAd from "../Components/JobAd";
import { useEffect } from "react";
import { useSearchParams } from "react-router";
import { useSessionStorage } from "../hooks";
import { getJobAds, type JobAdsResponse } from "../services/occupationService";

const initialValues = {
  hits: [],
  total: {
    value: 0,
  },
  positions: 0,
};

export default function JobsPage() {
  const [jobs, setJobs] = useSessionStorage<JobAdsResponse>(
    "jobAds",
    initialValues
  );
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQ = searchParams.get("q") ?? "";
  const [query, setQuery] = useSessionStorage<string>("jobAdsQuery", initialQ);
  // search handler that accepts either a CustomEvent<string> (from the component)
  // or a plain string (when called programmatically)
  async function handleSearch(eventOrQuery: CustomEvent<string> | string) {
    const searchQuery =
      typeof eventOrQuery === "string"
        ? eventOrQuery
        : (eventOrQuery as CustomEvent<string>).detail;

    if (!searchQuery || searchQuery === query) {
      return;
    }

    // keep input and URL in sync
    setQuery(searchQuery);
    setSearchParams({ q: searchQuery });

    setLoading(true);
    // setSearchMeta(null);
    try {
      const res = await getJobAds(searchQuery);
      console.log("data", res);
      setJobs({
        hits: res.hits ?? [],
        total: {
          value: res.total?.value ?? 0,
        },
        positions: res.positions ?? 0,
      });
      // setSearchMeta({
      //   total: data?.total?.value ?? 0,
      //   positions: data?.positions ?? 0,
      // });
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setJobs(initialValues);
      // setSearchMeta(null);
    } finally {
      setLoading(false);
    }
  }

  // run search once on mount if URL has q
  useEffect(() => {
    if (initialQ && (jobs.hits.length === 0 || query !== initialQ)) {
      handleSearch(initialQ);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once

  console.log(jobs);

  return (
    <>
      <DigiLayoutBlock
        // afMarginTop
        afVerticalPadding
        afVariation={LayoutBlockVariation.PROFILE}
      >
        <DigiLayoutContainer className="search-container">
          <DigiTypography>
            <h1>Sök jobbs</h1>
          </DigiTypography>

          <DigiFormInputSearch
            afLabel="Titel, beskrivning, plats och/eller företag"
            afVariation={FormInputSearchVariation.LARGE}
            afType={FormInputType.SEARCH}
            afButtonText="Sök"
            onAfOnSubmitSearch={handleSearch}
            afValue={query}
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
            <div
              hidden={!(!loading && query && (jobs.total?.value ?? 0) === 0)}
            >
              <DigiTypography>
                <h3>Inga utbildningar hittades för "{query}".</h3>
                <p>Menade du (förslag här)</p>
              </DigiTypography>
            </div>

            {/* Results */}
            <div hidden={!(!loading && (jobs.total?.value ?? 0) > 0)}>
              <DigiTypography>
                <p>
                  <strong>Visar {jobs.total.value ?? 0} Annonser</strong> med{" "}
                  {jobs.positions ?? 0} jobb för sökningen "{query}"
                </p>
              </DigiTypography>
              {jobs.hits.map((job: IJobAd) => (
                <JobAd key={job.id} job={job} />
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
