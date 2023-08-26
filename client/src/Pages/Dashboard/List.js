import React, { useEffect, useState } from "react";
import { FaShoppingBag } from "react-icons/fa";
import axios from "axios";

const List = ({ order, placed }) => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get(
        `http://localhost:8000/user/${order.userId}`
      );
      setUser(response.data.user);
    };
    getUser();
  }, [order]);

  return (
    <li className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 flex items-center cursor-pointer">
      <div className="bg-purple-100 rounded-lg p-3">
        <FaShoppingBag className="text-purple-800" />
      </div>
      <div className="pl-4">
        <p className="text-gray-800 font-bold">₹{order.price}</p>
        {user && <p className="text-gray-400 text-sm">{user.name}</p>}
      </div>
      <p className="lg:flex md:hidden absolute right-6 text-sm">{placed}</p>
    </li>
  );
};

export default List;
