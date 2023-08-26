import React from "react";
import Navbar from "../../components/Navbar";
import Cards from "./Cards";

function Allproduct() {
  return (
    <>
      <Navbar />
      <img src="/Images/photo.png" alt="photo" />
      <div className="m-3">
        <h1 className="text-center mt-24 font-bold my-[10px]">
          All Products Available
        </h1>
        <div className="grid grid-cols-1 mx-16 lg:mx-36 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <Cards image={"/Images/Pulses.jpg"} name={"Pulses"} />
          <Cards image={"/Images/Grains.jpg"} name={"Grains"} />
          <Cards image={"/Images/vegetable.jpg"} name={"Vegetables"} />
          <Cards image={"/Images/Pulses.jpg"} name={"Pulses"} />
          <Cards image={"/Images/Grains.jpg"} name={"Grains"} />
        </div>
      </div>
    </>
  );
}

export default Allproduct;
