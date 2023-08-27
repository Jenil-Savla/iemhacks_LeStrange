import React, { useContext, useEffect, useState } from "react";
import "./Review.css";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import ReviewPopUp from "./ReviewPopUp";
import toast from "react-hot-toast";
import axios from "axios";
import { Context } from "../../Context/ContextProvider";
import { useNavigate } from "react-router-dom";

const Review = ({ id }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [star1selected, setStar1Selected] = useState(false);
  const [star2selected, setStar2Selected] = useState(false);
  const [star3selected, setStar3Selected] = useState(false);
  const [star4selected, setStar4Selected] = useState(false);
  const [star5selected, setStar5Selected] = useState(false);
  const [inputData, setInputData] = useState("");
  const [rate, setRate] = useState([]);

  useEffect(() => {
    const getRating = async () => {
      try {
        const { data } = await axios.get(
          `https://cropvista.onrender.com/rating/get/${id}`
          //     config
        );
        setRate(data.data);
        console.log("rate", data);
      } catch (error) {
        console.log(error?.response?.data);
      }
    };
    getRating();
    console.log("rate", rate);
    // eslint-disable-next-line
  }, []);

  const { ratings, config, setRatings, ratingActive, user, setRatingActive } =
    useContext(Context);
  const navigate = useNavigate();

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const fun1 = () => {
    setStar1Selected(true);
    setStar2Selected(false);
    setStar3Selected(false);
    setStar4Selected(false);
    setStar5Selected(false);
  };

  const fun2 = () => {
    setStar1Selected(true);
    setStar2Selected(true);
    setStar3Selected(false);
    setStar4Selected(false);
    setStar5Selected(false);
  };

  const fun3 = () => {
    setStar1Selected(true);
    setStar2Selected(true);
    setStar3Selected(true);
    setStar4Selected(false);
    setStar5Selected(false);
  };

  const fun4 = () => {
    setStar1Selected(true);
    setStar2Selected(true);
    setStar3Selected(true);
    setStar4Selected(true);
    setStar5Selected(false);
  };

  const fun5 = () => {
    setStar1Selected(true);
    setStar2Selected(true);
    setStar3Selected(true);
    setStar4Selected(true);
    setStar5Selected(true);
  };

  // const handleInput = (e) => {
  //   setInputData(e.target.value);
  // };

  const submitReview = async (e) => {
    e.preventDefault();
    const stars = star5selected
      ? 5
      : star4selected
      ? 4
      : star3selected
      ? 3
      : star2selected
      ? 2
      : star1selected
      ? 1
      : 0;
    try {
      const { data } = await axios.post(
        `https://cropvista.onrender.com/rating/create/${id}`,
        { stars, text: inputData },
        config
      );
      console.log("data ", data);
      setRatings([...ratings, data?._id]);
      toast.success("Rating given successfully");
      navigate(0);
    } catch (error) {
      console.log(error?.response?.status);
      if (error?.response?.status === 401) {
        return toast.error("Already Rated this product");
      }
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      {ratings?.length !== 0 ? (
        <div className="flex my-[20px] justify-center">
          <div className="md:w-3/4 flex flex-col items-center">
            <h1 className="text-center text-primary capitalize font-bold">
              Ratings
            </h1>
            <div className="md:w-[80%]">
              {rate?.map((rating, index) => (
                <div key={index} className="flex items-center justify-center">
                  <div className="my-2 space-y-1 p-2">
                    <div>{rating?.userId?.name}</div>
                    <h1 className="text-primary font-bold">{rating?.text}</h1>
                    <div className="flex items-center justify-center text-yellow">
                      {rating?.stars === 5 ? (
                        <>
                          <AiFillStar />
                          <AiFillStar />
                          <AiFillStar />
                          <AiFillStar />
                          <AiFillStar />
                        </>
                      ) : rating?.stars === 4 ? (
                        <>
                          <AiFillStar />
                          <AiFillStar />
                          <AiFillStar />
                          <AiFillStar />
                          <AiOutlineStar />
                        </>
                      ) : rating?.stars === 3 ? (
                        <>
                          <AiFillStar />
                          <AiFillStar />
                          <AiFillStar />
                          <AiOutlineStar />
                          <AiOutlineStar />
                        </>
                      ) : rating?.stars === 2 ? (
                        <>
                          <AiFillStar />
                          <AiFillStar />
                          <AiOutlineStar />
                          <AiOutlineStar />
                          <AiOutlineStar />
                        </>
                      ) : rating?.stars === 1 ? (
                        <>
                          <AiFillStar />
                          <AiOutlineStar />
                          <AiOutlineStar />
                          <AiOutlineStar />
                          <AiOutlineStar />
                        </>
                      ) : (
                        <>
                          <AiOutlineStar />
                          <AiOutlineStar />
                          <AiOutlineStar />
                          <AiOutlineStar />
                          <AiOutlineStar />
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="text-center text-primary capitalize font-bold">
            No Ratings given
          </h1>
        </div>
      )}
      <div className={"rate bg-primary m-auto"}>
        <div className="heading" onClick={togglePopup}>
          Give Rating{" "}
        </div>
      </div>
      {isOpen && (
        <ReviewPopUp
          content={
            <div className="review-popup">
              <div className="star">
                <div>Rate this Course: </div>
                <div className="stars text-yellow">
                  {star1selected ? (
                    // <img src={star} alt="" onClick={fun1} />
                    <AiFillStar onClick={fun1} />
                  ) : (
                    // <img src={blankStar} alt="" onClick={fun1} />
                    <AiOutlineStar onClick={fun1} />
                  )}
                  {star2selected ? (
                    // <img src={star} alt="" onClick={fun2} />
                    <AiFillStar onClick={fun2} />
                  ) : (
                    // <img src={blankStar} alt="" onClick={fun2} />
                    <AiOutlineStar onClick={fun2} />
                  )}
                  {star3selected ? (
                    // <img src={star} alt="" onClick={fun3} />
                    <AiFillStar onClick={fun3} />
                  ) : (
                    // <img src={blankStar} alt="" onClick={fun3} />
                    <AiOutlineStar onClick={fun3} />
                  )}
                  {star4selected ? (
                    // <img src={star} alt="" onClick={fun4} />
                    <AiFillStar onClick={fun4} />
                  ) : (
                    // <img src={blankStar} alt="" onClick={fun4} />
                    <AiOutlineStar onClick={fun4} />
                  )}
                  {star5selected ? (
                    // <img src={star} alt="" onClick={fun5} />
                    <AiFillStar onClick={fun5} />
                  ) : (
                    // <img src={blankStar} alt="" onClick={fun5} />
                    <AiOutlineStar onClick={fun5} />
                  )}
                </div>
              </div>
              <div className="text-lg font-semibold">Leave a review:</div>
              <textarea
                rows="5"
                cols="83"
                name="description"
                className="font-normal text-lg border"
                onChange={(e) => setInputData(e.target.value)}
              />
              <div className="submit bg-primary" onClick={submitReview}>
                Submit Review
              </div>
            </div>
          }
          handleClose={togglePopup}
        />
      )}
    </div>
  );
};

export default Review;
