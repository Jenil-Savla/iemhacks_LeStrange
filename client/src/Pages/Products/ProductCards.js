import React from "react";
import { useNavigate } from "react-router-dom";

function ProductCards({ p }) {
  const navigate = useNavigate();

  return (
    <div
      className="card cursor-pointer rounded-lg bg-[#F9F8F8] p-[1.5rem] shadow-card"
      onClick={(e) => {
        e.preventDefault();
        navigate(`/singleProduct/${p._id}`);
      }}
    >
      <div className="tag bg-primary px-2 py-1 rounded-lg text-sm w-max text-white">
        {p?.cropType}
      </div>
      <img
        src={p?.image ? p?.image : "/Images/banana.png"}
        alt=""
        className="item m-auto"
      />
      <div className="name text-lg xl:text-lg text-primary font-bold mt-4">
        {p?.name}
      </div>
      <hr className="my-2" />
      <div className="bottom flex justify-between">
        <div className="text-sm text-primary font-bold">₹ {p?.price}/kg</div>
        <div className="text-sm text-primary font-bold">⭐⭐⭐⭐⭐</div>
      </div>
    </div>
  );
}

export default ProductCards;
