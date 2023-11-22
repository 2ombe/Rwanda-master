// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { Form, Button } from "react-bootstrap";

// const UpdateReport = () => {
//   const { id } = useParams(); // Get the ID of the report to update from the URL

//   const [report, setReport] = useState({
//     title: "",
//     tableOfContents: "",
//     executiveSummary: "",
//     introduction: "",
//     discussion: "",
//     conclusion: "",
//     recommendations: "",
//     references: "",
//     isApproved: false,
//   });

//   useEffect(() => {
//     // Fetch the report from the server when the component mounts
//     const fetchReport = async () => {
//       const response = await fetch(`/api/reports/${id}`);
//       const data = await response.json();
//       setReport(data);
//     };
//     fetchReport();
//   }, [id]);

//   const handleChange = (e) => {
//     // Update the state of the report when a form field changes
//     const { name, value } = e.target;
//     setReport((prevState) => ({ ...prevState, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // Submit the updated report to the server
//     const response = await fetch(`/api/reports/${id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(report),
//     });
//     const data = await response.json();
//     console.log(data);
//   };

//   return (
//     <div>
//       <h1>Update Report</h1>
//       <Form onSubmit={handleSubmit}>
//         <Form.Group controlId="formTitle">
//           <Form.Label>Title</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Enter Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//         </Form.Group>
//         <Form.Group controlId="formTableOfContents">
//           <Form.Label>Table of Contents</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Enter Table of Contents"
//             value={tableOfContents}
//             onChange={(e) => setTableOfContents(e.target.value)}
//           />
//         </Form.Group>
//         <Form.Group controlId="formExecutiveSummary">
//           <Form.Label>Executive Summary</Form.Label>
//           <Form.Control
//             as="textarea"
//             rows={3}
//             placeholder="Enter Executive Summary"
//             value={executiveSummary}
//             onChange={(e) => setExecutiveSummary(e.target.value)}
//           />
//         </Form.Group>
//         <Form.Group controlId="formIntroduction">
//           <Form.Label>Introduction</Form.Label>
//           <Form.Control
//             as="textarea"
//             rows={3}
//             placeholder="Enter Introduction"
//             value={introduction}
//             onChange={(e) => setIntroduction(e.target.value)}
//           />
//         </Form.Group>
//         <Form.Group controlId="formDiscussion">
//           <Form.Label>Discussion</Form.Label>
//           <Form.Control
//             as="textarea"
//             rows={3}
//             placeholder="Enter Discussion"
//             value={discussion}
//             onChange={(e) => setDiscussion(e.target.value)}
//           />
//         </Form.Group>
//         <Form.Group controlId="formConclusion">
//           <Form.Label>Conclusion</Form.Label>
//           <Form.Control
//             as="textarea"
//             rows={3}
//             placeholder="Enter Conclusion"
//             value={conclusion}
//             onChange={(e) => setConclusion(e.target.value)}
//           />
//         </Form.Group>
//         <Form.Group controlId="formRecommendations">
//           <Form.Label>Recommendations</Form.Label>
//           <Form.Control
//             as="textarea"
//             rows={3}
//             placeholder="Enter Recommendations"
//             value={recommendations}
//             onChange={(e) => setRecommendations(e.target.value)}
//           />
//         </Form.Group>
//         <Form.Group controlId="formReferences">
//           <Form.Label>References</Form.Label>
//           <Form.Control
//             as="textarea"
//             rows={3}
//             placeholder="Enter References"
//             value={references}
//             onChange={(e) => setReferences(e.target.value)}
//           />
//         </Form.Group>
//         <Button variant="primary" type="submit">
//           Update Report
//         </Button>
//       </Form>
//     </div>
//   );
// };
