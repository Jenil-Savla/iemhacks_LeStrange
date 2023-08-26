import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../Context/ContextProvider";
import { SpinnerCircular } from "spinners-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import toast from "react-hot-toast"
function AddProduct() {
  const [selectedImg, setSelectedImg] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [cropType, setCropType] = useState("");
  const [cropSubType, setCropSubType] = useState("");
  const [location, setLocation] = useState({ latitude: "", longitude: "" });
  const [previewSource, setPreviewSource] = useState("");
  const [image, setImage] = useState();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fileInputState, setFileInputState] = useState("");
  const { config } = useContext(Context);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    setSelectedImg(file);
    setFileInputState(e.target.value);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleImage = (e) => {
    e.preventDefault();
    if (!selectedImg) return;
    const reader = new FileReader();
    reader.readAsDataURL(selectedImg);
    reader.onloadend = () => {
      uploadImage(reader.result);
    };
    reader.onerror = () => {
      console.error("AHHHHHHHH!!");
    };
  };

  const uploadImage = async (base64EncodedImage) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        "http://localhost:8000/product/upload",
        { data: base64EncodedImage },
        config
      );
      setFileInputState("");
      setPreviewSource("");
      setImage(data.url);
      setLoading(false);
      console.log(data.url);
      // const data1 = await axios.post("http://127.0.0.1:5000/crop", {"crop_image":data.url}, config);
      // console.log(data1.data);
      // console.log(data.url);
      toast.success("Image uploaded");
    } catch (err) {
      console.error(err);
      toast.error("Error uploading immage");
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocation({
      latitude: latitude,
      longitude: longitude,
    });
  
    try {
      const { data } = await axios.post(
        "http://localhost:8000/product/create",
        {
          name,
          quantity,
          price,
          location,
          image,
        },
        config
      );
      console.log("data ", data);
      // navigate("/allproduct");
    } catch (error) {
      console.log(error?.response?.data.message);
    }
  };

  return (
    <>
      <Navbar />
      <h1 className="text-center text-primary font-ourfont font-bold text-xl my-2">
        Create
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex font-ourfont justify-center"
      >
        {/* <img src="/Images/Shop.png" alt="shop" /> */}
        <div className="lg:w-[35%] space-y-1 bg-[#edebeb] p-2">
          <div className="flex flex-col justify-center items-center">
            {!loading ? (
              <img
                className="w-full h-28 rounded-lg md:h-52 lg:h-64 "
                src={
                  previewSource
                    ? previewSource
                    : image
                    ? image
                    : "/images/Grains.jpg"
                }
                alt="write"
              />
            ) : (
              <SpinnerCircular
                size="90"
                className=" w-full flex items-center xl:h-80  md:h-64 h-28 lg:h-72 flex-col  mx-auto"
                thickness="100"
                speed="600"
                color="white"
                secondaryColor="black"
              />
            )}
            {!selectedImg ? (
              <label
                className="text-primary cursor-pointer font-bold lg:text-2xl mt-2"
                htmlFor="forFile"
              >
                Select Image
              </label>
            ) : (
              <div className="flex justify-center">
                <h1
                  className="bg-primary active:bg-blue-400 cursor-pointer mt-2 text-white p-1 rounded"
                  onClick={handleImage}
                >
                  Upload image
                </h1>
              </div>
            )}
            <input
              type="file"
              id="forFile"
              accept="image/png , image/jpg, image/jpeg ,video/mp4"
              value={fileInputState}
              onChange={handleFileInputChange}
              style={{ display: "none" }}
              name="file"
            />
          </div>

          <div className="flex flex-col items-center">
            <h1 className="text-center text-lg text-primary">
              Enter Product name
            </h1>
            <input
              placeholder="Enter Product name"
              className="p-3 w-full  focus:outline-none rounded-lg"
              type="text"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col items-center">
            <h1 className="text-center text-lg text-primary">
              Enter Product quantity
            </h1>
            <input
              placeholder="Enter Product quantity"
              className="p-3 w-full focus:outline-none rounded-lg"
              type="number"
              value={quantity}
              required
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="flex flex-col items-center">
            <h1 className="text-center text-lg text-primary">
              Enter Product price/Kg
            </h1>
            <input
              placeholder="Enter Product price/Kg"
              className="p-3 w-full focus:outline-none rounded-lg"
              type="number"
              value={price}
              required
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="flex justify-center">
            <button
              className="bg-primary mt-2 text-white p-2 rounded-lg"
              type="submit"
            >
              Add Product
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default AddProduct;
