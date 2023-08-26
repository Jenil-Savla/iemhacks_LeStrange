import React from "react";
import Parallax from "../components/Parallax";
import Navbar from "../components/Navbar";
import { Context } from "../Context/ContextProvider";

function Home() {
  const { user } = React.useContext(Context);

  React.useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <Parallax />
      <img src="/Images/About.png" alt="" />
      <img className="my-12" src="/Images/offers.png" alt="" />
    </div>
  );
}

export default Home;
