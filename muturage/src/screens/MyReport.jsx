import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Store } from "../store";
import { useParams } from "react-router";
import { Table } from "react-bootstrap";

function MyReport() {
  const [reports, setReports] = useState([]);
  const [state] = useContext(Store);
  const { userInfo } = state;
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/reports`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        setReports(data);
      } catch (error) {
        console.log(error);
        toast.error("Fetch fail");
      }
    };
    fetchData();
  }, [userInfo]);

  const handleApproval = () => {
    axios
      .put(`/report/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify({ isApproved: true }),
      })
      .then((res) => res.json())
      .then((data) => {
        setReports((prevReports) =>
          prevReports.map((report) =>
            report._id === id ? { ...report, isApproved: true } : report
          )
        );
      })
      .catch((error) => console.error(error));
  };
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Title</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {reports.map((report) => (
          <tr
            key={report._id}
            style={{ backgroundColor: report.isApproved ? "lightgreen" : "" }}
          >
            <td>{report.title}</td>
            <td>{report.isApproved ? "Received" : "Pending"}</td>
            <td>
              {!report.isApproved && (
                <button onClick={() => handleApproval(report._id)}>
                  Approve
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default MyReport;
