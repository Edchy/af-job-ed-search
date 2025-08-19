import {
  DigiInfoCardMulti,
  DigiTypography,
} from "@digi/arbetsformedlingen-react";

import {
  InfoCardMultiHeadingLevel,
  InfoCardMultiType,
} from "@digi/arbetsformedlingen";
import type { IEdAd } from "../Models/EdModel";

const EdAd = ({ ed }: { ed: IEdAd }) => {
  return (
    <DigiInfoCardMulti
      className="x"
      afHeading={ed.education.title[0].content}
      afHeadingLevel={InfoCardMultiHeadingLevel.H3}
      afType={InfoCardMultiType.ENTRY}
      afLinkHref="länk"
    >
      <DigiTypography>
        <p>{ed.education.identifier}</p>
        <p>{ed.id}</p>
        <p>{ed.providerSummary.providers.join(", ")}</p>
        <p>Studietakt: {ed.eventSummary.paceOfStudyPercentage.join(", ")}%</p>
        <p>{ed.education.configuration.code}</p>
        <p>{ed.education.form.code}</p>
        <p>{ed.education.eligibility.eligibilityDescription[0][0].content}</p>
      </DigiTypography>
    </DigiInfoCardMulti>
  );
};

export default EdAd;
