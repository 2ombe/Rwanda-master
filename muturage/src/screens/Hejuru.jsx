import "./hejuru.css";
import { BsChatText, BsBell, BsFillPersonFill, BsSearch } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { RW } from "country-flag-icons/react/3x2";
import { AiOutlineLogout } from "react-icons/ai";
import { Button } from "react-bootstrap";
import { useContext } from "react";
import { Store } from "../store";

export default function Hejuru() {
  const navigate = useNavigate();
  const { dispatch: ctxDispatch } = useContext(Store);

  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  return [
    <>
      <>
        <div className="hejuruContainer">
          <div className="hejuruLeft">
            <Link to={"/home"}>
              <RW title="rwanda" className="flag" />
            </Link>
          </div>
          <div className="hejuruCenter">
            <div className="searchbar">
              <BsSearch className="search-icon" />
              <input
                placeholder="shakisha amakuru, inshuti cyanga ubutumwa"
                className="search-input"
              />
            </div>
          </div>
          <div className="hejuruRight">
            <div className="topbarLink">
              <Link to="/chat">
                <span className="topbarLink">Ihuriro</span>
              </Link>
            </div>
            <div className="topbarIcons">
              {/* <div className="topbarIcon">
                <BsFillPersonFill />
                <span className="topbarIconBadge">1</span>
              </div>
              <div className="topbarIcon">
                <BsChatText />
                <span className="topbarIconBadge">1</span>
              </div>
              <div className="topbarIcon">
                <BsBell />
                <span className="topbarIconBadge">1</span>
              </div> */}
            </div>
          </div>
          <Link to={`/njye`}>
            <img src="profile/avatarb.jpg" alt="" className="topbar-img" />
          </Link>
          <Button
            style={{
              backgroundImage:
                "linear-gradient(to right, blue, rgb(167, 167, 36), green)",
            }}
            onClick={signoutHandler}
          >
            <AiOutlineLogout className="out" />
          </Button>
        </div>
      </>
    </>,
  ];
}
