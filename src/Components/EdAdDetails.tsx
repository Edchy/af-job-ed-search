import {
  DigiLayoutBlock,
  DigiLayoutContainer,
  DigiTypography,
  DigiButton,
  DigiExpandableAccordion,
  DigiLoaderSpinner,
} from "@digi/arbetsformedlingen-react";
import {
  ButtonSize,
  ButtonVariation,
  LayoutBlockVariation,
  LoaderSpinnerSize,
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
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    if (relatedOccupations.length > 0) return;
    setLoading(true);
    try {
      const res = await getRelatedOccupationsByEducationId(education.id);
      setRelatedOccupations(res.related_occupations);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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
          <div hidden={!loading}>
            <DigiLoaderSpinner
              afSize={LoaderSpinnerSize.MEDIUM}
              afText="Laddar"
            ></DigiLoaderSpinner>
          </div>
          <div hidden={loading}>
            {relatedOccupations && relatedOccupations.length > 0 ? (
              <DigiTypography>
                <ul>
                  {relatedOccupations.map((occupation) => (
                    <li key={occupation.id}>{occupation.occupation_label}</li>
                  ))}
                </ul>
              </DigiTypography>
            ) : (
              <DigiTypography>inga</DigiTypography>
            )}
          </div>
        </DigiExpandableAccordion>
        {/* <DigiButton
          afSize={ButtonSize.MEDIUM}
          afVariation={ButtonVariation.PRIMARY}
          afFullWidth={false}
          onAfOnClick={handleClick}
        >
          En knapp
        </DigiButton> */}
      </DigiLayoutContainer>
    </DigiLayoutBlock>
  );
}
