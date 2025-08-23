import {
  DigiInfoCardMulti,
  DigiTypography,
} from "@digi/arbetsformedlingen-react";
import { Link } from "react-router";

import {
  InfoCardMultiHeadingLevel,
  InfoCardMultiType,
} from "@digi/arbetsformedlingen";
import type { IEdAd } from "../Models/EdModel";
import { formatSwedishDate, taxonomyMap } from "../utils/helpers";
import React from "react";
import "./EdAd.css";

const EdAd = ({ education }: { education: IEdAd }) => {
  return (
    <Link
      className="education-ad-wrapper-link"
      to={`/utbildningar/${education.id}${location.search}`}
      state={{ education: education }} // skicka hela objektet som state via router
    >
      <DigiInfoCardMulti
        className="x"
        afHeading={`${education.education?.title?.[0]?.content || ""} `}
        afHeadingLevel={InfoCardMultiHeadingLevel.H3}
        afType={InfoCardMultiType.RELATED}
        afLinkHref={`/utbildningar/${education.id}`} // måste fixas
      >
        <DigiTypography>
          <div className="education-ad-details">
            <div>{education.id}</div>
            <div className="education-ad-row">
              <div>
                <em>{education.providerSummary?.providers?.join(", ")}</em>
                {education.eventSummary?.distance && <span> - Distans</span>}
              </div>
              {education.education?.credits?.credits && (
                <div>
                  <span className="education-ad-icon">
                    {React.createElement("digi-icon-education")}
                  </span>
                  <span>
                    <strong>
                      {education.education?.credits?.credits}{" "}
                      {education.education?.credits?.system?.code?.toUpperCase()}
                    </strong>
                  </span>
                </div>
              )}
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
                  ? `${education.eventSummary.paceOfStudyPercentage.join(
                      ", "
                    )}%`
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
                  {taxonomyMap(
                    education.eventSummary?.regionCode?.[0],
                    "region"
                  )}
                </span>
              </div>
            )}
          </div>
        </DigiTypography>
      </DigiInfoCardMulti>
    </Link>
  );
};

export default EdAd;
