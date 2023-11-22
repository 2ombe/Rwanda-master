import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Table, Toast } from "react-bootstrap";
import { toast } from "react-toastify";
import CreateTaskScreen from "./createTaskScreen";
import { Store } from "../store";

function Inshingano() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingtask] = useState(null);
  const [showForm, setShowForm] = useState(false);
  useEffect(() => {
    axios
      .get("/api/tasks", {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      })
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error);
      });
  }, [userInfo]);
  const handleUpdate = async (task) => {
    setEditingtask(task);
    setShowForm(true);
  };

  const handleCloseForm = async () => {
    setShowForm(false);
    setEditingtask(null);
  };

  const handleAdd = async (task) => {
    setTasks([...tasks, task]);
    setShowForm(false);
    setEditingtask(null);
    toast.success("Muhawe inshingano");
  };
  return (
    <Card>
      <Card.Header>Inshingano zicyumweru</Card.Header>
      <Card.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Izina</th>
              <th>Ubusobanuro</th>
              <th>Uwazitanze</th>
              <th>Igihe ntarengwa</th>
              <th>Mwarasisoje</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task._id}>
                <td>{task.taskName}</td>
                <td>{task.description}</td>
                <td>{task.assignedBy}</td>
                <td>{new Date(task.deadline).toLocaleString()}</td>
                <td>{task.completed ? "Nazisoje" : "Ntizirazozwa"}</td>
                <td>
                  {!task.completed && (
                    <Button
                      variant="primary"
                      onClick={() => handleUpdate(task)}
                    >
                      Update
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
      {/* <CreateTaskScreen
        editingTask={editingTask}
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        onCancel={handleCloseForm}
        showForm={showForm}
      /> */}
    </Card>
  );
}

export default Inshingano;
