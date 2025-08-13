import {
  ButtonSize,
  ButtonVariation,
  FormInputSearchVariation,
  FormInputType,
  LayoutBlockVariation,
} from "@digi/arbetsformedlingen";
import {
  DigiButton,
  DigiFormInputSearch,
  DigiLayoutBlock,
  DigiTypography,
} from "@digi/arbetsformedlingen-react";
import { useState } from "react";

export default function ContactPage() {
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  async function handleSearch() {
    if (!searchQuery) return;
    const res = await fetch(
      `https://jobsearch.api.jobtechdev.se/search?q=${searchQuery}&offset=0&limit=10`
    );
    const data = await res.json();
    setJobs(data.hits);
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
        onAfInput={(e) => setSearchQuery(e.target.value)}
        onAfOnSearch={handleSearch}
      ></DigiFormInputSearch>
      {/* {jobs.map((job) => (
        <DigiLayoutBlock key={job.id}>
          <DigiTypography>
            <h3>{job.headline}</h3>
            <p>{job.workplace_address.municipality}</p>
          </DigiTypography>
        </DigiLayoutBlock>
      ))} */}
    </DigiLayoutBlock>
  );
}
