import { apiFetch } from "./baseService";

export type Competence = {
  term: string;
  percent_for_occupation: number;
};

const BASE_URL =
  "https://jobed-connect-api.jobtechdev.se/v1/enriched_occupations";

export async function fetchCompetencies(
  occupationId: string
): Promise<Competence[]> {
  const data = await apiFetch<{
    metadata?: {
      enriched_candidates_term_frequency?: { competencies?: Competence[] };
    };
  }>(
    `${BASE_URL}?occupation_id=${occupationId}&include_metadata=true&metadata_type=COMPETENCE`
  );

  const competencies =
    data.metadata?.enriched_candidates_term_frequency?.competencies || [];

  if (!Array.isArray(competencies)) {
    console.warn("Kompetens-data saknas eller är ogiltig", data.metadata);
    return [];
  }

  return competencies;
}
