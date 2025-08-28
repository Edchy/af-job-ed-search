import { useLocation, Navigate } from "react-router";

import type { IEdAd } from "../Models/EdModel";

import EdAdDetails from "../Components/EdAdDetails";
import DetailsPageHeader from "../Components/DetailsPageHeader";

export default function EdDetailsPage() {
  const location = useLocation();
  console.log(location);
  const education = location.state?.education as IEdAd;
  const search = location.search || "";
  console.log(search);
  if (!education) {
    return <Navigate to="/utbildningar" replace />;
  }

  return (
    <>
      <DetailsPageHeader path="utbildningar" query={search} />
      <EdAdDetails education={education} />
    </>
  );
}
