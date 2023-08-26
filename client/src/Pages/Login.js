import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Context } from "../Context/ContextProvider";

const Login = ({}) => {
  const navigate = useNavigate();
  const { setUser, role, setRole } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [otp, setOtp] = useState(false);

  const url = "http://localhost:8000/";

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (role === "user") {
        res = await axios.post(url + role + `/login`, {
          email,
          password,
        });
      } else if (role === "farmer") {
        res = await axios.post(url + role + `/login`, {
          id: parseInt(email),
          otp: parseInt(password),
        });
      }
      console.log(res);
      let token = res.data.authToken;
      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem("role", role);
      localStorage.setItem("userType", JSON.stringify(res?.data?.user));
      console.log(res?.data?.user);
      setUser(res?.data?.user);
      navigate("/");
    } catch (err) {
      setEmail("");
      setPassword("");
      alert("Error occured while logging in");
      console.log(err);
    }
  };

  const sendOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(url + role + `/sendOtp`, {
        id: parseInt(email),
      });
      console.log(res);
      setOtp(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="h-screen formClass overflow-y-hidden bg-[#eaefe8]">
      <div className="flex items-center justify-evenly h-screen">
        <div className="lg:flex hidden overflow-y-hidden mt-[3rem]">
          <img
            src="/Images/crop selection.svg"
            alt="alternate"
            className="h-[64vh] w-[40vw]"
          />
        </div>
        <div className="z-10">
          {/* <div className="flex flex-col w-full justify-center items-center"> */}
          <div className="lg:w-[26vw] bg-white h-[70vh] my-auto rounded-3xl shadow-primary-sd text-left overflow-y-hidden">
            <div className="p-14 flex flex-col justify-center items-start">
              <p className="font-ourfont font-bold text-3xl overflow-y-hidden text-primary-black">
                Log In
              </p>
              <p className="mt-3 font-ourfont font-normal text-sm text-subtext">
                New to our site?
              </p>
              <span className="font-ourfont font-normal text-sm text-subtext">
                You can {/* {isReg ?  */}
                <button className="font-ourfont font-semibold text-sm text-ourmedpurp">
                  Register Here!
                </button>
              </span>
              <br />
              <form className="w-full max-w-sm mt-5">
                <p className="font-medium">
                  {"Email"}
                </p>
                <div className="flex items-center border-b-2 border-ourmedpurp ">
                  <input
                    className="appearance-none bg-transparent border-none w-[77%] text-subtext mr-3 py-1 leading-tight focus:outline-none"
                    type="text"
                    placeholder={
                      // role === "farmer"
                        // ? "Enter your ID number"
                        "Enter your email"
                    }
                    name="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  {/* {role === "farmer" && (
                    <button onClick={sendOtp}>Send OTP</button>
                  )} */}
                </div>
                {/* <div className="text-[12px] text-red-600">{used}</div> */}
                <p className="font-medium mt-5">
                  {"Password"}
                </p>
                <div className="flex items-center border-b-2 border-ourmedpurp ">
                  <input
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    // disabled={role === "farmer" ? !otp : false}
                    value={password}
                    className="appearance-none bg-transparent border-none w-full text-subtext mr-3 py-1 leading-tight focus:outline-none"
                    type="password"
                    placeholder={
                      // role === "farmer"
                      //   ? "Enter 4 digit OTP"
                        "Enter your password"
                    }
                    name="password"
                  />
                </div>
                <div>
                  <label
                    htmlFor="type"
                    className="font-medium mt-5 block mb-1 text-sm text-neutralSecondary"
                  >
                    Role:
                  </label>
                  <select
                    type="text"
                    name="role"
                    id="role"
                    value={role}
                    onChange={(e) => {
                      setRole(e.target.value);
                    }}
                    className="border-b-2 text-gray-900 text-sm rounded-sm focus:outline-none focus:border-b-buttons block w-full p-2 bg-[#F0F0F0] placeholder-[#F0F0F0] "
                    required
                  >
                    <option defaultValue>Choose a type</option>
                    <option value="user">User</option>
                    <option value="farmer">Farmer</option>
                  </select>
                </div>
                <div className="mt-8">
                  <button
                    type="submit"
                    onClick={(e) => {
                      loginUser(e);
                    }}
                    className="flex-shrink-0 bg-gradient-to-r from-btn-left to-btn-right text-sm text-white py-3 px-1 rounded-3xl w-1/2 font-medium btn-primary"
                  >
                    Sign In
                  </button>
                </div>
              </form>
            </div>
          </div>
          {/* </div> */}
        </div>
      </div>
      {/* <img src={authbottom} alt="bottom" className="absolute bottom-0" />
      <img
        src={clouds}
        alt="bottom"
        className="absolute z-0 w-[850px] h-[340px] right-[30px] top-[20px] "
      />
      <img
        src={injection}
        alt="bottom"
        className="absolute z-10 h-[315px] right-[485px] top-2 "
      />
      <img
        src={plus}
        alt="bottom"
        className="absolute z-10 h-[200px] right-[180px] top-9"
      /> */}
    </div>
  );
};

export default Login;
