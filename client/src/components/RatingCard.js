import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../Context/ContextProvider";
import toast from "react-hot-toast";
function PrintStar(props) {
  return <img className="w-5 h-6" src={props.imageUrl} alt={props.altText} />;
}
function RatingCard({ id }) {
  const [rating, setRating] = useState("");
  const [visible, setVisible] = useState(false);
  const [stars, setStars] = useState(0);
  const { config, user, setRatingActive } = useContext(Context);
  const [text, setText] = useState("");

  useEffect(() => {
    const getRating = async () => {
      try {
        const { data } = await axios.get(
          `https://cropvista.onrender.com/rating/get/${id}`
          //     config
        );
        setRating(data.data);
        console.log(data);
      } catch (error) {
        console.log(error?.response?.data);
      }
    };
    getRating();
    // eslint-disable-next-line
  }, []);

  const images = [];

  for (let i = 0; i < rating?.stars; i++) {
    images.push("⭐");
  }

  const giveRating = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `https://cropvista.onrender.com/rating/update/${id}`,
        { stars, text },
        config
      );
      setRatingActive(true);
      setVisible(!visible);
      toast.success("Rating updated successfully");
    } catch (error) {
      console.log(error);

      toast.error("Something went wrong");
    }
  };
  return (
    <>
      {visible && (
        <form onSubmit={giveRating} className="flex my-[20px] justify-center">
          <div className="md:w-3/4 flex flex-col items-center">
            <input
              className="w-full border text-primary p-2 rounded-xl focus:outline-none"
              type="text"
              name=""
              placeholder="Write your review"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <h1 className="mt-2 text-primary-gray">
              Select stars you would give to this product
            </h1>
            <div className="flex items-center my-2 space-x-4">
              <img
                onClick={() => setStars(1)}
                className="w-5 h-6 cursor-pointer "
                src="/Images/Star.png"
                alt="star"
              />
              <img
                onClick={() => setStars(2)}
                className="w-5 h-6 cursor-pointer "
                src="/Images/Star.png"
                alt="star"
              />
              <img
                onClick={() => setStars(3)}
                className="w-5 h-6 cursor-pointer "
                src="/Images/Star.png"
                alt="star"
              />
              <img
                onClick={() => setStars(4)}
                className="w-5 h-6 cursor-pointer "
                src="/Images/Star.png"
                alt="star"
              />
              <img
                onClick={() => setStars(5)}
                className="w-5 h-6 cursor-pointer "
                src="/Images/Star.png"
                alt="star"
              />
            </div>
            <div className="flex w-full justify-start">
              <button
                className="bg-primary my-2 rounded-lg text-white p-2"
                type="submit"
              >
                Give Rating
              </button>
            </div>
          </div>
        </form>
      )}
      <div className="flex items-center">
        <div className="my-2 space-y-1 p-2">
          <div>{rating?.userId?.name}</div>
          <h1 className="text-primary font-bold">{rating?.text}</h1>
          <div className="flex items-center">{images}</div>
        </div>
        {rating?.userId?._id === user?._id && (
          <div className="pl-3">
            <i
              onClick={() => setVisible(!visible)}
              className="fa-solid cursor-pointer fa-xl text-secondary fa-pen-to-square"
            ></i>
          </div>
        )}
      </div>
    </>
  );
}

export default RatingCard;
