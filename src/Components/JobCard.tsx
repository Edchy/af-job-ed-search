import { useEffect, useState } from "react";
import {
  DigiLayoutContainer,
  DigiExpandableAccordion,
  DigiLayoutBlock,
  DigiTypography,
} from "@digi/arbetsformedlingen-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { JobAd } from "../Models/Models";

// Funktion för att hämta traits för ett yrke
async function fetchCompetencies(occupationId: string) {
  const res = await fetch(
    `https://jobed-connect-api.jobtechdev.se/v1/enriched_occupations?occupation_id=${occupationId}&include_metadata=true&metadata_type=COMPETENCE`
  );

  if (!res.ok) throw new Error("Kunde inte hämta kompetenser");

  const data = await res.json();

  const competencies =
    data.metadata?.enriched_candidates_term_frequency?.competencies || [];

  if (!Array.isArray(competencies)) {
    console.warn("Kompetens-data saknas eller är ogiltig", data.metadata);
    return [];
  }

  return competencies;
}

type Props = {
  job: JobAd;
};

export default function JobCard({ job }: Props) {
  const [competencies, setCompetencies] = useState<
    { term: string; percent_for_occupation: number }[]
  >([]);

  useEffect(() => {
    if (!job.occupation?.concept_id) return;

    fetchCompetencies(job.occupation.concept_id)
      .then(setCompetencies)
      .catch((err) => console.error("Fel vid hämtning av kompetenser:", err));
  }, [job.occupation?.concept_id]);

  const chartData = competencies.slice(0, 5).map((competencies) => ({
    name: competencies.term,
    value: Math.round(competencies.percent_for_occupation),
  }));

  return (
    <DigiLayoutContainer>
      <DigiLayoutBlock
        style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "1.5rem",
          marginBottom: "2rem",
          backgroundColor: "#ffffff",
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.08)",
        }}
      >
        <DigiTypography>
          <h3>{job.headline}</h3>
          <p>
            <strong>Publicerad:</strong>{" "}
            {job.publication_date?.slice(0, 10) || "Okänt datum"}
          </p>
          <p>
            <strong>Ort:</strong>{" "}
            {job.workplace_address?.municipality || "Ej angivet"}
          </p>
          <p>
            <strong>Yrke:</strong> {job.occupation?.label || "Okänt yrke"}
          </p>
        </DigiTypography>

        {competencies.length > 0 && (
          <>
            <DigiExpandableAccordion afHeading="Efterfrågade Kompetenser">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart
                  data={chartData}
                  layout="vertical"
                  margin={{ top: 10, right: 10, bottom: 10, left: 100 }}
                >
                  <XAxis
                    type="number"
                    domain={[0, 100]}
                    tickFormatter={(v) => `${v}%`}
                  />
                  <YAxis dataKey="name" type="category" width={150} />
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Bar dataKey="value" fill="#005FCC" />
                </BarChart>
              </ResponsiveContainer>
            </DigiExpandableAccordion>
            <DigiExpandableAccordion af-heading="Detaljerad Arbetsbeskrivning">
              <p>
                <strong>Arbetsbeskrivning:</strong> {job.description.text}
              </p>
              <p>
                <strong>Arbetsgivare:</strong>
                {job.employer.name}
              </p>
              <p>
                <strong>Webbplats:</strong>
                {job.employer.url}
              </p>
              <p>
                <strong>Anställningsvillkor:</strong>
                {job.working_hours_type.label}
              </p>
            </DigiExpandableAccordion>
          </>
        )}
      </DigiLayoutBlock>
    </DigiLayoutContainer>
  );
}
