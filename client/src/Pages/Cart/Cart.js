import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import CartSummary from "../../components/CartSummary";
import ItemsOverview from "./ItemsOverview";
import AddressDetails from "./AddressDetails";
import Payment from "./Payment";
import { Context } from "../../Context/ContextProvider";
import axios from "axios";

const Cart = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(1);
  const [cart, setCart] = useState([]); // [user, setUser
  const [products, setProducts] = useState([]);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pin, setPin] = useState("");
  const { config } = useContext(Context);

  useEffect(() => {
    const fetchCart = async () => {
      const res = await axios.get(`http://localhost:8000/user/cart`, config);
      console.log(res.data.cart);
      setCart(res.data.cart);
    };
    fetchCart();
  }, []);

  const placeOrder = async () => {
    try {
      let price = 0;
      products.forEach((item, index) => {
        price += item.price * cart[index].quantity;
      });
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const res = await axios.post(
            `http://localhost:8000/order/create`,
            {
              products: cart,
              price: price,
              address: address,
              location: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              },
            },
            config
          );
          console.log(res.data);
          await axios.post(`http://localhost:8000/user/clearcart`, {}, config);
          navigate("/");
        },
        () => null,
        { maximumAge: 60000, timeout: 5000, enableHighAccuracy: true }
      );
    } catch (error) {
      console.log(error?.response?.data);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      cart.forEach(async (item) => {
        const res = await axios.get(
          `http://localhost:8000/product/get/${item.productId}`
        );
        setProducts((prev) => [...prev, res.data.data]);
      });
    };
    fetchProducts();
  }, [cart]);

  const handleClick = (e) => {
    setOpen(parseInt(e.target.id));
  };

  return (
    <div>
      <Navbar />
      <div className="flex mx-36 mt-[1rem] gap-12 items-start">
        <div className="w-full flex flex-col gap-4">
          <div
            className={
              open === 1
                ? `p-4 border-0 shadow-card cursor-pointer font-semibold text-xl bg-primary text-white`
                : `p-4 border shadow-card cursor-pointer font-semibold text-xl`
            }
            id={1}
            onClick={handleClick}
          >
            1. Items Overview
          </div>
          {open === 1 && (
            <ItemsOverview
              handleClick={handleClick}
              products={products}
              cart={cart}
            />
          )}
          <div
            className={
              open === 2
                ? `p-4 border-0 shadow-card cursor-pointer font-semibold text-xl bg-primary text-white`
                : `p-4 border shadow-card cursor-pointer font-semibold text-xl`
            }
            id={2}
            onClick={handleClick}
          >
            2. Address Details
          </div>
          {open === 2 && (
            <AddressDetails
              handleClick={handleClick}
              setAddress={setAddress}
              setCity={setCity}
              setPin={setPin}
              address={address}
              city={city}
              pin={pin}
            />
          )}
          <div
            className={
              open === 3
                ? `p-4 border-0 shadow-card cursor-pointer font-semibold text-xl bg-primary text-white`
                : `p-4 border shadow-card cursor-pointer font-semibold text-xl`
            }
            id={3}
            onClick={handleClick}
          >
            3. Payment Options
          </div>
          {open === 3 && <Payment placeOrder={placeOrder} />}
        </div>
        <div className="right rounded-md bg-primary text-white w-[25vw] py-8 px-12 sticky top-0">
          <CartSummary cart={cart} products={products} />
        </div>
      </div>
    </div>
  );
};

export default Cart;
