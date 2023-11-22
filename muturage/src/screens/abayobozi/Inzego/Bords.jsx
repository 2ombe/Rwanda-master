import "./abayobazi.css";
const PF = process.env.REACT_APP_PUBLIC_FOLDER;
export default function Bords() {
  return (
    <div>
      <li className="abayobozi">
        <div className="container"></div>
        <img src={PF + "/profile/avatarb.jpg"} alt="" className="ifoto" />
        <h6 className="inshingano">umuyobozi</h6>
        <h6 className="inshingano">mudugudu</h6>
      </li>
    </div>
  );
}
