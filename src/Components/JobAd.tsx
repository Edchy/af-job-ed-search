import {
  DigiInfoCardMulti,
  DigiTypography,
} from "@digi/arbetsformedlingen-react";
import type { IJobAd } from "../Models/JobModel";
import { formatSwedishDate } from "../utils/helpers";
import {
  InfoCardMultiHeadingLevel,
  InfoCardMultiType,
} from "@digi/arbetsformedlingen";

const JobAd = ({ job }: { job: IJobAd }) => {
  return (
    <DigiInfoCardMulti
      className="x"
      afHeading={
        job.number_of_vacancies > 1
          ? `${job.headline} (${job.number_of_vacancies} jobb)`
          : job.headline
      }
      afHeadingLevel={InfoCardMultiHeadingLevel.H3}
      afType={InfoCardMultiType.ENTRY}
      afLinkHref="länk"
    >
      <DigiTypography>
        <p>
          <strong>{job.occupation.label}</strong>
        </p>
        <p>{job.number_of_vacancies}</p>
        <p>{job.workplace_address.municipality}</p>
        <p>Publicerad {formatSwedishDate(job.publication_date)}</p>
      </DigiTypography>
    </DigiInfoCardMulti>
  );
};

export default JobAd;
