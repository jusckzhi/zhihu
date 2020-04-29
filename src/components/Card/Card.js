import React from "react";
import "./Card.css";
import { Link } from "react-router-dom";
function Card(props) {
  const { d } = props;
  return (
    <Link to="/detail" className="card">
      <div className="card-con">{d.title}</div>
      <img src={d.images[0]} alt="" />
    </Link>
  );
}
export default Card;
