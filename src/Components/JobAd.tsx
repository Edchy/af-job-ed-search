import { DigiTypography } from "@digi/arbetsformedlingen-react";
import type { IJobAd } from "../Models/JobModel";
import { formatSwedishDate } from "../utils/helpers";

import { Link } from "react-router";
import CompetenceBox from "./CompetenceBox";
import "./Ad.css";

const JobAd = ({ job }: { job: IJobAd }) => {
  return (
    <div className="ad-wrapper">
      <DigiTypography>
        <Link
          className="job-ad-wrapper-link"
          to={`/jobb/${job.id}${location.search}`}
          state={{ job: job }}
        >
          <h2>{job.headline}</h2>
        </Link>
        <div>{job.employer?.workplace}</div>
        <div>
          <strong>{job.occupation?.label}</strong>
        </div>
        <div>{job.workplace_address?.municipality}</div>
        <div>Publicerad {formatSwedishDate(job.publication_date, true)}</div>
        <div>{job.working_hours_type?.label || "-"} </div>
        <div>
          {job.salary_description ? `  ${job.salary_description}` : ""}{" "}
        </div>
        <div>
          {job.salary_type?.label ? ` Löneform: ${job.salary_type.label}` : ""}
        </div>
        <CompetenceBox job={job} />
      </DigiTypography>
    </div>
  );
};

export default JobAd;
