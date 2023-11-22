import React from "react";
import "../App.css";
import MyVisitor from "../screens/MyVisitor";
import Ushakishwa from "../screens/Ushakishwa";
import Inshingano from "../screens/Inshingano";
import { Link } from "react-router-dom";
import { RiCriminalLine } from "react-icons/ri";
import { BsPerson } from "react-icons/bs";

export default function Njye() {
  return (
    <div className="contain">
      <div className="left">
        <Link to="/umushyitsi">
          <BsPerson />
          <span>abantu bashya iwawe</span>
        </Link>
      </div>
      <div className="center">
        <Link to="/ucyekwa">
          <RiCriminalLine />
          <span>Ukekwa</span>
        </Link>
      </div>
      <div className="right">
        <Inshingano />
      </div>
    </div>
  );
}
