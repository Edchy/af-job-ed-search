export interface LocalizedText {
  lang: string;
  content: string;
}

export interface Subject {
  code: string;
  name: string;
  type: string;
}

export interface Configuration {
  code: string;
  type: string;
}

export interface Form {
  code: string;
  type: string;
}

export interface Credits {
  system: {
    code: string;
    type: string;
  };
  credits: number;
}

export interface EducationLevel {
  code: string;
  type: string;
}

export interface Education {
  identifier: string;
  resultIsDegree: boolean;
  expires: string;
  recommendedPriorKnowledge: LocalizedText[];
  code: string | null;
  configuration: Configuration;
  subject: Subject[];
  description: LocalizedText[];
  lastEdited: string;
  title: LocalizedText[];
  isVocational: boolean;
  urls: string[];
  form: Form;
  credits: Credits;
  educationLevel: EducationLevel;
  eligibility: {
    eligibilityDescription: LocalizedText[][];
  };
}

export interface ProviderSummary {
  providers: string[];
}

export interface Execution {
  start: string;
  end: string;
}

export interface EventSummary {
  regionCode: string[];
  paceOfStudyPercentage: number[];
  tuitionFee: string[];
  executions: Execution[];
  languageOfInstruction: string[];
  distance: boolean;
  timeOfStudy: string[];
  municipalityCode: string[];
  onlyAsPartOfProgram: string[];
}

export interface EnrichedCandidates {
  geos: string[];
  traits: string[];
  competencies: string[];
  occupations: string[];
}

export interface TextEnrichmentsResults {
  enriched_candidates: EnrichedCandidates;
  enriched_candidates_complete: EnrichedCandidates;
}

export interface IEdAd {
  education: Education;
  providerSummary: ProviderSummary;
  eventSummary: EventSummary;
  text_enrichments_results: TextEnrichmentsResults;
  id: string;
}
