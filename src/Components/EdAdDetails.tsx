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
  getOccupationsMatchedByEducationId,
  type OccupationMatchByEducationResponse,
} from "../services/occupationService";
import { useState } from "react";
import { formatSwedishDate, taxonomyMap } from "../utils/helpers";
import { Link } from "react-router";

export default function EdAdDetails({ education }: { education: IEdAd }) {
  // ändra till useSessionStorage
  const [matchedOccupations, setMatchedOccupations] =
    useState<OccupationMatchByEducationResponse>({
      hits_total: 0,
      hits_returned: 0,
      identified_keywords_for_input: { competencies: [], occupations: [] },
      related_occupations: [],
    });
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    // förhindra att körs för många gånger
    if (matchedOccupations.related_occupations.length > 0 || loading) return;
    setLoading(true);
    try {
      const res = await getOccupationsMatchedByEducationId(education.id);
      setMatchedOccupations(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      console.log(education.id);
    }
    console.log(matchedOccupations);
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
          {/* ger tillbaka t.ex "grund" elelr "ISCED_3A" hitta ett sätt att mappa kod till andvändbar info */}
          <div>Nivå: {education.education?.educationLevel?.code}</div>
          <div>{education.providerSummary.providers?.join(", ")}</div>
          {/* <div>
            Utgår:{" "}
            {education.education?.expires
              ? formatSwedishDate(education.education.expires)
              : ""}
          </div> */}
          <div>
            {education.education.isVocational ? "Yrkesmässig utbildning" : ""}
          </div>
          <div>
            {education.eventSummary.executions?.length > 0 && (
              <div className="education-executions">
                <div className="execution-start">
                  Börjar:{" "}
                  {formatSwedishDate(
                    education.eventSummary.executions?.[0]?.start ?? ""
                  )}
                </div>
                <div className="execution-end">
                  Slutar:{" "}
                  {formatSwedishDate(
                    education.eventSummary.executions?.[0]?.end ?? ""
                  )}
                </div>
              </div>
            )}
          </div>

          {education.eventSummary?.municipalityCode?.[0] && (
            <div className="education-ad-row">
              <span>
                {taxonomyMap(
                  education.eventSummary?.municipalityCode?.[0],
                  "municipality"
                )}
                ,{" "}
                {taxonomyMap(education.eventSummary?.regionCode?.[0], "region")}
              </span>
            </div>
          )}
        </DigiTypography>
        <DigiExpandableAccordion afHeading="Om utbildningen">
          <p
            dangerouslySetInnerHTML={{
              __html: education.education?.description?.[0]?.content,
            }}
          />

          {education.text_enrichments_results?.enriched_candidates
            ?.competencies && (
            <div>
              <p>Nyckelord:</p>
              <DigiList afListType={ListType.BULLET}>
                {education.text_enrichments_results.enriched_candidates.competencies.map(
                  (competency, index) => (
                    <li key={index}>{competency}</li>
                  )
                )}
              </DigiList>
            </div>
          )}
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
              {education.education?.subject?.some((subject) => subject.name) ? (
                education.education.subject.map((subject, index) =>
                  subject.name ? <li key={index}>{subject.name}</li> : null
                )
              ) : (
                <li>Inga ämnen tillgängliga</li>
              )}
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
          afHeading="Vad kan jag jobba med?"
        >
          <div hidden={!loading}>
            <DigiLoaderSkeleton
              afVariation={LoaderSkeletonVariation.TEXT}
              afCount={6}
            ></DigiLoaderSkeleton>
          </div>
          <div hidden={loading}>
            {matchedOccupations.identified_keywords_for_input.occupations
              .length > 0 ? (
              <DigiTypography>
                <h4>Huvudyrke:</h4>
                <DigiList afListType={ListType.BULLET}>
                  {matchedOccupations.identified_keywords_for_input.occupations.map(
                    (occupation, i) => (
                      <li key={i}>
                        <Link to={`/jobb?q=${encodeURIComponent(occupation)}`}>
                          <span style={{ textTransform: "capitalize" }}>
                            {occupation}
                          </span>
                        </Link>
                      </li>
                    )
                  )}
                </DigiList>
              </DigiTypography>
            ) : null}
            {matchedOccupations.related_occupations?.length > 0 ? (
              <DigiTypography>
                <h4>Relaterade yrken:</h4>

                <DigiList afListType={ListType.BULLET}>
                  {matchedOccupations.related_occupations.map(
                    (occupation, i) => (
                      <li key={i}>
                        <Link
                          to={`/jobb?q=${encodeURIComponent(
                            occupation.occupation_label
                          )}`}
                        >
                          {occupation?.occupation_label}
                        </Link>
                      </li>
                    )
                  )}
                </DigiList>
                <p>
                  <em>
                    Visar {matchedOccupations.hits_returned || 0} av{" "}
                    {matchedOccupations.hits_total || 0}
                  </em>
                </p>
              </DigiTypography>
            ) : (
              <DigiTypography>inga relaterade yrken</DigiTypography>
            )}
          </div>
        </DigiExpandableAccordion>
        {/* <DigiExpandableAccordion
          onClick={handleClick}
          afHeading="Nyckelord (kompetenser)"
        >
          <DigiTypography>
            <DigiList afListType={ListType.BULLET}>
              {matchedOccupations.identified_keywords_for_input.competencies.map(
                (keyword, i) => (
                  <li key={i}>{keyword}</li>
                )
              )}
            </DigiList>
          </DigiTypography>
        </DigiExpandableAccordion> */}
      </DigiLayoutContainer>
    </DigiLayoutBlock>
  );
}
