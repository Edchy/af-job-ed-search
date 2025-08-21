import { apiFetch } from "./baseService";

interface OccupationGroup {
  occupation_group_label: string;
  concept_taxonomy_id: string;
  ssyk: string;
}

export interface RelatedOccupation {
  id: string;
  occupation_label: string;
  concept_taxonomy_id: string;
  legacy_ams_taxonomy_id: string;
  occupation_group: OccupationGroup;
}

interface IdentifiedKeywordsForInput {
  competencies: string[];
  occupations: string[];
}

export interface OccupationMatchByEducationResponse {
  hits_total: number;
  hits_returned: number;
  identified_keywords_for_input: IdentifiedKeywordsForInput;
  related_occupations: RelatedOccupation[];
}

const BASE_URL =
  "https://jobed-connect-api.jobtechdev.se/v1/occupations/match-by-education";

export async function getOccupationsMatchedByEducationId(
  id: string
): Promise<OccupationMatchByEducationResponse> {
  const url = `${BASE_URL}?education_id=${encodeURIComponent(id)}`;
  const data = await apiFetch<OccupationMatchByEducationResponse>(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  console.log(data);
  return data;
}
