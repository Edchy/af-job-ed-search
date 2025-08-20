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
import { taxonomyMap } from "../utils/helpers";
import React from "react";
import "./EdAd.css";

const EdAd = ({ ed }: { ed: IEdAd }) => {
  return (
    <Link
      className="ed-ad-wrapper-link"
      to={`/education/${ed.id}${location.search}`}
      state={{ education: ed }} // skicka hela objektet som state via router
    >
      <DigiInfoCardMulti
        className="x"
        afHeading={`${ed.education.title[0].content} `}
        afHeadingLevel={InfoCardMultiHeadingLevel.H3}
        afType={InfoCardMultiType.RELATED}
        afLinkHref={`/education/${ed.id}`} // måste fixas
      >
        <DigiTypography>
          <div className="ed-ad-details">
            <div className="ed-ad-row">
              <div>
                <em>{ed.providerSummary.providers.join(", ")}</em>
                {ed.eventSummary.distance && <span> - Distans</span>}
              </div>
              {ed.education.credits.credits && (
                <div>
                  <span className="ed-ad-icon">
                    {React.createElement("digi-icon-education")}
                  </span>
                  <span>
                    <strong>
                      {ed.education.credits.credits}{" "}
                      {ed.education.credits.system.code.toUpperCase()}
                    </strong>
                  </span>
                </div>
              )}
            </div>

            <div className="ed-ad-row">
              <span className="ed-ad-icon">
                {React.createElement("digi-icon-clock")}
              </span>
              <span className="ed-ad-label">Studietakt:</span>
              <span>{ed.eventSummary.paceOfStudyPercentage.join(", ")}%</span>
            </div>
            <div className="ed-ad-row">
              <span className="ed-ad-icon">
                {React.createElement("digi-icon-book")}
              </span>
              <span className="ed-ad-label">Typ:</span>
              <span>{ed.education.configuration.code}</span>
            </div>
            <div className="ed-ad-row">
              <span className="ed-ad-icon">
                {React.createElement("digi-icon-bell")}
              </span>
              <span className="ed-ad-label">Form:</span>
              <span>{ed.education.form.code}</span>
            </div>

            {ed.eventSummary.municipalityCode[0] && (
              <div className="ed-ad-row">
                <span className="ed-ad-icon">
                  {React.createElement("digi-icon-globe")}
                </span>
                <span>
                  {taxonomyMap(
                    ed.eventSummary.municipalityCode[0],
                    "municipality"
                  )}
                  , {taxonomyMap(ed.eventSummary.regionCode[0], "region")}
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
