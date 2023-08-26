import React, { useContext } from "react";
// import tomato from '../assets/tomato.png'
// import dots from '../assets/dots.png'
// import deletee from '../assets/delete.png'
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Context } from "../Context/ContextProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ItemCard = ({ p, idx, cart }) => {
  const navigate = useNavigate();
  const { user, config, setUser } = useContext(Context);

  const handleDelete = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/user/removefromcart",
        {
          productId: p._id,
        },
        config
      );
      console.log(res.data);
      setUser(res.data.user);
      navigate(0);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="border-[0.5px] border-slate-200 rounded-md flex w-full p-4">
      {cart[idx] && (
        <>
          <img
            src={p.image ? p.image : "/Images/banana.png"}
            alt=""
            className="h-36 rounded-lg mr-4"
          />
          <div className="right w-full">
            <div className="item flex justify-between">
              <div className="name text-2xl font-semibold">{p.name}</div>
              <div className="options flex justify-between items-center">
                <BsThreeDotsVertical />
                <RiDeleteBin6Line onClick={handleDelete} />
              </div>
            </div>
            <div className="cost flex justify-between">
              <div className="text-md font-medium">
                Quantity: {cart[idx].quantity}
              </div>
              <div className="cost">₹ {p.price}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ItemCard;
