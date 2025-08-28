import {
  DigiBarChart,
  DigiExpandableAccordion,
  DigiInfoCardMulti,
  DigiTypography,
} from "@digi/arbetsformedlingen-react";
import type { IJobAd } from "../Models/JobModel";
import { formatSwedishDate } from "../utils/helpers";
import {
  BarChartVariation,
  InfoCardMultiHeadingLevel,
  InfoCardMultiType,
} from "@digi/arbetsformedlingen";
import { Link } from "react-router";
import CompetenceBox from "./CompetenceBox";

const JobAd = ({ job }: { job: IJobAd }) => {
  return (
    <div
      style={{
        marginBottom: "1.5rem",
        padding: "1rem",
        border: "1px solid #eee",
        borderRadius: "4px",
      }}
    >
      <DigiTypography>
        <Link
          className="job-ad-wrapper-link"
          to={`/jobb/${job.id}${location.search}`}
          state={{ job: job }}
          style={{ textDecoration: "none" }}
        >
          <h2>{job.headline}</h2>
        </Link>
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
        <CompetenceBox job={job} />
      </DigiTypography>
    </div>
  );
};

export default JobAd;
