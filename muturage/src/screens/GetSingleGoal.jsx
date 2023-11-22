import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";

const GetGoal = () => {
  const [goal, setGoal] = useState(null);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const fetchGoal = async () => {
      try {
        const res = await axios.get(`/api/imihigo/${id}`); // replace ":id" with the ID of the goal you want to fetch
        setGoal(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchGoal();
  }, [id]);

  return (
    <div>
      {goal ? (
        <div>
          <h2>{goal.name}</h2>
          <p>Description: {goal.description}</p>
          <p>Timeline: {goal.timeline}</p>
          <p>Person who set the goal: {goal.person}</p>
          <p>Evaluators: {goal.evaluators.join(", ")}</p>
          <p>Beneficiaries: {goal.beneficiaries.join(", ")}</p>
          <p>Performance: {goal.performance}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default GetGoal;
