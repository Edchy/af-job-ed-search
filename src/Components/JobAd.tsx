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
import { Link } from "react-router";

const JobAd = ({ job }: { job: IJobAd }) => {
  return (
    <Link
      className="job-ad-wrapper-link"
      to={`/jobb/${job.id}${location.search}`}
      state={{ job: job }}
      style={{ textDecoration: "none" }}
    >
      <DigiInfoCardMulti
        className="card"
        afHeading={
          job.number_of_vacancies > 1
            ? `${job.headline} (${job.number_of_vacancies} jobb)`
            : job.headline
        }
        afHeadingLevel={InfoCardMultiHeadingLevel.H3}
        afType={InfoCardMultiType.RELATED}
        afLinkHref="länk"
      >
        <DigiTypography>
          <div>{job.employer?.workplace}</div>
          <div>
            <strong>{job.occupation?.label}</strong>
          </div>
          <div>{job.workplace_address?.municipality}</div>
          <div>Publicerad {formatSwedishDate(job.publication_date, true)}</div>
          <div>{job.working_hours_type?.label || "-"}{" "}</div>
          <div>{job.salary_description ? `  ${job.salary_description}` : ""}{" "}</div>
          <div>{job.salary_type?.label
            ? ` Löneform: ${job.salary_type.label}`
            : ""}</div>
        </DigiTypography>
      </DigiInfoCardMulti>
    </Link>
  );
};

export default JobAd;
