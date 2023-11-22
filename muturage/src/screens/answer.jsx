import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { BsFillShareFill } from "react-icons/bs";
import Hejuru from "../hejuru/Hejuru";
import "./answer.css";

export default function Answer() {
  return (
    <div>
      <div className="register">
        <div className="registerwrapper">
          <div className="registerleft">
            <div className="registerLogo">I Rwanda</div>
            <span className="registerDesc">
              Menyana nabayobozi nabaturanyi bawe
            </span>
          </div>
          <div className="registerright">
            <form className="registerBox">
              <input type="text" className="loginInput" placeholder="Amazina" />
              <input
                type="text"
                className="registerInput"
                placeholder="Ubwenegihugu"
              />

              <input
                type="id"
                className="registerInput"
                placeholder="Nomero y' Indangamuntu"
              />
              <input
                type="inshingano"
                className="registerInput"
                placeholder="Inshingano"
              />
              <input
                type="email"
                className="registerInput"
                placeholder="Email"
              />
              <input
                type="password"
                className="registerInput"
                placeholder="Ijambo banga"
                minLength="6"
              />
              <input
                type="password"
                className="registerInput"
                placeholder="Emeza ijambo banga"
                minLength="6"
              />
              <button className="registerButton" type="submit">
                Mwiyandikishe
              </button>

              <button className="loginRegister">Mwinjire</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
