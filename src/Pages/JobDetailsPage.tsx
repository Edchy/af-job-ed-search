import { useLocation, Navigate } from "react-router";
import {
  DigiLayoutBlock,
  DigiLayoutContainer,
  DigiLink,
} from "@digi/arbetsformedlingen-react";
import type { IJobAd } from "../Models/JobModel";
import React from "react";

import JobAdDetails from "../Components/JobAdDetails";
import DetailsPageHeader from "../Components/DetailsPageHeader";

export default function JobDetailsPage() {
  const location = useLocation();
  const job = location.state?.job as IJobAd;
  const search = location.search || "";
  console.log(search);
  // const { id } = useParams<{ id: string }>();
  // console.log(`Education ID: ${id}`);
  console.log(job);
  console.log(location);

  // If no job data is passed via state, redirect back to search
  if (!job) {
    return <Navigate to="/jobb" replace />;
  }

  return (
    <>
      <DetailsPageHeader path="jobb" query={search} />
      <JobAdDetails job={job} />
    </>
  );
}
