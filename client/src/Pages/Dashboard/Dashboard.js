import React, { useState, useEffect, useContext } from "react";
import Navbar from "../../components/Navbar";
import TopCards from "./TopCards";
import BarChart from "./BarChart";
import RecentOrders from "./RecentOrders";
import axios from "axios";
import { Context } from "../../Context/ContextProvider";

const Dashboard = () => {
  const [ordersDaily, setOrdersDaily] = useState([]);
  const [ordersWeekly, setOrdersWeekly] = useState([]);
  const [orders, setOrders] = useState([]);
  const [daily, setDaily] = useState(0);
  const [weekly, setWeekly] = useState([]);
  const [overall, setOverall] = useState(0);
  const { config } = useContext(Context);

  useEffect(() => {
    const getDailyOrders = async () => {
      const response = await axios.get(
        "http://localhost:8000/order/today",
        config
      );
      setOrdersDaily(response.data.orders);
    };
    const getWeeklyOrders = async () => {
      const response = await axios.get(
        "http://localhost:8000/order/week",
        config
      );
      setOrdersWeekly(response.data.orders);
    };
    const allOrders = async () => {
      const response = await axios.get(
        "http://localhost:8000/order/overall",
        config
      );
      setOrders(response.data.orders);
    };
    getDailyOrders();
    allOrders();
    getWeeklyOrders();
  }, []);

  useEffect(() => {
    let total = 0;
    ordersDaily.forEach((order) => {
      total += order.price;
    });
    setDaily(total);
  }, [ordersDaily]);

  useEffect(() => {
    let total = [0, 0, 0, 0, 0, 0, 0];
    ordersWeekly.forEach((order) => {
      total[new Date(order.Placed).getDay()] += order.price;
    });
    setWeekly(total);
  }, [ordersWeekly]);

  useEffect(() => {
    let total = 0;
    orders.forEach((order) => {
      total += order.price;
    });
    setOverall(total);
  }, [orders]);

  return (
    <div>
      <Navbar />
      <TopCards daily={daily} overall={overall} noOrder={orders.length} />
      <div className="p-4 pb-0 grid md:grid-cols-3 grid-cols-1 gap-4">
        <BarChart weekly={weekly} />
        <RecentOrders orders={orders} />
      </div>
    </div>
  );
};

export default Dashboard;
