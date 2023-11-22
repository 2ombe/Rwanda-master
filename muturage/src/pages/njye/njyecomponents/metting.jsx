import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import "./notice.css";
import { MdMeetingRoom } from "react-icons/md";

export default function Appointement() {
  return (
    <>
      <Card className="metting">
        <div className="noticewrapper">
          <Card.Header className="showTitle">your part</Card.Header>
          <Card.Img src={<MdMeetingRoom />}></Card.Img>
          <Card.Body className="noticeCenter">
            <Card.Text className="body">ubusobanuro</Card.Text>

            <ListGroup className="participants">
              <div className="images">
                <ListGroup.Item className="paricipantsImg">
                  amasomo
                </ListGroup.Item>
                <ListGroup.Item>imikurire</ListGroup.Item>
              </div>
            </ListGroup>
            <div className="location">
              <Card.Title className="location">
                location: camp kigali
              </Card.Title>
            </div>
            <Card.Text className="dateTitle">Bizaba</Card.Text>
            <div className="dates">
              <Card.Subtitle className="start">on: 15th june</Card.Subtitle>
            </div>

            <div className="buttons">
              <Button className="add">join session</Button>
            </div>
          </Card.Body>
        </div>
      </Card>
    </>
  );
}
