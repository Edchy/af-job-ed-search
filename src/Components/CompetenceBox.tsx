import { useState } from "react";
import {
  DigiExpandableAccordion,
  DigiTypography,
  DigiList,
  DigiLoaderSkeleton,
} from "@digi/arbetsformedlingen-react";
import type { IJobAd } from "../Models/JobModel";
import { ListType, LoaderSkeletonVariation } from "@digi/arbetsformedlingen";
import { fetchCompetencies } from "../services/competencesService";

type CompetenceBoxProps = {
  job: IJobAd;
};
// todo - fixa så att man inte refetchar för samma jobb
export default function CompetenceBox({ job }: CompetenceBoxProps) {
  const [competencies, setCompetencies] = useState<
    { term: string; percent_for_occupation: number }[]
  >([]);
  const [loading, setLoading] = useState(false);

  const handleAccordionClick = async () => {
    if (competencies.length > 0 || loading || !job.occupation?.concept_id) {
      return;
    }

    setLoading(true);
    try {
      const fetchedCompetencies = await fetchCompetencies(
        job.occupation.concept_id
      );
      setCompetencies(fetchedCompetencies);
    } catch (err) {
      console.error("Fel vid hämtning av kompetenser:", err);
    } finally {
      setLoading(false);
    }
  };

  const chartData = competencies.slice(0, 5).map((c) => ({
    name: c.term,
    value: Math.round(c.percent_for_occupation),
  }));

  if (!job.occupation?.concept_id) return null;

  return (
    <div>
      <DigiTypography>
        <DigiExpandableAccordion
          afHeading={`Vanligt efterfrågade kompetenser för yrkesgrupp ${
            job.occupation?.label || "Valt yrke"
          }`}
          onAfOnClick={handleAccordionClick}
        >
          <div>
            {loading && (
              <DigiLoaderSkeleton
                afVariation={LoaderSkeletonVariation.TEXT}
                afCount={5}
              />
            )}
            {!loading && chartData.length > 0 && (
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
                {chartData.map((item, i) => (
                  <li
                    key={i}
                    style={{
                      backgroundColor: "#e0e0e0",
                      borderRadius: "16px",
                      padding: "0.5rem 1rem",
                      fontSize: "0.875rem",
                    }}
                  >
                    {item.name}
                    {/* ({item.value}%)  */}
                  </li>
                ))}
              </DigiList>
            )}
            {!loading && competencies.length === 0 && (
              <p>Inga kompetenser att visa.</p>
            )}
          </div>
        </DigiExpandableAccordion>
      </DigiTypography>
    </div>
  );
}
