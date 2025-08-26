import type { IJobAd } from "../Models/JobModel";
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

export interface JobAdsResponse {
  hits: IJobAd[];
  total: {
    value: number;
  };
  positions: number;
}

const JOBED_BASE_URL =
  "https://jobed-connect-api.jobtechdev.se/v1/occupations/match-by-education";

const JOBSEARCH_BASE_URL = "https://jobsearch.api.jobtechdev.se/search";

export async function getJobAds(query: string): Promise<JobAdsResponse> {
  const url = `${JOBSEARCH_BASE_URL}?q=${encodeURIComponent(
    query
  )}&offset=0&limit=10`;
  const data = await apiFetch<JobAdsResponse>(url);
  return data;
}

export async function getOccupationsMatchedByEducationId(
  id: string
): Promise<OccupationMatchByEducationResponse> {
  const url = `${JOBED_BASE_URL}?education_id=${encodeURIComponent(
    id
  )}&limit=20`;
  const data = await apiFetch<OccupationMatchByEducationResponse>(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  return data;
}
