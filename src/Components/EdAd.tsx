import {
  DigiExpandableAccordion,
  DigiLayoutBlock,
  DigiLayoutContainer,
  DigiList,
  DigiLoaderSkeleton,
  DigiTypography,
} from "@digi/arbetsformedlingen-react";
import { Link } from "react-router";

import type { IEdAd } from "../Models/EdModel";
import { formatSwedishDate, taxonomyMap } from "../utils/helpers";
import React, { useState } from "react";
import "./EdAd.css";
import {
  getOccupationsMatchedByEducationId,
  type OccupationMatchByEducationResponse,
} from "../services/occupationService";
import { LoaderSkeletonVariation, ListType } from "@digi/arbetsformedlingen";

const EdAd = ({ education }: { education: IEdAd }) => {
  const [matchedOccupations, setMatchedOccupations] =
    useState<OccupationMatchByEducationResponse>({
      hits_total: 0,
      hits_returned: 0,
      identified_keywords_for_input: { competencies: [], occupations: [] },
      related_occupations: [],
    });
  const [loading, setLoading] = useState(false);

  async function handleClick(id: string) {
    console.log("Clicked on accordion for education ID:", id);
    if (matchedOccupations.hits_total > 0 || loading) return;
    setLoading(true);
    try {
      const result = await getOccupationsMatchedByEducationId(id);
      console.log("Fetched occupations:", result);
      setMatchedOccupations(result);
    } catch (e) {
      console.error("Failed fetching occupations", e);
      setMatchedOccupations({
        hits_total: 0,
        hits_returned: 0,
        identified_keywords_for_input: { competencies: [], occupations: [] },
        related_occupations: [],
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "1.5rem",
        marginBottom: "2rem",
        backgroundColor: "#fff",
      }}
      className="education-ad-wrapper"
    >
      <DigiTypography>
        <Link
          className="education-ad-wrapper-link"
          to={`/utbildningar/${education.id}${location.search}`}
          state={{ education: education }} // skicka hela objektet som state via router
        >
          {" "}
          <h2>{education.education.title[0].content}</h2>
        </Link>
        <div className="education-ad-details">
          {education.education?.credits?.credits && (
            <div>
              <strong>
                {education.education?.credits?.credits}{" "}
                {education.education?.credits?.system?.code?.toUpperCase()}
              </strong>
            </div>
          )}
          {/* <div>{education.id}</div> */}
          <div className="education-ad-row">
            <div>
              <em>{education.providerSummary?.providers?.join(", ")}</em>
              {education.eventSummary?.distance && <strong> - Distans</strong>}
            </div>
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

          <div className="education-ad-row">
            <span className="education-ad-icon">
              {React.createElement("digi-icon-clock")}
            </span>
            <span className="education-ad-label">Studietakt:</span>
            <span>
              {education.eventSummary?.paceOfStudyPercentage?.length > 0
                ? `${education.eventSummary.paceOfStudyPercentage.join(", ")}%`
                : "-"}
            </span>
          </div>
          <div className="education-ad-row">
            <span className="education-ad-icon">
              {React.createElement("digi-icon-book")}
            </span>
            <span className="education-ad-label">Typ:</span>
            <span>{education.education?.configuration?.code || "-"}</span>
          </div>
          <div className="education-ad-row">
            <span className="education-ad-icon">
              {React.createElement("digi-icon-bell")}
            </span>
            <span className="education-ad-label">Form:</span>
            <span>{education.education?.form?.code}</span>
          </div>

          {education.eventSummary?.municipalityCode?.[0] && (
            <div className="education-ad-row">
              <span className="education-ad-icon">
                {React.createElement("digi-icon-globe")}
              </span>
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
          <DigiExpandableAccordion
            afHeading="Releterade Yrken"
            onAfOnClick={() => {
              handleClick(education.id);
            }}
          >
            {/* {matchedOccupations.related_occupations.map((occupation, i) => (
                <p key={i}>{occupation.occupation_label}</p>
              ))} */}

            <div hidden={!loading}>
              <DigiLoaderSkeleton
                afVariation={LoaderSkeletonVariation.TEXT}
                afCount={6}
              />
            </div>

            <div hidden={loading}>
              {matchedOccupations.identified_keywords_for_input.occupations
                .length > 0 && (
                <DigiTypography>
                  <h4>Huvudyrke:</h4>
                  <DigiList afListType={ListType.BULLET}>
                    {matchedOccupations.identified_keywords_for_input.occupations.map(
                      (occupation, i) => (
                        <li key={i}>
                          <Link
                            to={`/jobb?q=${encodeURIComponent(occupation)}`}
                          >
                            <span style={{ textTransform: "capitalize" }}>
                              {occupation}
                            </span>
                          </Link>
                        </li>
                      )
                    )}
                  </DigiList>
                </DigiTypography>
              )}

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
                            {occupation.occupation_label}
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
                !loading && (
                  <DigiTypography>inga relaterade yrken</DigiTypography>
                )
              )}
            </div>
          </DigiExpandableAccordion>
        </div>
      </DigiTypography>
    </div>
  );
};

export default EdAd;
