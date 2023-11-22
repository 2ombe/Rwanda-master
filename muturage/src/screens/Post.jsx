import {
  BiDotsVertical,
  BiLike,
  BiDislike,
  BiComment,
  BiCommentMinus,
  BiCommentCheck,
} from "react-icons/bi";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import "./post.css";

export default function Post({ post }) {
  const backgroundImageStyle = {
    backgroundImage: `url(${post.image})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
  };

  return (
    <div>
      <Card className="post" key={post._id}>
        <Card.Header className="postTop">
          <div className="postTleft">
            <img
              src="pictures/profile/avatarb.jpg"
              alt="post"
              className="postImg"
            />
            <span className="username">{post.createdBy.name}</span>
            <span className="date">12</span>
          </div>
          <div className="postTright">
            <BiDotsVertical />
          </div>
        </Card.Header>
        <Card.Body className="postWrapper">
          <div className="postCenter" style={backgroundImageStyle}>
            <Card.Title className="postCtext">{post.title}</Card.Title>
            <Link to={`/post/${post._id}`}>
              <div className="postCimg" />
            </Link>
          </div>
          <Card.Text className="postCtext">{post.body}</Card.Text>
          <div className="postButton">
            <div className="postButtonLeft">
              <BiLike className="like" />
              <span className="likeCounter"> bayikunze</span>
              <BiDislike className="like" />
              <span className="likeCounter">bayanze</span>
            </div>
            <div className="postButtonRight">
              <BiComment className="comment" />
              <span className="commentCounter">ibitekerezo</span>
              <BiCommentCheck className="comment" />
              <span className="commentCounter">bashimye</span>
              <BiCommentMinus className="comment" />
              <span className="commentCounter"> banenze</span>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
