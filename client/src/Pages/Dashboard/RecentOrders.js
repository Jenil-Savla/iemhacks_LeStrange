import React, { useState, useEffect } from "react";
import { data } from "./data";
import { FaShoppingBag } from "react-icons/fa";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import axios from "axios";
import List from "./List";

const RecentOrders = ({ orders }) => {
  const [placed, setPlaced] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    let user = [];
    orders.map(async (order) => {
      const res = await axios.get(`http://localhost:8000/user/${order.userId}`);
      user.push(res.data.user);
    });
    console.log(user);
    setUsers(user);
  }, [orders]);

  useEffect(() => {
    TimeAgo.addLocale(en);
    const timeAgo = new TimeAgo("en-US");
    let place = [];
    orders.map((order) => {
      place.push(timeAgo.format(new Date(order.Placed)));
    });
    setPlaced(place);
  }, [orders]);

  useEffect(() => {}, [orders]);
  return (
    <div className="w-full col-span-1 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white overflow-scroll">
      <h1>Recent Orders</h1>
      <ul>
        {orders.map((order, id) => (
          <List order={order} placed={placed[id]} key={id} />
        ))}
      </ul>
    </div>
  );
};

export default RecentOrders;
