import "./ibumoso.css";
import { useContext, useReducer } from "react";
import axios from "axios";
import { useEffect } from "react";
import Share from "../../screens/share";
import Post from "../../screens/Post";
import { Store } from "../../store";

const reducer = (action, state) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, posts: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function Ibumoso() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, error, posts }, dispatch] = useReducer(reducer, {
    error: "",
    loading: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const res = await axios.get("/api/post", {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: res.data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: error.message });
      }
    };
    fetchData();
  }, [userInfo]);
  return (
    <div>
      <>
        {posts &&
          posts.map((post) => (
            <div key={post._id}>
              <Post post={post} />
            </div>
          ))}
        <Share />
      </>
    </div>
  );
}
