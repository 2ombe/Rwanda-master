import "./online.css";

export default function Online({ user }) {
  return (
    <div>
      <li className="incuti">
        <div className="incutiProfile">
          <img src={user.image} alt="" className="person" />
          <span className="online"></span>
        </div>
        <span className="name">{user.name}</span>
      </li>
      ;
    </div>
  );
}
