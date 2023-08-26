import React from "react";
import { useNavigate } from "react-router-dom";

function Cards({ image, name }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        navigate(`/products/${name}`);
      }}
      className="rounded-2xl border bg-slate-100 cursor-pointer space-y-[10px] h-fit"
    >
      <img
        className="rounded-tl-2xl w-full rounded-tr-2xl h-64"
        src={image}
        alt="Main"
      />
      <h1 className="capitalize text-center font-bold">{name}</h1>
    </div>
  );
}

export default Cards;
