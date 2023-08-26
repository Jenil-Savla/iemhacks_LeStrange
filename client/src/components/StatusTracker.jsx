import React, { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { useContext, useEffect } from 'react';
import axios from 'axios';
import Map from './Map';    
import { Context } from "../Context/ContextProvider";
import Navbar from './Navbar';

export default function StatusTracker() {

        const [activeTab, setActiveTab] = useState(1);
        const [orders, setorders] = useState([]);
        const [order, setorder] = useState({});
        const [status, setstatus] = useState(false);
        const [search, setsearch] = useState('');

        const { config } = useContext(Context);
      
        const handleTabClick = (tabIndex) => {
          setActiveTab(tabIndex);
        };

        useEffect(() => {
            const getAllOrders = async () => {
              try {
                const { data } = await axios.get(
                  `http://localhost:8000/order/user`,
                    config
                );
                setorders(data.orders);
                if(data.orders.length > 0){
                    setorder(data.orders[0]);
                    setstatus(true);
                }
                console.log(orders, data.orders);
              } catch (error) {
                console.log(error?.response?.data);
              }
            };
            getAllOrders();
          }, []);

        const stat_button = (status) => {
            if(status === 'Placed') {
                return <button className='my-2 p-2 border border-dashed rounded-md text-red-700 bg-yellow opacity-50 cursor-default'>Placed</button>
            } else if(status === 'Shipped') {
                return <button className='my-2 p-2 border border-dashed rounded-md text-blue-900 bg-blue-300 opacity-50 cursor-default'>Shipped</button>
            } else if(status === 'Delivered') {
               return<button className='my-2 p-2 border border-dashed rounded-md text-green-700 bg-green-400 opacity-50 cursor-default'>Delivered</button>
            }
        }

  return (
    <div>
        <Navbar />
    
    <div className='max-w-[1240px] mx-auto flex'>
        <div className='bg-gray-200 m-2 p-5 flex flex-col w-2/5 h-page'>
            <h1 className='text-2xl font-bold'>Status Tracker</h1>
            <div className='flex text-gray-400 focus-within:text-gray-600 items-center' >
            <div className='bg-white mt-2 rounded-md p-[5px] mr-[-6px]'><AiOutlineSearch size={30} /></div>
            <input type='text' placeholder='Search' className='rounded-md rounded-l-none p-2 mt-2 w-[100%] focus:outline-none ' />
            </div>
            {orders?.map((order) => (
                
            <div onClick={() => {setorder(order)}} className='w-full bg-white shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300 mx-auto'>
                <div className='flex justify-between'>
                    <h2 className='my-2 p-2'>Order ID: {order._id}</h2>
                    {stat_button(order.status)}
                </div>
                <div className="h-1 w-full bg-neutral-200 dark:bg-neutral-600 rounded-md my-2">
                    <div className="h-1 w-[45%] rounded-md bg-green-500"></div>
                </div>
                <div className="flex">
                    <div className="w-1/6 flex flex-col items-end mt-[-5px]">
                        <div className='h-5 w-15 text-center'>{new Date(order.Placed).toLocaleDateString("en-US", {month:"short",day:"numeric"})}</div>
                        <div className='justify-center h-10 w-5'></div>
                        {order.status === 'Placed' ? <div className='h-5 w-10 text-center'> --:-- </div>
                        : <div className='h-5 w-15 text-center'>{new Date(order.Shipped).toLocaleDateString("en-US", {month:"short",day:"numeric"})}</div>}
                        <div className='justify-center h-10 w-5'></div>
                        {order.status === 'Delivered' ? <div className='h-5 w-15 text-center'>{new Date(order.Delivered).toLocaleDateString("en-US", {month:"short",day:"numeric"})}</div>
                        : <div className='h-5 w-10 text-center'> --:-- </div>}
                    </div>
                    <div className="w-1/6 flex flex-col items-center">
                        <div className="h-5 w-5 rounded-full bg-blue-500"></div>
                        <div className="w-1 h-10 bg-gray-300"></div>
                        {order.status=='Shipped' ? <div className="h-5 w-5 rounded-full bg-blue-500"></div> 
                        : <div className="h-5 w-5 rounded-full bg-gray-300"></div>}
                         <div className="w-1 h-10 bg-gray-300"></div>
                        {order.status=='Delivered' ? <div className="h-5 w-5 rounded-full bg-blue-500"></div>
                        : <div className="h-5 w-5 rounded-full bg-gray-300"></div>}
                    </div>
                    <div className="w-1/3 flex flex-col mt-[-5px]">
                        <div className='h-5 w-10 text-center'>Placed</div>
                        <div className='justify-center h-10 w-5'></div>
                        <div className='h-5 w-10 text-center'>Shipped</div>
                        <div className='justify-center h-10 w-5'></div>
                        <div className='h-5 w-10 text-center'>Delivered</div>
                    </div>
                    <div className="w-3/5 flex flex-col items-center mt-[-5px] ">
                        <div className='h-5 w-15 text-center'>{new Date(order.Placed).toLocaleTimeString("en-US",{hour12:true,hour:  "2-digit",minute: "2-digit"})}</div>
                        <div className='justify-center h-10 w-5'></div>
                        {order.status === 'Placed' ? <div className='h-5 w-10 text-center'> --:-- </div>
                         : <div className='h-5 w-15 text-center'>{new Date(order.Shipped).toLocaleTimeString("en-US",{hour12:true,hour:  "2-digit",minute: "2-digit"})}</div>}
                        <div className='justify-center h-10 w-5'></div>
                        {order.status === 'Delivered' ? <div className='h-5 w-15 text-center'>{new Date(order.Delivered).toLocaleTimeString("en-US",{hour12:true,hour:  "2-digit",minute: "2-digit"})}</div>
                        : <div className='h-5 w-10 text-center'> --:-- </div>}
                    </div>
                </div>
            </div>
            ))}
        </div>
        <div className='w-2/3 flex flex-col m-2 p-4 h-50'>
            <div className='mb-12'>
            <h1 className='text-2xl font-bold'>Order ID: {status ? order._id : "-"}</h1>
            {status ? <div><Map latt={order.location.latitude} long={order.location.longitude} />
            </div>
            : <div></div>}
            </div>
            <div >
                <h1 className='text-2xl font-bold mx-auto p-4'>Main Info</h1>
                <div className='w-full bg-white shadow-xl flex flex-col p-4  rounded-lg hover:scale-105 duration-300 mx-auto'>
                <div className='flex'>
                <div className="border-b border-gray-300">
                <div className="flex items-center space-x-4 gap-10">
                    <button
                    onClick={() => handleTabClick(1)}
                    className={`${
                        activeTab === 1 ? 'border-b-2 border-indigo-500' : ''
                    } focus:outline-none`}
                    >
                    Order Details
                    </button>
                    <button
                    onClick={() => handleTabClick(2)}
                    className={`${
                        activeTab === 2 ? 'border-b-2 border-indigo-500' : ''
                    } focus:outline-none`}
                    >
                    Delivery Information
                    </button>
                    {/* <button
                    onClick={() => handleTabClick(3)}
                    className={`${
                        activeTab === 3 ? 'border-b-2 border-indigo-500' : ''
                    } focus:outline-none`}
                    >
                    Customer Information
                    </button>
                    <button
                    onClick={() => handleTabClick(4)}
                    className={`${
                        activeTab === 4 ? 'border-b-2 border-indigo-500' : ''
                    } focus:outline-none`}
                    >
                    
                    </button> */}
                </div>

                {activeTab === 1 && (status ? <div>
                    <div className='flex flex-col mt-2 w-full'>
                        <div className='flex flex-row'>
                        <h1 className='text-lg font-bold mr-1'>Order ID:</h1>
                        <h1 className='text-lg'> {order._id}</h1>
                        </div>
                        <div className='flex flex-row'>
                            <div className='w-1/2'>
                                <h1 className='text-lg font-bold mr-1'>Order Status: </h1><h1>{order.status}</h1>
                                <h1 className='text-lg font-bold mr-1'>Order Date: </h1>
                                <h1>{new Date(order.Placed).toLocaleDateString("en-US", {month:"short",day:"numeric"})}</h1>
                            </div>
                            <div className='w-1/2'>
                                <h1 className='text-lg font-bold mr-1'>Total Price: </h1>
                                <h1>{order.price}</h1>
                                <h1 className='text-lg font-bold mr-1'>Total Items: </h1>
                                <h1>{order.quantity}</h1>
                            </div>
                        </div>
                    </div>
                </div> : <div className='flex flex-col mt-2'>
                        <div className='flex flex-row'>
                        <h1 className='text-lg font-bold mr-1'>Order ID: </h1>
                        </div>
                        <div className='flex flex-row'>
                            <div className='w-1/2'>
                                <h1 className='text-lg font-bold mr-1'>Order Status: </h1>
                                <h1 className='text-lg font-bold mr-1'>Order Date: </h1>
                            </div>
                            <div className='w-1/2'>
                                <h1 className='text-lg font-bold mr-1'>Total Price: </h1>
                                <h1 className='text-lg font-bold mr-1'>Total Items: </h1>
                            </div>
                        </div>
                    </div>)
                }
                {activeTab === 2 && 
                (
                    status ? <div className='flex flex-col mt-2'>
                        <div className='flex flex-row'>
                        <h1 className='text-lg font-bold'>Delivery Address:</h1> 
                        </div>
                        <div className='flex flex-row'>
                        <h1 className='text-lg'>{order.address}</h1>
                        </div>
                        <div className='flex flex-row'>
                        <h1 className='text-lg font-bold mr-1'>Delivery OTP: </h1>
                        <h1 className='text-lg'> {order.otp}</h1> 
                        </div>
                    </div>
                    : <div className='flex flex-col mt-2'>
                        <div className='flex flex-row'>
                        <h1 className='text-lg font-bold'>Delivery Address:</h1>
                        </div>
                        <div className='flex flex-row'>
                        <h1 className='text-lg'>-</h1>
                        </div>
                        <div className='flex flex-row'>
                        <h1 className='text-lg font-bold'>Delivery OTP: </h1>
                        </div>
                    </div>
                )
                }
                {activeTab === 3 && <div>Content for Tab 3</div>}
                </div>
            </div>
        </div>
        </div>
        </div>
    </div>
    </div>
  )
}
