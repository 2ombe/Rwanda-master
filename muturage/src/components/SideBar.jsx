import React from "react";
import { Card, Tooltip } from "react-bootstrap";

function SideBar() {
  return (
    <div>
      <Card
        d="flex"
        w="100%"
        bg="white"
        p="5px 10px 5px 10px"
        style={{ borderWidth: "5px" }}
      >
        <Tooltip aria-label="shakisha uwo ukeneye"></Tooltip>
      </Card>
    </div>
  );
}

export default SideBar;
