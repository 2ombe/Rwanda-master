import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Store } from "../store";

function CreateTaskScreen({ onAdd, onUpdate, editingTask, onReset, onCancel }) {
  const navigate = useNavigate();
  const [taskName, setName] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [assignedBy, setAssignedBy] = useState("");
  const [deadline, setDeadline] = useState("");
  const [completed, setCompleted] = useState(false);
  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    if (editingTask) {
      setName(editingTask.name);
      setDescription(editingTask.description);
      setAssignedBy(editingTask.assignedBy);
      setAssignedTo(editingTask.assignedTo);
      setDeadline(editingTask.deadline);
      setCompleted(editingTask.completed);
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const task = {
      taskName,
      description,
      assignedBy,
      assignedTo,
      deadline,
      completed,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    if (editingTask) {
      axios
        .put(`/api/tasks/${editingTask._id}`, task, config)
        .then((response) => {
          onUpdate(response.data);
          onReset();
          toast.success("Inshingano zatanzwe zasohoje");
        })
        .catch((error) => {
          console.error(error);
          toast.error("failed to update task");
        });
    } else {
      axios
        .post("/api/tasks", task, config)
        .then((response) => {
          console.log(response.data);
          toast.success("Mwatanze inshingano nshya");
          navigate("/home");
        })
        .catch((error) => {
          console.error(error);
          toast.error("Failed to create task");
        });
    }
  };
  return (
    <Container fluid className="small-container mt-5">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mt-3" controlId="formName">
          <Form.Label>Task name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter task name"
            value={taskName}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter task description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formAssignedTo">
          <Form.Label>Assigned To</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name of person assigned to task"
            value={assignedTo}
            onChange={(event) => setAssignedTo(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formAssignedBy">
          <Form.Label>Assigned By</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name of person who assigned the task"
            value={assignedBy}
            onChange={(event) => setAssignedBy(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formDeadline">
          <Form.Label>Deadline</Form.Label>
          <Form.Control
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formCompleted">
          <Form.Check
            type="checkbox"
            label="completed"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {editingTask ? "ishingano zasohojwe" : "Tanga inshingano"}
        </Button>
        {editingTask && (
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </Form>
    </Container>
  );
}

export default CreateTaskScreen;
