import { useLocation, Navigate } from "react-router";

import type { IEdAd } from "../Models/EdModel";

import EdAdDetails from "../Components/EdAdDetails";
import DetailsPageHeader from "../Components/DetailsPageHeader";

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
    return <Navigate to="/utbildningar" replace />;
  }

  return (
    <>
      <DetailsPageHeader path="utbildningar" query={search} />
      <EdAdDetails education={education} />
    </>
  );
}
