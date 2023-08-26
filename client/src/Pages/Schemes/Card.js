import React from "react";
import { Link } from "react-router-dom";

function Card({title, description, link}) {
  return (
    <div className="rounded-[30px] bg-[#F9F8F8] p-[1.5rem] shadow-card">
      <div>
        <h1 className="capitalize text-primary text-center font-bold">{title}</h1>
      </div>
      <div>
        <p className="my-2 break-words">
          {description}
        </p>
      </div>
      <Link className="text-secondary" to={link}>
        Click here for more info
      </Link>
    </div>
  );
}

export default Card;
