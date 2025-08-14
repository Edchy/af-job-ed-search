export interface JobAd {
  id: string;
  headline: string;
  description: JobAdDescription;
  workplace_address: JobAdWorkplaceAddress;
}
type JobAdWorkplaceAddress = {
  municipality: string;
  municipality_code: string;
  municipality_concept_id: string;
  region: string;
  region_code: string;
  region_concept_id: string;
  country: string;
  country_code: string;
  country_concept_id: string;
  street_address: null;
  postcode: null;
  city: null;
  coordinates: number[];
};
type JobAdDescription = {
  text: string;
  text_formatted: string;
  company_information: string;
  needs: string;
  requirements: string;
  conditions: string;
};

// export interface Job {
//   relevance: number;
//   id: string;
//   external_id: string;
//   original_id: null;
//   label: string;
//   webpage_url: string;
//   logo_url: null;
//   headline: string;
//   application_deadline: Date;
//   number_of_vacancies: number;
//   description: Description;
//   employment_type: Duration;
//   salary_type: Duration;
//   salary_description: string;
//   duration: Duration;
//   working_hours_type: Duration;
//   scope_of_work: ScopeOfWork;
//   access: null;
//   employer: Employer;
//   application_details: ApplicationDetails;
//   experience_required: boolean;
//   access_to_own_car: boolean;
//   driving_license_required: boolean;
//   driving_license: null;
//   occupation: Duration;
//   occupation_group: Duration;
//   occupation_field: Duration;
//   workplace_address: WorkplaceAddress;
//   must_have: Have;
//   nice_to_have: Have;
//   application_contacts: ApplicationContact[];
//   publication_date: Date;
//   last_publication_date: Date;
//   removed: boolean;
//   removed_date: null;
//   source_type: string;
//   timestamp: number;
// }

// export interface ApplicationContact {
//   name: null;
//   description: string;
//   email: null;
//   telephone: null;
//   contact_type: null;
// }

// export interface ApplicationDetails {
//   information: null;
//   reference: null;
//   email: null;
//   via_af: boolean;
//   url: string;
//   other: null;
// }

// export interface Description {
//   text: string;
//   text_formatted: string;
//   company_information: null;
//   needs: null;
//   requirements: null;
//   conditions: string;
// }

// export interface Duration {
//   concept_id: string;
//   label: string;
//   legacy_ams_taxonomy_id: string;
//   weight?: number;
// }

// export interface Employer {
//   phone_number: null;
//   email: null;
//   url: string;
//   organization_number: string;
//   name: string;
//   workplace: string;
// }

// export interface Have {
//   skills: string[];
//   languages: string[];
//   work_experiences: Duration[];
//   education: string[];
//   education_level: string[];
// }

// export interface ScopeOfWork {
//   min: number;
//   max: number;
// }

// export interface WorkplaceAddress {
//   municipality: string;
//   municipality_code: string;
//   municipality_concept_id: string;
//   region: string;
//   region_code: string;
//   region_concept_id: string;
//   country: string;
//   country_code: string;
//   country_concept_id: string;
//   street_address: null;
//   postcode: null;
//   city: null;
//   coordinates: number[];
// }
