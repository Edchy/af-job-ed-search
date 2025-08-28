import {
  DigiLayoutBlock,
  DigiLayoutContainer,
  DigiTypography,
  DigiExpandableAccordion,
  DigiLoaderSkeleton,
  DigiList,
  DigiLinkExternal,
  DigiInfoCard,
} from "@digi/arbetsformedlingen-react";
import {
  InfoCardHeadingLevel,
  InfoCardSize,
  InfoCardType,
  InfoCardVariation,
  LayoutBlockVariation,
  LinkVariation,
  ListType,
  LoaderSkeletonVariation,
} from "@digi/arbetsformedlingen";
import type { IJobAd } from "../Models/JobModel";
import { formatSwedishDate } from "../utils/helpers";

export default function JobAdDetails({ job }: { job: IJobAd }) {
  console.log(job);
  return (
    <DigiLayoutBlock
      // afMarginTop
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
          <div>hallååååå - {job.occupation_field?.label}</div>
          <div style={{ marginBlock: "1rem" }}>
            <DigiInfoCard
              afHeading={job.employer?.name || "Arbetsgivare"}
              afHeadingLevel={InfoCardHeadingLevel.H3}
              afType={InfoCardType.TIP}
              afLinkHref={job.employer?.email}
              afLinkText={job.employer?.email}
              afVariation={InfoCardVariation.PRIMARY}
              afSize={InfoCardSize.STANDARD}
            >
              <p>{job.employer?.workplace || ""}</p>
              <p>{job.employer?.organization_number || ""}</p>
              {job.employer?.url && (
                <DigiLinkExternal afHref={job.employer?.url} afTarget="_blank">
                  {job.employer?.url}
                </DigiLinkExternal>
              )}
            </DigiInfoCard>
          </div>
          <div>
            {/* <p style={{ whiteSpace: "pre-wrap" }}>
              {job.description.text_formatted || job.description.text}
            </p> */}
            <p
              dangerouslySetInnerHTML={{
                __html: job.description.text_formatted || job.description.text,
              }}
            ></p>
          </div>
        </DigiTypography>
      </DigiLayoutContainer>
    </DigiLayoutBlock>
  );
}
