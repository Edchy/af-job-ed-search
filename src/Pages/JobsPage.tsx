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
  const q = searchParams.get("q") ?? "";
  const [activeQuery, setActiveQuery] = useSessionStorage<string>(
    "jobAdsQuery",
    q
  );

  async function search(queryToSearch: string) {
    if (!queryToSearch) return;

    setLoading(true);
    setSearchParams({ q: queryToSearch }, { replace: true });
    try {
      const res = await getJobAds(queryToSearch);
      console.log("data", res);
      setJobs({
        hits: res.hits ?? [],
        total: {
          value: res.total?.value ?? 0,
        },
        positions: res.positions ?? 0,
      });
      setActiveQuery(queryToSearch);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setJobs(initialValues);
    } finally {
      setLoading(false);
    }
  }

  function handleSearchEvent(event: CustomEvent<string>) {
    const searchQuery = event.detail;
    search(searchQuery);
  }

  // This effect syncs the page state with the URL (e.g., for back/forward navigation)
  useEffect(() => {
    const qFromUrl = searchParams.get("q");
    if (qFromUrl && qFromUrl !== activeQuery) {
      search(qFromUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  console.log(jobs);

  const showLoading = loading;
  const showEmptyState = !loading && q && (jobs.total?.value ?? 0) === 0;
  const showResults = !loading && (jobs.total?.value ?? 0) > 0;

  return (
    <>
      <DigiLayoutBlock
        // afMarginTop
        afVerticalPadding
        afVariation={LayoutBlockVariation.PROFILE}
      >
        <DigiLayoutContainer className="search-container">
          <DigiTypography>
            <h1>Sök jobb</h1>
          </DigiTypography>

          <DigiFormInputSearch
            afLabel="Titel, beskrivning, plats och/eller företag"
            afVariation={FormInputSearchVariation.LARGE}
            afType={FormInputType.SEARCH}
            afButtonText="Sök"
            onAfOnSubmitSearch={handleSearchEvent}
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
          <div className="results-slot">
            {/* Loading */}
            <div aria-live="polite" hidden={!showLoading}>
              <DigiLoaderSkeleton
                afVariation={LoaderSkeletonVariation.SECTION}
                afCount={10}
              ></DigiLoaderSkeleton>
            </div>

            {/* Empty state */}
            <div hidden={!showEmptyState}>
              <DigiTypography>
                <h3>Inga jobb hittades för "{activeQuery}".</h3>
                <p>Menade du (förslag här)</p>
              </DigiTypography>
            </div>

            {/* Results */}
            <div hidden={!showResults}>
              <DigiTypography>
                <p>
                  <strong>Visar {jobs.total.value ?? 0} Annonser</strong> med{" "}
                  {jobs.positions ?? 0} jobb för sökningen "{activeQuery}"
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
