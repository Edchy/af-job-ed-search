import {
  FormInputSearchVariation,
  FormInputType,
  LayoutBlockVariation,
  LoaderSkeletonVariation,
} from "@digi/arbetsformedlingen";
import {
  DigiFormInputSearch,
  DigiLayoutBlock,
  DigiLoaderSkeleton,
  DigiTypography,
} from "@digi/arbetsformedlingen-react";

import type { JobAd } from "../Models/JobModel";
import { useState } from "react";

export default function ContactPage() {
  const [results, setResults] = useState<JobAd[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleSearch(e: CustomEvent<string>) {
    const searchQuery = e.detail;
    console.log(searchQuery);
    if (!searchQuery) {
      console.log("Inga sökord angivna");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `https://jobsearch.api.jobtechdev.se/search?q=${searchQuery}&offset=0&limit=10`
      );
      const data = await res.json();
      setResults(data.hits);
      console.log(data.hits);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <DigiLayoutBlock afVariation={LayoutBlockVariation.PRIMARY}>
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
      {loading && (
        <DigiLayoutBlock>
          <DigiLoaderSkeleton
            afVariation={LoaderSkeletonVariation.SECTION}
            afCount={4}
          ></DigiLoaderSkeleton>
        </DigiLayoutBlock>
      )}
      {!loading &&
        results.map((job) => (
          <DigiLayoutBlock key={job.id}>
            <DigiTypography>
              <h3>{job.headline}</h3>
              {/* <p>{job.description.text}</p> */}
              <p>{job.workplace_address.municipality}</p>
            </DigiTypography>
          </DigiLayoutBlock>
        ))}
    </DigiLayoutBlock>
  );
}
