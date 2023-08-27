import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import RatingCard from "../../components/RatingCard";
import { Context } from "../../Context/ContextProvider";
import Review from "../../components/Review/Review";
import { toast } from "react-hot-toast";
function SingleProduct() {
  const { id } = useParams();
  const { ratings, config, setRatings, ratingActive, setUser } =
    useContext(Context);
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const getAllProduct = async () => {
      try {
        const { data } = await axios.get(
          `https://cropvista.onrender.com/product/get/${id}`
        );
        setProduct(data.data);
        setRatings(data?.data?.userRatings);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllProduct();
    // eslint-disable-next-line
  }, [ratingActive]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const quantity = document.getElementById("quantity").value;
    try {
      const { data } = await axios.post(
        `https://cropvista.onrender.com/user/addtocart`,
        {
          productId: id,
          quantity: quantity,
        },
        config
      );
      // console.log(data);
      toast.success("Added to cart");
      setQuantity(0);
      setUser(data.user);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <Navbar />
      <img src="/Images/shopsingle.png" alt="photo" />
      <div className="flex flex-col gap-12 font-ourfont my-24 mx-16">
        <div className="flex flex-col md:flex-row justify-center gap-[10rem] items-center">
          <div className="">
            <img
              src={product?.image ? product?.image : "./Images/Grains.png"} 
              className="rounded-xl md:w-96"
              alt="p.name"
              width="100%"
              height={"150px"}
            />
          </div>
          <div className="flex h-full space-y-2 flex-col justify-around gap-4">
            <div className="flex flex-col gap-[5px]">
              <h1 className="text-dark-gray capitalize font-bold text-xl">
                {product?.name}
              </h1>
              ⭐⭐⭐⭐⭐
              <h1>{product?.price} Rs/Kg</h1>
            </div>

            <div className="md:w-96">
              <p className="text-[#525C60] break-words">
                Simply dummy text of the printing and typesetting industry.
                Lorem had ceased to been the industry's standard dummy text ever
                since the 1500s, when an unknown printer took a galley.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex items-center space-x-3 w-full justify-around"
            >
              <h1>Quantity :</h1>
              <input
                type="number"
                id="quantity"
                placeholder="0"
                className="border w-[3vw] p-1.5 rounded-xl text-black"
              />
              <button
                type="submit"
                className="bg-primary cursor-pointer rounded-xl p-2 border text-white"
              >
                Add To Cart
              </button>
            </form>
          </div>
        </div>

        <div className="flex my-[20px] justify-center">
          <div className="md:w-3/4 flex flex-col items-center">
            <h1 className="bg-primary flex justify-center w-fit rounded-xl p-2 border text-white">
              Product Description
            </h1>
            <p className="mt-[20px]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
              aliquid numquam quisquam voluptates cum nulla excepturi laborum
              voluptatem consequuntur, sunt laudantium ad aut natus quo
              perferendis beatae quidem adipisci. Magni perferendis eligendi
              obcaecati atque magnam iste eius, dolore necessitatibus tempore
              animi nostrum officia vero ullam at! Laudantium facilis atque
              quis, facere culpa aperiam velit vitae sunt dicta aliquid alias
              repellat.
            </p>
          </div>
        </div>
        <Review id={id} />
      </div>
    </div>
  );
}

export default SingleProduct;
