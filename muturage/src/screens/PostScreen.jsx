import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useReducer } from "react";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import ListGroup from "react-bootstrap/ListGroup";
import {
  BiComment,
  BiCommentCheck,
  BiCommentMinus,
  BiDislike,
  BiDotsVertical,
  BiLike,
} from "react-icons/bi";
import { useParams } from "react-router-dom";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, post: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function PostScreen() {
  const [{ loading, error, post }, dispatch] = useReducer(reducer, {
    error: "",
    loading: true,
    post: [],
  });
  const params = useParams();
  const { id: postId } = params;
  useEffect(() => {
    const fetchPost = async (req, res) => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const res = await axios.get(`/api/post/${postId}`);
        dispatch({ type: "FETCH_SUCCESS", payload: res });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: error.message });
      }
    };
    fetchPost();
  }, [postId]);
  return (
    <div>
      {/* {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>error..</div>
      ) : (
        <h1>j</h1>
      )} */}
      <Row className="mt-6">
        <Col md={6}>{post.body}</Col>
      </Row>
    </div>
  );
}

export default PostScreen;
