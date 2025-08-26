import { useLocation, Navigate } from "react-router";

import type { IJobAd } from "../Models/JobModel";

import JobAdDetails from "../Components/JobAdDetails";
import DetailsPageHeader from "../Components/DetailsPageHeader";

export default function JobDetailsPage() {
  const location = useLocation();
  const job = location.state?.job as IJobAd;
  const search = location.search || "";

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
