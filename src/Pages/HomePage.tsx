
import {
  DigiLayoutBlock,
  DigiLayoutContainer,
  DigiButton,
  DigiTypography,
} from "@digi/arbetsformedlingen-react";

import "./HomePage.css";
import { Link } from "react-router";
import { ButtonSize, ButtonVariation } from "@digi/arbetsformedlingen";


export default function HomePage() {
  return (
    <>
      <DigiLayoutBlock className="bg-homepage">
        <DigiTypography>
          <DigiLayoutContainer className="section-bg-color">
            <h1>Sök efter ditt nästa karriärssteg:</h1>
            <DigiButton
              afSize={ButtonSize.LARGE}
              afVariation={ButtonVariation.PRIMARY}
              afFullWidth={false}
              style={{ marginRight: "1rem" }}
            >
              <Link to="/utbildningar">Hitta Utbildning</Link>
            </DigiButton>
            <DigiButton
              afSize={ButtonSize.LARGE}
              afVariation={ButtonVariation.PRIMARY}
              afFullWidth={false}
            >
              <Link to="/utbildningar">Hitta Jobb</Link>
            </DigiButton>
          </DigiLayoutContainer>
        </DigiTypography>
      </DigiLayoutBlock>
    </>
  );
}
