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
        </DigiTypography>
        {/* <DigiExpandableAccordion afHeading="Efterfrågade Kompetenser">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 10, right: 10, bottom: 10, left: 100 }}
            >
              <XAxis
                type="number"
                domain={[0, 100]}
                tickFormatter={(v) => `${v}%`}
              />
              <YAxis dataKey="name" type="category" width={150} />
              <Tooltip formatter={(value) => `${value}%`} />
              <Bar dataKey="value" fill="#005FCC" />
            </BarChart>
          </ResponsiveContainer>
        </DigiExpandableAccordion> */}
      </DigiInfoCardMulti>
    </Link>
  );
};

export default JobAd;
