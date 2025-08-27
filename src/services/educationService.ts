import type { IEdAd } from "../Models/EdModel";
import { apiFetch } from "./baseService";

export interface EducationSearchResult {
  hits: number;
  result: IEdAd[];
}
const BASE_URL = "https://jobed-connect-api.jobtechdev.se/v1/educations";

export async function fetchEducations(
  query: string,
  offset: number = 0
): Promise<EducationSearchResult> {
  const data = await apiFetch<EducationSearchResult>(
    `${BASE_URL}?query=${encodeURIComponent(query)}&limit=10&offset=${offset}`
  );

  return { hits: data.hits, result: data.result || [] };
}

// encodeURIComponent transforms input into a format that can be safely included in a URL
