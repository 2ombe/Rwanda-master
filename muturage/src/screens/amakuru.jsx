import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function Amakuru() {
  return (
    <div>
      <div className="abashyitsi">
        <div className="abashyitsiwrapper">
          <div className="abashyitsileft">
            <div className="abashyitsiLogo">IWAWE</div>
            <span className="abashyitsiDesc">
              abashyitsi cyangwa abakodesha
            </span>
          </div>
          <div className="abashyitsiright">
            <Form className="abashyitsiBox">
              <input
                type="text"
                className="abashyitsiInput"
                placeholder="Amazina"
              />
              <input
                type="text"
                className="abashyitsiInput"
                placeholder="Ubwenegihugu"
              />

              <input
                type="id"
                className="abashyitsiInput"
                placeholder="Nomero y' Indangamuntu"
              />
              <input
                type="inshingano"
                className="abashyitsiInput"
                placeholder="Inshingano"
              />
              <input
                type="email"
                className="abashyitsiInput"
                placeholder="Email"
              />
              <input
                type="password"
                className="abashyitsiInput"
                placeholder="Ijambo banga"
                minLength="6"
              />
              <input
                type="password"
                className="abashyitsiInput"
                placeholder="Emeza ijambo banga"
                minLength="6"
              />

              <Button className="registerButton" type="submit">
                Mwiyandikishe
              </Button>

              <Button className="loginRegister">Mwinjire</Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
