import { useState, useEffect } from "react";
import {
  DigiExpandableAccordion,
  DigiLayoutContainer,
  DigiTypography,
  DigiList,
} from "@digi/arbetsformedlingen-react";
import type { IJobAd } from "../Models/JobModel";
import { ListType } from "@digi/arbetsformedlingen";
import { fetchCompetencies } from "../services/competencesService";
type CompetenceBoxProps = {
  job: IJobAd;
};

export default function CompetenceBox({ job }: CompetenceBoxProps) {
  const [competencies, setCompetencies] = useState<
    { term: string; percent_for_occupation: number }[]
  >([]);

  useEffect(() => {
    if (!job.occupation?.concept_id) return;

    fetchCompetencies(job.occupation.concept_id)
      .then(setCompetencies)
      .catch((err) => console.error("Fel vid hämtning av kompetenser:", err));
  }, [job.occupation?.concept_id]);

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
              listStyleType: "none", // Tar bort punkter
              paddingLeft: 0,
            }}
          >
            {chartData.map((item) => (
              <li
                key={item.name}
                style={{
                  backgroundColor: "#e0e0e0",
                  borderRadius: "16px",
                  padding: "0.5rem 1rem",
                  fontSize: "0.875rem",
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
