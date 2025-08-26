import {
  DigiLayoutBlock,
  DigiLayoutContainer,
  DigiTypography,
  DigiExpandableAccordion,
  DigiLoaderSkeleton,
  DigiList,
  DigiLinkExternal,
} from "@digi/arbetsformedlingen-react";
import {
  LayoutBlockVariation,
  ListType,
  LoaderSkeletonVariation,
} from "@digi/arbetsformedlingen";
import type { IJobAd } from "../Models/JobModel";
import { formatSwedishDate } from "../utils/helpers";

export default function JobAdDetails({ job }: { job: IJobAd }) {
  console.log(job);
  return (
    <DigiLayoutBlock
      afMarginTop
      afMarginBottom
      afVariation={LayoutBlockVariation.PRIMARY}
    >
      <DigiLayoutContainer afVerticalPadding>
        <DigiTypography>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              justifyContent: "space-between",
            }}
          >
            <h1>{job.headline}</h1>
            {job.logo_url && (
              <img src={job.logo_url} alt={job.employer?.name} />
            )}
          </div>

          <div>{job.employer?.workplace}</div>
          <div>
            <strong>{job.occupation?.label}</strong>
          </div>
          <div>{job.workplace_address?.municipality}</div>
          <div>Publicerad {formatSwedishDate(job.publication_date, true)}</div>
          <div>
            <p style={{ whiteSpace: "pre-wrap" }}>
              {job.description.text_formatted || job.description.text}
            </p>
          </div>
        </DigiTypography>
      </DigiLayoutContainer>
    </DigiLayoutBlock>
  );
}
