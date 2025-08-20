import {
  DigiLayoutBlock,
  DigiLayoutContainer,
  DigiTypography,
  DigiButton,
  DigiExpandableAccordion,
} from "@digi/arbetsformedlingen-react";
import {
  ButtonSize,
  ButtonVariation,
  LayoutBlockVariation,
} from "@digi/arbetsformedlingen";
import type { IEdAd } from "../Models/EdModel";
import {
  getRelatedOccupationsByEducationId,
  type RelatedOccupation,
} from "../services/occupationService";
import { useState } from "react";

export default function EdAdDetails({ education }: { education: IEdAd }) {
  const [relatedOccupations, setRelatedOccupations] = useState<
    RelatedOccupation[]
  >([]);

  async function handleClick() {
    console.log("Button clicked!");
    try {
      const res = await getRelatedOccupationsByEducationId(education.id);
      setRelatedOccupations(res.related_occupations);
    } catch (error) {
      console.log(error);
    }
  }
  console.log(relatedOccupations[0].occupation_label);
  return (
    <DigiLayoutBlock
      afMarginTop
      afMarginBottom
      afVariation={LayoutBlockVariation.SECONDARY}
    >
      <DigiLayoutContainer afVerticalPadding>
        <DigiTypography>
          <h1>{education.education.title[0].content}</h1>
        </DigiTypography>
        <DigiExpandableAccordion afHeading="Om utbildningen">
          <p
            dangerouslySetInnerHTML={{
              __html: education.education.description[0].content,
            }}
          />
        </DigiExpandableAccordion>
        <DigiExpandableAccordion
          onClick={handleClick}
          afHeading="Relaterade yrken"
        >
          {relatedOccupations.length > 0 ? (
            <DigiTypography>
              {relatedOccupations.map((occupation) => (
                <div key={occupation.id}>{occupation.occupation_label}</div>
              ))}
            </DigiTypography>
          ) : (
            <DigiTypography>inga</DigiTypography>
          )}
        </DigiExpandableAccordion>
        <DigiButton
          afSize={ButtonSize.MEDIUM}
          afVariation={ButtonVariation.PRIMARY}
          afFullWidth={false}
          onAfOnClick={handleClick}
        >
          En knapp
        </DigiButton>
      </DigiLayoutContainer>
    </DigiLayoutBlock>
  );
}
