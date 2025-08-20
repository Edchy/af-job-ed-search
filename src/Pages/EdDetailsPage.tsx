import { useLocation, Navigate } from "react-router";
import {
  DigiLayoutBlock,
  DigiLayoutContainer,
  DigiLink,
} from "@digi/arbetsformedlingen-react";
import type { IEdAd } from "../Models/EdModel";
import React from "react";

import EdAdDetails from "../Components/EdAdDetails";

export default function EdDetailsPage() {
  const location = useLocation();
  const education = location.state?.education as IEdAd;
  const search = location.search || "";
  console.log(search);
  // const { id } = useParams<{ id: string }>();
  // console.log(`Education ID: ${id}`);
  console.log(education);
  console.log(location);

  // If no education data is passed via state, redirect back to search
  if (!education) {
    return <Navigate to="/education" replace />;
  }

  return (
    <>
      <DigiLayoutBlock afMarginTop>
        <DigiLayoutContainer>
          <DigiLink afHref={`/education${search}`}>
            {React.createElement("digi-icon-chevron-left")}
            Sökresultat
          </DigiLink>
        </DigiLayoutContainer>
      </DigiLayoutBlock>
      <EdAdDetails education={education} />
    </>
  );
}
