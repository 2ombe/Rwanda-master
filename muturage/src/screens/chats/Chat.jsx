import React from "react";
import { useContext } from "react";
import { Card } from "react-bootstrap";
import { Store } from "../../store";
import ChatBox from "./ChatBox";
import GroupChat from "./ChatBox";
import LeaderChat from "./LeaderChat";
import MyChats from "./MyChats";

function Chat() {
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  return (
    <div>
      {/* {<SideBar />} */}
      <Card style={{ display: "flex" }}>
        <MyChats />
        <ChatBox />
      </Card>

      <LeaderChat />
      <GroupChat />
    </div>
  );
}

export default Chat;
