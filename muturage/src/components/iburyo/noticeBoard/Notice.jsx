import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import "./notice.css";
export default function Notice() {
  return (
    <>
      <Card className="notice1">
        <div className="noticewrapper">
          <Card.Header className="showTitle">my weekshow</Card.Header>
          <Card.Img
            className="noticeImg"
            variant="top"
            src="/pictures/profile/avatarg.jpg"
          ></Card.Img>
          <Card.Body className="noticeCenter">
            <Card.Text className="body">ubusobanuro</Card.Text>

            <ListGroup className="participants">
              <div className="images">
                <ListGroup.Item className="paricipantsImg">
                  <Card.Img
                    className="main"
                    src="/pictures/profile/avatarb.jpg"
                  />
                  <span className="names">cris</span>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Card.Img
                    className="main"
                    src="/pictures/profile/avatarb.jpg"
                  ></Card.Img>
                  <span className="names">lehoboat</span>
                </ListGroup.Item>
              </div>
            </ListGroup>
            <div className="location">
              <Card.Title className="location">
                {" "}
                location: camp kigali
              </Card.Title>
            </div>
            <Card.Text className="dateTitle">Bizaba</Card.Text>
            <div className="dates">
              <Card.Subtitle className="start">on: 15th june</Card.Subtitle>
              <Card.Subtitle>to: 15th july</Card.Subtitle>
            </div>

            <ListGroup>
              <div className="contacts">
                <ListGroup.Item>Phone:089</ListGroup.Item>
                <ListGroup.Item>Email:089</ListGroup.Item>
                <ListGroup.Item>website:sinaloa</ListGroup.Item>
              </div>
            </ListGroup>
            <div className="buttons">
              <Button className="add">add</Button>
              <Button className="ticket">ticket</Button>
            </div>
          </Card.Body>
        </div>
      </Card>
    </>
  );
}
