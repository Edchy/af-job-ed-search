import { useLocation, useParams, Link, Navigate } from "react-router";
import {
  DigiLayoutBlock,
  DigiLayoutContainer,
  DigiTypography,
  DigiButton,
} from "@digi/arbetsformedlingen-react";
import { ButtonSize, ButtonVariation } from "@digi/arbetsformedlingen";
import type { IEdAd } from "../Models/EdModel";

export default function EdDetailsPage() {
  const location = useLocation();
  const education = location.state?.education as IEdAd;
  // const { id } = useParams<{ id: string }>();
  // console.log(`Education ID: ${id}`);
  // console.log(education);
  // console.log(location);

  // If no education data is passed via state, redirect back to search
  if (!education) {
    return <Navigate to="/education" replace />;
  }

  return (
    <DigiLayoutBlock>
      <DigiLayoutContainer>
        <DigiTypography>
          <h1>{education.education.title[0].content}</h1>
          <div
            dangerouslySetInnerHTML={{
              __html: education.education.description[0].content,
            }}
          />
        </DigiTypography>
      </DigiLayoutContainer>
    </DigiLayoutBlock>
    // <DigiLayoutBlock>
    //   <DigiLayoutContainer>
    //     <div style={{ marginBottom: "1rem" }}>
    //       <Link to="/education">
    //         <DigiButton
    //           afVariation={ButtonVariation.SECONDARY}
    //           afSize={ButtonSize.SMALL}
    //         >
    //           ← Back to Search
    //         </DigiButton>
    //       </Link>
    //     </div>

    //     <DigiTypography>
    //       <h1>{education.education.title[0].content}</h1>

    //       <div style={{ marginBottom: "2rem" }}>
    //         <h2>Description</h2>
    //         <p>{education.education.description[0].content}</p>
    //       </div>

    //       <div style={{ marginBottom: "2rem" }}>
    //         <h2>Education Details</h2>
    //         <p><strong>Identifier:</strong> {education.education.identifier}</p>
    //         <p><strong>ID:</strong> {education.id}</p>
    //         <p><strong>Configuration:</strong> {education.education.configuration.code}</p>
    //         <p><strong>Form:</strong> {education.education.form.code}</p>
    //         <p><strong>Education Level:</strong> {education.education.educationLevel.code}</p>
    //         <p><strong>Credits:</strong> {education.education.credits.credits} ({education.education.credits.system.code})</p>
    //         <p><strong>Is Vocational:</strong> {education.education.isVocational ? "Yes" : "No"}</p>
    //         <p><strong>Results in Degree:</strong> {education.education.resultIsDegree ? "Yes" : "No"}</p>
    //       </div>

    //       <div style={{ marginBottom: "2rem" }}>
    //         <h2>Providers</h2>
    //         <p>{education.providerSummary.providers.join(", ")}</p>
    //       </div>

    //       <div style={{ marginBottom: "2rem" }}>
    //         <h2>Study Information</h2>
    //         <p><strong>Pace of Study:</strong> {education.eventSummary.paceOfStudyPercentage.join(", ")}%</p>
    //         <p><strong>Language of Instruction:</strong> {education.eventSummary.languageOfInstruction.join(", ")}</p>
    //         <p><strong>Distance Learning:</strong> {education.eventSummary.distance ? "Available" : "Not available"}</p>
    //         <p><strong>Region Codes:</strong> {education.eventSummary.regionCode.join(", ")}</p>
    //         <p><strong>Municipality Codes:</strong> {education.eventSummary.municipalityCode.join(", ")}</p>
    //       </div>

    //       {education.education.eligibility.eligibilityDescription[0] && (
    //         <div style={{ marginBottom: "2rem" }}>
    //           <h2>Eligibility</h2>
    //           <p>{education.education.eligibility.eligibilityDescription[0][0].content}</p>
    //         </div>
    //       )}

    //       {education.education.recommendedPriorKnowledge.length > 0 && (
    //         <div style={{ marginBottom: "2rem" }}>
    //           <h2>Recommended Prior Knowledge</h2>
    //           <p>{education.education.recommendedPriorKnowledge[0].content}</p>
    //         </div>
    //       )}

    //       {education.education.subject.length > 0 && (
    //         <div style={{ marginBottom: "2rem" }}>
    //           <h2>Subjects</h2>
    //           <ul>
    //             {education.education.subject.map((subject, index) => (
    //               <li key={index}>{subject.name} ({subject.code})</li>
    //             ))}
    //           </ul>
    //         </div>
    //       )}

    //       {education.eventSummary.executions.length > 0 && (
    //         <div style={{ marginBottom: "2rem" }}>
    //           <h2>Execution Periods</h2>
    //           <ul>
    //             {education.eventSummary.executions.map((execution, index) => (
    //               <li key={index}>
    //                 {new Date(execution.start).toLocaleDateString()} - {new Date(execution.end).toLocaleDateString()}
    //               </li>
    //             ))}
    //           </ul>
    //         </div>
    //       )}

    //       {education.education.urls.length > 0 && (
    //         <div style={{ marginBottom: "2rem" }}>
    //           <h2>More Information</h2>
    //           <ul>
    //             {education.education.urls.map((url, index) => (
    //               <li key={index}>
    //                 <a href={url} target="_blank" rel="noopener noreferrer">
    //                   {url}
    //                 </a>
    //               </li>
    //             ))}
    //           </ul>
    //         </div>
    //       )}
    //     </DigiTypography>
    //   </DigiLayoutContainer>
    // </DigiLayoutBlock>
  );
}
