import {
  DigiInfoCardMulti,
  DigiLayoutBlock,
  DigiLayoutContainer,
  DigiTypography,
} from "@digi/arbetsformedlingen-react";
import type { IJobAd } from "../Models/JobModel";
import { formatSwedishDate } from "../utils/helpers";
import {
  InfoCardMultiHeadingLevel,
  InfoCardMultiType,
  LayoutBlockVariation,
} from "@digi/arbetsformedlingen";

const JobAd = ({ job }: { job: IJobAd }) => {
  return (
    // <DigiLayoutBlock
    //   afVariation={LayoutBlockVariation.PRIMARY}
    //   className="job-card"
    // >
    //   <DigiTypography>
    //     <h3>{job.headline}</h3>
    //     <p>{job.occupation.label}</p>
    //     <p>{formatSwedishDate(job.publication_date)}</p>
    //   </DigiTypography>
    // </DigiLayoutBlock>
    <DigiInfoCardMulti
      afHeading={job.headline}
      afHeadingLevel={InfoCardMultiHeadingLevel.H3}
      afType={InfoCardMultiType.ENTRY}
      afLinkHref="länk"
    >
      <DigiTypography>
        <p>{job.occupation.label}</p>
        <p>Publicerad {formatSwedishDate(job.publication_date)}</p>
      </DigiTypography>
    </DigiInfoCardMulti>
  );
};

export default JobAd;
