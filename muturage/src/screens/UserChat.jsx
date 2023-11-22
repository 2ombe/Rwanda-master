import axios from "axios";
import React, { useContext, useReducer, useState } from "react";
import { Button, Card, Col, FormControl, InputGroup } from "react-bootstrap";
import { BiSearchAlt2 } from "react-icons/bi";
import { toast } from "react-toastify";
import UserList from "../components/UserList";
import { Store } from "../store";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, searchResult: action.payload };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function UserChat() {
  const [search, setSearch] = useState("");
  const [SearchResult, SetSearchResult] = useState([]);
  const [text, setText] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [{ loading, error, searchResult }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
    searchResult: [],
  });

  const { state } = useContext(Store);
  const { userInfo, chats, selectedChat } = state;

  const handleSearch = async () => {
    if (!search) {
      toast("shiramo ijambo ubone gushakisha");
      return;
    }
    try {
      dispatch({ type: "FETCH_REQUEST" });
      const { data } = await axios.get(`/api/auth?search=${search}`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      dispatch({ type: "FETCH_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "FETCH_FAIL" });
      toast("Gushakisha ntibiri gushoboka");
    }
  };
  const accessChat = () => {};
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  return (
    <Col md={4}>
      <Card>
        <Card.Header>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Shakisha uwo ukeneye"
              aria-label="ukeneye"
              aria-describedby="basic-addon2"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button
              onClick={handleSearch}
              variant="outline-secondary"
              id="button-addon2"
            >
              <BiSearchAlt2 />
            </Button>
          </InputGroup>
        </Card.Header>
      </Card>
      <Card>
        <Card.Body>
          {searchResult?.map((user) => (
            <UserList
              key={user._id}
              user={user}
              handleFunction={() => accessChat(user._id)}
            />
          ))}
        </Card.Body>
      </Card>
    </Col>
  );
}

export default UserChat;
