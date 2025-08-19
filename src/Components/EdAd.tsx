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

const EdAd = ({ ed }: { ed: IEdAd }) => {
  return (
    <Link
      to={`/education/${ed.id}`}
      state={{ education: ed }}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <DigiInfoCardMulti
        className="x"
        afHeading={ed.education.title[0].content}
        afHeadingLevel={InfoCardMultiHeadingLevel.H3}
        afType={InfoCardMultiType.ENTRY}
      >
        <DigiTypography>
          <p>{ed.education.identifier}</p>
          <p>{ed.id}</p>
          <p>{ed.providerSummary.providers.join(", ")}</p>
          <p>Studietakt: {ed.eventSummary.paceOfStudyPercentage.join(", ")}%</p>
          <p>{ed.education.configuration.code}</p>
          <p>{ed.education.form.code}</p>
          <p>
            {taxonomyMap(
              ed.eventSummary.municipalityCode.join(", "),
              "municipality"
            ) ||
              ed.text_enrichments_results.enriched_candidates.geos.join(", ")}
            ,{" "}
            {taxonomyMap(ed.eventSummary.regionCode.join(", "), "region") ||
              ed.text_enrichments_results.enriched_candidates.geos.join(", ")}
          </p>

          {/* <p>
            {ed.education.eligibility.eligibilityDescription[0][0]?.content}
          </p> */}
        </DigiTypography>
      </DigiInfoCardMulti>
    </Link>
  );
};

export default EdAd;
