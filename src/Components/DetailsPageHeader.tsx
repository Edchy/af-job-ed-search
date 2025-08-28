import { LayoutBlockVariation } from "@digi/arbetsformedlingen";
import {
  DigiLayoutBlock,
  DigiLayoutContainer,
  DigiTypography,
} from "@digi/arbetsformedlingen-react";
import React from "react";
import { Link } from "react-router";

interface Props {
  path: string;
  query: string;
}

function DetailsPageHeader({ path, query }: Props) {
  return (
    <DigiLayoutBlock
      afVerticalPadding
      afVariation={LayoutBlockVariation.SECONDARY}
    >
      <DigiLayoutContainer>
        <Link
          style={{ textDecoration: "none", color: "inherit" }}
          to={`/${path}${query}`}
        >
          <DigiTypography>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontWeight: "bold",
              }}
            >
              {React.createElement("digi-icon-chevron-left")}
              Sökresultat
            </div>
          </DigiTypography>
        </Link>
      </DigiLayoutContainer>
    </DigiLayoutBlock>
  );
}

export default DetailsPageHeader;
