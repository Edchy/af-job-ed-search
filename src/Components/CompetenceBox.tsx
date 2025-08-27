import { useState, useEffect } from "react";
import {
  DigiExpandableAccordion,
  DigiLayoutContainer,
  DigiTypography,
  DigiList,
} from "@digi/arbetsformedlingen-react";
import type { IJobAd } from "../Models/JobModel";
import { ListType } from "@digi/arbetsformedlingen";

// Props som skickas in
type CompetenceBoxProps = {
  job: IJobAd;
};

export default function CompetenceBox({ job }: CompetenceBoxProps) {
  const [competencies, setCompetencies] = useState<
    { term: string; percent_for_occupation: number }[]
  >([]);

  // Hämta kompetenser från API
  useEffect(() => {
    async function fetchCompetencies(occupationId: string) {
      const res = await fetch(
        `https://jobed-connect-api.jobtechdev.se/v1/enriched_occupations?occupation_id=${occupationId}&include_metadata=true&metadata_type=COMPETENCE`
      );
      if (!res.ok) throw new Error("Kunde inte hämta kompetenser");

      const data = await res.json();
      const comps =
        data.metadata?.enriched_candidates_term_frequency?.competencies || [];

      if (!Array.isArray(comps)) {
        console.warn("Kompetens-data saknas eller är ogiltig", data.metadata);
        return;
      }

      setCompetencies(comps);
    }

    if (job.occupation?.concept_id) {
      fetchCompetencies(job.occupation.concept_id).catch((err) =>
        console.error("Fel vid hämtning av kompetenser:", err)
      );
    }
  }, [job.occupation?.concept_id]);

  // Skapa chartData
  const chartData = competencies.slice(0, 5).map((c) => ({
    name: c.term,
    value: Math.round(c.percent_for_occupation),
  }));

  if (chartData.length === 0) return null;

  return (
    <DigiLayoutContainer
      style={{
        margin: "1.5rem",
        backgroundColor: "#f3f3f3",
        borderRadius: "4px",
      }}
    >
      <DigiTypography>
        {/* <h3>
          Vanliga kompetenser för yrkesgrupp{" "}
          {job.occupation?.label || "Valt yrke"}
        </h3> */}
        <DigiExpandableAccordion
          afHeading={`Vanligt efterfrågade kompetenser för yrkesgrupp ${
            job.occupation?.label || "Valt yrke"
          }`}
        >
          <DigiList
            afListType={ListType.BULLET}
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
              marginTop: "0.5rem",
            }}
          >
            {chartData.map((item) => (
              <li
                key={item.name}
                style={{
                  backgroundColor: "#e0e0e0",
                  borderRadius: "16px",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                {item.name} ({item.value}%)
              </li>
            ))}
          </DigiList>
        </DigiExpandableAccordion>
      </DigiTypography>
    </DigiLayoutContainer>
  );
}
