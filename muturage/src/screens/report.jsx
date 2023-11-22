import React, { useState, useEffect, useContext } from "react";
import { Container, Table, Button } from "react-bootstrap";
import axios from "axios";
import { Store } from "../store";

const SupervisorReports = () => {
  const [reports, setReports] = useState([]);
  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    axios.get("/api/report/supervisor").then((response) => {
      setReports(response.data);
    });
  }, []);

  const approveReport = (reportId) => {
    axios
      .put(
        `/api/report/${reportId}`,
        { isApproved: true },
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      )
      .then((response) => {
        const updatedReports = reports.map((report) => {
          if (report._id === reportId) {
            return response.data;
          }
          return report;
        });
        setReports(updatedReports);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Container fluid style={{ display: "table-row" }}>
      <h1>Supervisor Reports</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Report ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Approved</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report._id}>
              <td>{report._id}</td>
              <td>{report.title}</td>
              <td>{report.author.name}</td>
              <td>{report.isApproved ? "Yes" : "No"}</td>
              <td>
                {!report.isApproved && (
                  <Button onClick={() => approveReport(report._id)}>
                    Approve
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default SupervisorReports;
