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
      afVariation={LayoutBlockVariation.SECONDARY}
    >
      <DigiLayoutContainer afVerticalPadding>
        <DigiTypography>
          <h1>{job.headline}</h1>
          <div>{job.employer?.workplace}</div>
          <div>
            <strong>{job.occupation?.label}</strong>
          </div>
          <div>{job.workplace_address?.municipality}</div>
          <div>Publicerad {formatSwedishDate(job.publication_date, true)}</div>
        </DigiTypography>
      </DigiLayoutContainer>
    </DigiLayoutBlock>
  );
}
