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
import type { IEdAd } from "../Models/EdModel";
import {
  getRelatedOccupationsByEducationId,
  type RelatedOccupation,
} from "../services/occupationService";
import { useState } from "react";
import { formatSwedishDate } from "../utils/helpers";

export default function EdAdDetails({ education }: { education: IEdAd }) {
  const [relatedOccupations, setRelatedOccupations] = useState<
    RelatedOccupation[]
  >([]);
  const [hits, setHits] = useState({ hits_returned: 0, hits_total: 0 });
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    if (relatedOccupations.length > 0) return;
    setLoading(true);
    try {
      const res = await getRelatedOccupationsByEducationId(education.id);
      setRelatedOccupations(res.related_occupations);
      setHits({ hits_returned: res.hits_returned, hits_total: res.hits_total });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      console.log(education.id);
    }
  }

  return (
    <DigiLayoutBlock
      afMarginTop
      afMarginBottom
      afVariation={LayoutBlockVariation.SECONDARY}
    >
      <DigiLayoutContainer afVerticalPadding>
        <DigiTypography>
          <h1>
            {education.education?.title?.[0]?.content} (
            {education.education?.code})
          </h1>
          <h2>
            {education.education?.credits?.credits}{" "}
            {education.education?.credits?.system?.code?.toUpperCase()}
          </h2>
          {/* <div>{education.education?.code}</div> */}
          <div>Form: {education.education.form?.code}</div>
          <div>Typ: {education.education?.configuration?.code}</div>
          <div></div>
          <div>Nivå: {education.education?.educationLevel?.code}</div>

          <div>
            Utgår:{" "}
            {education.education?.expires
              ? formatSwedishDate(education.education.expires)
              : ""}
          </div>
          <div>
            {education.education.isVocational ? "Yrkesmässig utbildning" : ""}
          </div>

          <div>{}</div>
        </DigiTypography>
        <DigiExpandableAccordion afHeading="Om utbildningen">
          <p
            dangerouslySetInnerHTML={{
              __html: education.education?.description?.[0]?.content,
            }}
          />
        </DigiExpandableAccordion>
        <DigiExpandableAccordion afHeading="Behörighet">
          <DigiTypography>
            <p>
              {
                education.education?.eligibility?.eligibilityDescription[0][0]
                  ?.content
              }
            </p>
            <DigiLinkExternal
              afHref="https://www.antagning.se/sv/betyg-och-behorighet/behorighet/"
              afTarget="_blank"
            >
              Läs mer om behörighet
            </DigiLinkExternal>
          </DigiTypography>
        </DigiExpandableAccordion>
        <DigiExpandableAccordion afHeading="Ämnen">
          <DigiTypography>
            <DigiList afListType={ListType.BULLET}>
              {education.education.subject.map((subject, index) => (
                <li key={index}>{subject.name}</li>
              ))}
            </DigiList>
          </DigiTypography>
        </DigiExpandableAccordion>
        {/* 
   
        <DigiExpandableAccordion afHeading="Utbildningsinformation">
          <DigiTypography>
            <p>
              <strong>Leverantör(er): </strong>
              {education.providerSummary.providers.join(", ")}
            </p>
            <p>
              <strong>Startdatum: </strong>
              {education.eventSummary.executions[0]?.start || "N/A"}
            </p>
            <p>
              <strong>Slutdatum: </strong>
              {education.eventSummary.executions[0]?.end || "N/A"}
            </p>
            <p>
              <strong>Utförande: </strong>
              {education.eventSummary.distance
                ? "Distansutbildning"
                : "På plats"}
            </p>
          </DigiTypography>
        </DigiExpandableAccordion> */}

        <DigiExpandableAccordion
          onClick={handleClick}
          afHeading="Relaterade yrken"
        >
          <div hidden={!loading}>
            <DigiLoaderSkeleton
              afVariation={LoaderSkeletonVariation.TEXT}
              afCount={6}
            ></DigiLoaderSkeleton>
          </div>
          <div hidden={loading}>
            {relatedOccupations?.length > 0 ? (
              <DigiTypography>
                <p>
                  <em>
                    Visar {hits.hits_returned || 0} av {hits.hits_total || 0}
                  </em>
                </p>
                <DigiList afListType={ListType.BULLET}>
                  {relatedOccupations.map((occupation) => (
                    <li key={occupation.id}>{occupation?.occupation_label}</li>
                  ))}
                </DigiList>
              </DigiTypography>
            ) : (
              <DigiTypography>inga relaterade yrken</DigiTypography>
            )}
          </div>
        </DigiExpandableAccordion>
      </DigiLayoutContainer>
    </DigiLayoutBlock>
  );
}
