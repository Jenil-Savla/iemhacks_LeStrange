import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const [ratings, setRatings] = useState([]);
  const [ratingActive, setRatingActive] = useState(false);
  const [role, setRole] = useState("");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    },
  };
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userType"));
    setUser(userInfo);
    setRole(localStorage.getItem("role"));
  }, []);

  return (
    <Context.Provider
      value={{
        user,
        setUser,
        config,
        ratings,
        setRatings,
        role,
        setRole,
        ratingActive,
        setRatingActive,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const ContextState = () => {
  return useContext(ContextProvider);
};

export default ContextProvider;
