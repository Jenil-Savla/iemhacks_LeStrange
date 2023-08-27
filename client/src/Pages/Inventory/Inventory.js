import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { Context } from "../../Context/ContextProvider";
import ProductCards from "../Products/ProductCards";

function Inventory() {
  const [product, setProduct] = useState([]);
  const { ratings, setRatings, config, user } = useContext(Context);
  useEffect(() => {
    const getAllProduct = async () => {
      try {
        const { data } = await axios.get(
          `https://cropvista.onrender.com/product/getOne`,
          config
        );
        setProduct(data.data);
        setRatings(data.data.userRatings);
        console.log(data);
      } catch (error) {
        console.log(error?.response?.data);
      }
    };
    getAllProduct();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="font-ourfont">
      <Navbar />
      <img src="/Images/photo.png" alt="photo" />
      <h1 className="text-center mt-24  my-[10px] text-lg lg:text-2xl font-bold text-bold  text-primary ">
        Inventory
      </h1>
      <div className="grid grid-cols-1 mx-24 lg:mx-36 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {product?.map((p) => (
          <ProductCards key={p._id} p={p} />
        ))}
      </div>
    </div>
  );
}

export default Inventory;
