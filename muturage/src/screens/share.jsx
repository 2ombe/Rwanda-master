import "./share.css";

import { useContext } from "react";
import { useState } from "react";
import axios from "axios";
import { GiCancer } from "react-icons/gi";
import { BsFillPenFill } from "react-icons/bs";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { BiSend } from "react-icons/bi";
import { toast } from "react-toastify";
import { Store } from "../store";
import { useNavigate } from "react-router";

export default function Share() {
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    formData.append("image", image);
    try {
      const { data } = await axios.post("api/post", formData, {
        headers: { Authorization: `Bearer ${state.userInfo.token}` },
      });
      console.log(data);
      setTitle("");
      setBody("");
      setImage(null);
      toast.success("Post created successfully");
      navigate("/home");
    } catch (error) {
      toast.error(error);
    }
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleCloseModel = () => {
    setShowModal(false);
  };
  return (
    <>
      <Button
        onClick={() => setShowModal(true)}
        style={{
          position: "fixed",
          bottom: 0,

          overflow: "auto",
          backgroundColor: "white",
          color: "blue",
        }}
      >
        <BsFillPenFill fontSize={50} />
      </Button>
      <Modal
        centered
        show={showModal}
        onHide={handleCloseModel}
        className="shareTop"
      >
        <Modal.Header>
          <Modal.Title>Tanga ubutumwa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Ingingo uvugaho"
              as="textarea"
              aria-describedby="basic-addon1"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </InputGroup>

          <InputGroup>
            <Form.Control
              placeholder="image"
              type="file"
              aria-describedby="basic-addon1"
              onChange={handleFileChange}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCloseModel}>
            <GiCancer color="red" fontSize={20} />
          </Button>
        </Modal.Footer>
        <Button style={{ width: "10%", right: 0 }} onClick={submitHandler}>
          <BiSend fontSize={20} />
        </Button>
      </Modal>
    </>
  );
}
// activate active aclasse for open sharing button
