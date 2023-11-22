import "./abayobazi.css";

export default function Presidence() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <>
      <div>Presidecce</div>
      <div>
        <li className="abayobozi">
          <img src={PF + "/profile/avatarb.jpg"} alt="" className="ifoto" />
          <h6 className="inshingano">umuyobozi</h6>
          <h6 className="inshingano">mudugudu</h6>
        </li>
      </div>
      ;
    </>
  );
}
