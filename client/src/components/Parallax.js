// React Imports
import React from "react";
import { Fade } from "react-awesome-reveal";
import { useState, useEffect } from "react";

// Image Imports
// import land from "../../assets/images/banner/land.png";
// import waste from "../../assets/images/banner/waste.png";

function Parallax() {
  const [parallax, setParallax] = useState(0);

  useEffect(() => {
    parrallaxFunc();
  }, [parallax]);

  function parrallaxFunc() {
    console.log("Inside Scroll");
    let text = document.getElementById("text");
    console.log(text);
    let bird1 = document.getElementById("bird1");
    let bird2 = document.getElementById("bird2");
    let rocks = document.getElementById("rocks");
    let forest = document.getElementById("forest");

    window.addEventListener("scroll", function () {
      console.log("Inside Event Scroll");
      let value = window.scrollY;

      text.style.top = 50 + value * -0.02 + "%";
      bird2.style.top = value * -1.5 + "px";
      bird2.style.left = value * 2 + "px";
      bird1.style.top = value * -1.5 + "px";
      bird1.style.left = value * -5 + "px";
      rocks.style.top = value * 0.08 + "px";
      forest.style.top = value * 0.25 + "px";
    });

    console.log("Done Scroll");
  }
  return (
    <div className="overflow-hidden my-6">
      <Fade bottom>
        <section className="parallax">
          <section>
            <h2 id="text">
              <span>Welcome to</span>
              <br />
              CropVista
            </h2>
            <img
              src="https://user-images.githubusercontent.com/65358991/170092504-132fa547-5ced-40e5-ab64-ded61518fac2.png"
              id="bird1"
              alt="bird1"
            />
            <img
              src="https://user-images.githubusercontent.com/65358991/170092542-9747edcc-fb51-4e21-aaf5-a61119393618.png"
              id="bird2"
              alt="bird2"
            />
            <img src="/Images/land.png" id="forest" alt="forest" />

            <img src="/Images/waste.png" id="rocks" alt="rocks" />
          </section>
        </section>
      </Fade>
    </div>
  );
}

export default Parallax;
