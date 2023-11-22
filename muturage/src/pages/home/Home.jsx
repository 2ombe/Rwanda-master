import Iburyo from "../../components/iburyo/Iburyo";
import Ibumoso from "../../components/ibumoso/Ibumoso";
import Feed from "../../components/feed/feed";
import "./home.css";

export default function Home() {
  return (
    <div>
      <div className="homeContainer">
        {/* <h1>
          The system is currently under registration process{" "}
          <span style={{ color: "blue" }}>contact owner: +250780486358</span>
        </h1> */}
        <Iburyo />
        <Ibumoso />
        <Feed />
      </div>
    </div>
  );
}
