import React, { useState, useEffect, useContext } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import { Store } from "../store";

const CaseList = () => {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [cases, setCases] = useState([]);

  const formatDate = (date) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    const fetchCases = async () => {
      const res = await axios.get("api/cases", {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });

      setCases(res.data);
    };
    fetchCases();
  }, [userInfo]);

  return (
    <div>
      <h2>My Cases</h2>
      {cases.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Case ID</th>
              <th>Subject</th>
              <th>Status</th>
              <th>Assigned To</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cases.map((c) => (
              <tr key={c._id}>
                <td>{c._id}</td>
                <td>{c.subject}</td>
                <td>{c.status}</td>
                <td>{c.assignedTo}</td>
                <td>{formatDate(c.createdAt)}</td>
                <td>
                  <Link to={`/case/${c._id}`}>View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No cases found.</p>
      )}
    </div>
  );
};

export default CaseList;
