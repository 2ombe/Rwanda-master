import axios from "axios";
import ScrollableFeed from "react-scrollable-feed";
import React, { useContext, useEffect, useReducer, useState } from "react";
import {
  Button,
  Card,
  Col,
  FormControl,
  InputGroup,
  Modal,
  Row,
} from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { BiSearchAlt2, BiSend } from "react-icons/bi";
import { BsPenFill } from "react-icons/bs";
import { toast } from "react-toastify";
import { Store } from "../store";
import { getError } from "../utils";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, cases: action.payload };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    case "UPLOAD_REQUEST":
      return { ...state, loadingUpload: true, errorUpload: "" };
    case "UPLOAD_SUCCESS":
      return { ...state, loadingUpload: false, errorUpload: "" };
    case "UPLOAD_FAIL":
      return { ...state, loadingUpload: false, errorUpload: action.payload };
    default:
      return state;
  }
};

function Ibirego() {
  const [searchText, setSearchText] = useState("");
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [impamvu, setImpamvu] = useState("");
  const [descreption, setDescreption] = useState("");
  const [conclusion, setConclusion] = useState("");
  const [signature, setSignature] = useState("");
  const [file, setFile] = useState(null);
  const { state } = useContext(Store);
  const { userInfo } = state;

  const [{ loading, error, cases, loadingUpload }, dispatch] = useReducer(
    reducer,
    {
      cases: [],
      loading: true,
      error: "",
    }
  );

  const uploadHandler = async (e, forFiles) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("file", file);

    try {
      dispatch({ type: "UPLOAD_REQUEST" });
      const { data } = await axios.post("/api/upload", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      dispatch({ type: "UPLOAD_SUCCESS" });
      if (forFiles) {
        setFile([...file, data.secure_url]);
      }
      toast.success("Imigereka yongeweho neza");
    } catch (error) {
      dispatch({ type: "FETCH_FAIL", payload: getError(error) });
    }
  };

  const handleSendMessage = async () => {
    try {
      const { data } = await axios.post(
        "/api/sendcase",
        {
          impamvu,
          descreption,
          conclusion,
          signature,
          file,
        },

        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
    } catch (error) {}
  };

  useEffect(() => {
    const fetchCases = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const { data } = await axios.get("/api/sendcase", {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: getError(error) });
      }
    };
    fetchCases();
  }, [userInfo]);

  const handleUser = (user) => {
    setSelectedUser(user);
    setMessages([]);
  };

  const accessChat = async (userId) => {};

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const filterUsers = [
    { id: 1, name: "User 1" },
    { id: 1, name: "User 2" },
    { id: 1, name: "User 3" },
  ].filter((user) =>
    user.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
  );

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleSearchText = (e) => {
    setSearchText(e.target.value);
  };
  return (
    <>
      <Helmet>
        <title>Ubuyobozi</title>
      </Helmet>
      <Row>
        <Col md={4}>
          <Card>
            <Card.Header>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Shakisha uwo ukeneye"
                  aria-label="ukeneye"
                  aria-describedby="basic-addon2"
                  value={searchText}
                  onChange={handleSearchText}
                />
                <Button variant="outline-secondary" id="button-addon2">
                  <BiSearchAlt2 />
                </Button>
              </InputGroup>
            </Card.Header>
            <Card.Body>
              {filterUsers.map((user) => (
                <p key={user.id} onClick={() => handleUser}>
                  {user.name}
                </p>
              ))}
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Card>
            <Card.Header>
              {selectedUser ? (
                <h2>{selectedUser.name}</h2>
              ) : (
                <h2>Hitamo uwo ukeneye kuvugisha</h2>
              )}
            </Card.Header>
            <Card.Body>
              <ScrollableFeed>
                {selectedUser && (
                  <>
                    <div key={cases._id}>
                      <h3>{cases.descreption}</h3>
                      <p>{cases.conclusion}</p>
                      <p>{cases.image}</p>
                    </div>
                  </>
                )}
              </ScrollableFeed>
              <Button onClick={() => setShowModal(true)}>
                <BsPenFill style={{ fontSize: "1.5rem" }} />
              </Button>
              <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Ubutumwa bushya</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <InputGroup className="mb-3">
                    <FormControl
                      as="select"
                      value={impamvu}
                      onChange={(e) => setImpamvu(e.target.value)}
                    >
                      <option value="">Impamvu</option>
                      <option value="ghr">Guhura numuyobozi</option>
                      <option value="ik">Ikirego</option>
                      <option value="UB">Ubusobanuro</option>
                      <option value="IZI">Izindi mpamvu</option>
                    </FormControl>
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <FormControl
                      placeholder="sobanura"
                      aria-label="ubusobanuro"
                      as="textarea"
                      aria-describedby="basic-addon1"
                      value={descreption}
                      onChange={(e) => setDescreption(e.target.value)}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <FormControl
                      placeholder="umwanzuro"
                      as="textarea"
                      aria-describedby="basic-addon1"
                      value={conclusion}
                      onChange={(e) => setConclusion(e.target.value)}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <FormControl
                      placeholder="Imigereka"
                      aria-describedby="basic-addon1"
                      type="file"
                      onChange={(e) => uploadHandler(e, true)}
                    />
                  </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleModalClose}>
                    close
                  </Button>
                  <Button variant="primary" onClick={handleSendMessage}>
                    <BiSend style={{ fontSize: "1.5rem" }} />
                  </Button>
                </Modal.Footer>
              </Modal>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Ibirego;
