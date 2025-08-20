import type { IEdAd } from "../Models/EdModel";
import { apiFetch } from "./baseService";

export interface EducationSearchResult {
  hits: number;
  result: IEdAd[];
}
const URL = "https://jobed-connect-api.jobtechdev.se/v1/educations";

export async function fetchEducations(
  query: string
): Promise<EducationSearchResult> {
  const data = await apiFetch<EducationSearchResult>(
    `${URL}?query=${encodeURIComponent(query)}`
  );

  return { hits: data.hits, result: data.result || [] };
}

// encodeURIComponent transforms input into a format that can be safely included in a URL
