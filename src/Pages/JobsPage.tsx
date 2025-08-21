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
  const [searchResults, setSearchResults] = useState<IJobAd[]>([]);
  const [searchMeta, setSearchMeta] = useState<SearchMeta | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q") || "";

  async function handleSearch(e: CustomEvent<string>) {
    const searchQuery = e.detail;
    console.log(searchQuery);
    if (!searchQuery) {
      console.log("Inga sökord angivna");
      return;
    }

    setLoading(true);
    setSearchMeta(null);
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

  // If the component is mounted with a search query in the URL, perform the search (som t.ex när klickar på en länk från utbildningssidan)
  useEffect(() => {
    if (q) {
      handleSearch({ detail: q } as CustomEvent<string>);
      console.log(q);
    }
  }, [q]);

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
          afValue={q}
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
        {searchResults.map((job, idx) => (
          <JobAd job={job} key={job.id || `job-${idx}`} />
        ))}
      </DigiLayoutContainer>
    </DigiLayoutBlock>
  );
}
