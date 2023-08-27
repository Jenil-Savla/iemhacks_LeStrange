import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../Context/ContextProvider";
import ProductCards from "./ProductCards";
import Navbar from "../../components/Navbar";
function Products() {
  const { name } = useParams();
  //   const { config } = useContext(Context);
  const [product, setProduct] = useState([]);
  const [price, setPrice] = useState("");
  const [subType, setSubType] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    const getAllProduct = async () => {
      try {
        const { data } = await axios.get(
          //`https://cropvista.onrender.com/product/get/cropType/name?cropType=${name}`
          `https://cropvista.onrender.com/product/getAll`
          //     config
        );
        setProduct(data.data);

        console.log(data.data);
      } catch (error) {
        console.log(error?.response?.data);
      }
    };
    getAllProduct();
    // eslint-disable-next-line
  }, [name]);

  useEffect(() => {
    const getAllProduct = async () => {
      try {
        const { data } = await axios.get(
          `https://cropvista.onrender.com/product/filter?price=${price}&cropType&cropSubType=${subType}&quantity=${quantity}`
          //     config
        );
        setProduct(data.data);
        console.log("subType ", subType);
        console.log(data.data);
      } catch (error) {
        console.log(error?.response?.data);
      }
    };
    getAllProduct();
    // eslint-disable-next-line
  }, [price, quantity, subType]);

  useEffect(() => {
    const getAllProduct = async () => {
      try {
        const { data } = await axios.get(
          //`https://cropvista.onrender.com/product/get/cropType/name?cropType=${name}`
          `https://cropvista.onrender.com/product/getAll`
          //     config
        );
        setProduct(data.data);

        console.log(data.data);
      } catch (error) {
        console.log(error?.response?.data);
      }
    };
    getAllProduct();
    // eslint-disable-next-line
  }, [name]);
  return (
    <div>
      <Navbar />
      <img className="my-2" src="/Images/Shop.png" alt="photo" />
      <div className="grid gap-5 grid-cols-1 my-24 mx-16 lg:mx-36 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {product.length !== 0 ? (
          <div className="grid lg:col-span-2 xl:col-span-3 grid-cols-1 gap-5 lg:grid-cols-3">
            {product?.map((p) => (
              <ProductCards key={p._id} p={p} />
            ))}
          </div>
        ) : (
          <div className="grid lg:col-span-2  xl:col-span-3 grid-cols-1 gap-5 w-full items-center justify-center ">
            <h1 className="flex justify-center">No product found</h1>
          </div>
        )}
        <div>
          <div className=" bg-primary-gray p-3">
            <h1 className="text-center text-primary font-bold text-xl">
              Filter
            </h1>
            <div>
              <label
                htmlFor="type"
                className="font-medium mt-5 block mb-1 text-sm text-neutralSecondary"
              >
                Select Crop Subtype
              </label>
              <select
                type="text"
                name="role"
                id="role"
                value={subType}
                onChange={(e) => {
                  setSubType(e.target.value);
                }}
                className="border-b-2 text-gray-900 text-sm rounded-sm focus:outline-none focus:border-b-buttons block w-full p-2 bg-[#F0F0F0] placeholder-[#F0F0F0] "
                required
              >
                <option defaultValue>Choose a type</option>
                <option value="Banana">Banana</option>
                <option value="Onion">Onion</option>
                <option value="Potato">Potato</option>
                <option value="Wheat">Wheat</option>
                <option value="Garlic">Garlic</option>
                <option value="Tomato">Tomato</option>
              </select>
            </div>

            <div>
              <input
                className="p-2 w-full my-2"
                placeholder="Enter price you want"
                type="text"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </div>

            <div>
              <input
                className="p-2 w-full mb-2"
                placeholder="Enter quantity you want"
                type="text"
                value={quantity}
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
