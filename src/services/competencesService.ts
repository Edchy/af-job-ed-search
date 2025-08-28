export type Competence = {
  term: string;
  percent_for_occupation: number;
};

export async function fetchCompetencies(
  occupationId: string
): Promise<Competence[]> {
  const res = await fetch(
    `https://jobed-connect-api.jobtechdev.se/v1/enriched_occupations?occupation_id=${occupationId}&include_metadata=true&metadata_type=COMPETENCE`
  );

  if (!res.ok) {
    throw new Error("Kunde inte hämta kompetenser");
  }

  const data = await res.json();

  const competencies =
    data.metadata?.enriched_candidates_term_frequency?.competencies || [];

  if (!Array.isArray(competencies)) {
    console.warn("Kompetens-data saknas eller är ogiltig", data.metadata);
    return [];
  }

  return competencies;
}
