import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";

const CreateReport = () => {
  const [title, setTitle] = useState("");
  const [tableOfContents, setTableOfContents] = useState("");
  const [executiveSummary, setExecutiveSummary] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [discussion, setDiscussion] = useState("");
  const [conclusion, setConclusion] = useState("");
  const [recommendations, setRecommendations] = useState("");
  const [references, setReferences] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    
  };

  return (
    <Container className="small-container h-100 mt-5">
      <Form onSubmit={handleSubmit}>
        <h2>Create Report</h2>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="tableOfContents">
          <Form.Label>Table of Contents</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter table of contents"
            value={tableOfContents}
            onChange={(event) => setTableOfContents(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="executiveSummary">
          <Form.Label>Executive Summary</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter executive summary"
            value={executiveSummary}
            onChange={(event) => setExecutiveSummary(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="introduction">
          <Form.Label>Introduction</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter introduction"
            value={introduction}
            onChange={(event) => setIntroduction(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="discussion">
          <Form.Label>Discussion</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter discussion"
            value={discussion}
            onChange={(event) => setDiscussion(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="conclusion">
          <Form.Label>Conclusion</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter conclusion"
            value={conclusion}
            onChange={(event) => setConclusion(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="recommendations">
          <Form.Label>Recommendations</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter recommendations"
            value={recommendations}
            onChange={(event) => setRecommendations(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="references">
          <Form.Label>References</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter references"
            value={references}
            onChange={(event) => setReferences(event.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default CreateReport;
