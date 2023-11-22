import React, { useContext, useEffect, useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { Store } from "../store";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { getError } from "../utils";
import laws from "../laws";

const CreateCase = () => {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [level, setLevel] = useState("");
  const [creator, setCreator] = useState(userInfo._id);
  const [assignee, setAssignee] = useState("");
  const [chapter, setChapter] = useState("");
  const [article, setArticle] = useState("");
  const [points, setPoints] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get("api/auth/all", {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        setUsers((prevFormData) => ({
          ...prevFormData,
          users: data,
        }));
        setUsers(data);
      } catch (error) {
        toast.error(error);
      }
    };
    fetchUsers();
  }, [userInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const { data } = axios.post(
        "/api/cases",
        {
          title,
          description,
          assignedTo,
          assignee,
          creator,
          users,
          article,
          points,
          chapter,
          laws,
          level,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      console.log(data);
      toast.success("Case created");
      setError("");
      //navigate("/home");
    } catch (error) {
      toast.error(getError(error));
    }
  };

  const handleChapter = (e) => {
    setChapter(e.target.value);
    setArticle("");
    setPoints("");
  };
  const handleArticle = (e) => {
    setArticle(e.target.value);
    setPoints("");
  };

  const handlePoints = (e) => {
    setPoints(e.target.value);
  };

  return (
    <Container style={{ height: "150%" }} className="container small-container">
      <Form onSubmit={handleSubmit}>
        <h2 style={{ margin: "1rem" }}>Create New Case</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Level</Form.Label>
          <Form.Control
            as="select"
            name="level"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            required
          >
            <option value="" disabled>
              --Select--
            </option>
            <option value="village">Village</option>
            <option value="cell">Cell</option>
            <option value="sector">Sector</option>
            <option value="district">District</option>
            <option value="province">Province</option>
            <option value="national">National</option>
          </Form.Control>
        </Form.Group>
        <Form.Label>Ingingo y'itegeko ritubahirijwe</Form.Label>
        <Form.Control as="select" value={chapter} onChange={handleChapter}>
          <option value="" disabled>
            Hitamo ingingo yitegeko
          </option>
          {Object.keys(laws[0]).map((chapter) => (
            <option keys={chapter} value={chapter}>
              {chapter}
            </option>
          ))}
        </Form.Control>
        {chapter !== "" && (
          <>
            <Form.Label>Hitamo Igika cyitegeko</Form.Label>
            <Form.Control as="select" value={article} onChange={handleArticle}>
              <option value="">Hitamo ingingo itubahirijwe</option>
              {Object.keys(laws[0][chapter]).map((article) => (
                <option value={article} key={article}>
                  {article}
                </option>
              ))}
            </Form.Control>
          </>
        )}
        {article !== "" && (
          <>
            <Form.Label>Hitamo Itegeko ritubahirijwe</Form.Label>
            <Form.Control as="select" value={points} onChange={handlePoints}>
              <option value="">Itegeko ritubahirijwe</option>
              {Object.keys(laws[0][chapter][article]).map((points) => (
                <option key={points} value={points}>
                  {points}
                </option>
              ))}
            </Form.Control>
          </>
        )}
        <Form.Group>
          <Form.Label>Assignee</Form.Label>
          <Form.Control
            as="select"
            name="assignedTo"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            required
          >
            <option value="">Hitamo uwo umenyesha</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name} {user.role}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default CreateCase;
