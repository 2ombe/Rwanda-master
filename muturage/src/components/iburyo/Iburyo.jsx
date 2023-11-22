import "./iburyo.css";
import Metting from "./noticeBoard/metting";
import Notice from "./noticeBoard/Notice";

export default function Iburyo() {
  return (
    <div className="iburyo">
      <Notice />
      <hr className="hrline" />
      <Metting />
    </div>
  );
}
//the proplem line on user and id which are not being found
//530804olc0122022
