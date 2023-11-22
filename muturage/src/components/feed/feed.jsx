import "./feed.css";

import { Link } from "react-router-dom";
import {
  GiArchiveRegister,
  GiCarKey,
  GiInjustice,
  GiShop,
  GiStairsGoal,
} from "react-icons/gi";
import { RiCriminalFill } from "react-icons/ri";
import { AiFillNotification } from "react-icons/ai";
import { TbFileReport } from "react-icons/tb";
import { BiTask } from "react-icons/bi";

export default function Feed() {
  return (
    <div className="sidebar">
      <div className="rightbar-wrapper">
        <ul className="sidebarList">
          <Link to="/imihigo">
            <li className="listItem">
              <GiStairsGoal className="right-icon" />
              <span className="textList">Imihigo</span>
            </li>
          </Link>
          <Link to="/amasoko">
            <li className="listItem">
              <GiShop className="right-icon" />
              <span className="textList">Amasoko</span>
            </li>
          </Link>
          <li className="listItem">
            <Link to="/case">
              <GiInjustice className="right-icon" />
              <span className="textList">tanga ikirego</span>
            </Link>
          </li>
          <li className="listItem">
            <Link to="/inshingano">
              <BiTask className="right-icon" />
              <span className="textList">tanga inshingano</span>
            </Link>
          </li>
          <Link to="/gahunda">
            <li className="listItem">
              <AiFillNotification className="right-icon" />
              <span className="textList">Saba gahunda</span>
            </li>
          </Link>
          <li className="listItem">
            <Link to="/abashyitsi">
              <GiArchiveRegister className="right-icon" />
              <span className="textList" style={{ textDecoration: "none" }}>
                kwandikisha abashyitsi
              </span>
            </Link>
          </li>
          <li className="listItem">
            <Link to="/ushakishwa">
              <RiCriminalFill className="right-icon" />
              <span className="textList">ushakishwa</span>
            </Link>
          </li>
          <li className="listItem">
            <Link to="/report">
              <TbFileReport
                className="right-icon"
                style={{ textDecolation: "none" }}
              />
              <span className="textList">raporo</span>
            </Link>
          </li>
          <Link to="/impushya">
            <li className="listItem">
              <GiCarKey className="right-icon" />
              <span className="textList">uruhushya</span>
            </li>
          </Link>
        </ul>
        {/* //<button className="right-btn">show more</button> */}
        <hr className="s-hr" />
        {/* <h2>abayobozi banjye</h2>
        <h6>request for appointement</h6>
        <h6>write formal letter</h6> */}
      </div>
      {/* <ul className="friendList">
        <Abayobozi />
      </ul> */}
    </div>
  );
}
