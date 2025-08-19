import type { IEdAd } from "../Models/EdModel";
import { apiFetch } from "./baseService";

const URL = "https://jobed-connect-api.jobtechdev.se/v1/educations";

export async function fetchEducations(query: string): Promise<IEdAd[]> {
  const data = await apiFetch<{ result?: IEdAd[] }>(
    `${URL}?query=${encodeURIComponent(query)}`
  );

  return data.result || [];
}

// encodeURIComponent transforms input into a format that can be safely included in a URL
