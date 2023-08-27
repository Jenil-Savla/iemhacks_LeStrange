// React Imports
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Context } from "../Context/ContextProvider";

function Navbar() {
  const { setUser, role } = useContext(Context);
  return (
    <nav className="bg-white font-ourfont border-gray-200 sticky h-[12vh] border-b-2 border">
      <div className="max-w-screen-xl h-full flex flex-wrap items-center justify-between mx-auto p-4">
        <img src="/Images/logo.jpeg" className="h-12 mr-3" alt="Flowbite Logo" />
        <div className="hidden w-full md:block md:w-auto" id="navbar-dropdown">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
            <li>
              <Link
                to="/"
                className="block py-2 pl-3 pr-4 hover:underline text-white bg-secondary rounded md:bg-transparent md:text-secondary md:p-0 "
              >
                Home
              </Link>
            </li>
            {role === "user" && (
              <li>
                <Link
                  to="/shop"
                  className="block py-2 pl-3 pr-4 hover:underline text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-secondary md:p-0"
                >
                  Shop
                </Link>
              </li>
            )}
            <li>
              <Link className="block py-2 pl-3 pr-4 hover:underline text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-secondary md:p-0">
                Profile
              </Link>
            </li>
            <li>
              <Link
                className="block py-2 pl-3 pr-4 hover:underline text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-secondary md:p-0"
                to="/status"
              >
                My Orders
              </Link>
            </li>
            {role !== "user" && (
              <li>
                <Link
                  to="/addProduct"
                  className="block py-2 pl-3 pr-4 hover:underline text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-secondary md:p-0"
                >
                  Add Products
                </Link>
              </li>
            )}
            {role !== "user" && (
              <li>
                <Link
                  to="/schemes"
                  className="block py-2 pl-3 pr-4 hover:underline text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-secondary md:p-0"
                >
                  Scheme
                </Link>
              </li>
            )}
            {role !== "user" && (
              <li>
                <Link
                  to="/tutorials"
                  className="block py-2 pl-3 pr-4 hover:underline text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-secondary md:p-0"
                >
                  Tutorials
                </Link>
              </li>
            )}
            {role !== "user" && (
              <li>
                <Link
                  to="/inventory"
                  className="block py-2 pl-3 pr-4 hover:underline text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-secondary md:p-0"
                >
                  Community
                </Link>
              </li>
            )}
            <li>
              <div
                onClick={() => {
                  setUser(null);
                  localStorage.removeItem("token");
                  localStorage.removeItem("userType");
                  localStorage.removeItem("role");
                }}
                className="block cursor-pointer py-2 pl-3 pr-4 hover:underline text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-secondary md:p-0"
              >
                Sign Out
              </div>
            </li>
          </ul>
        </div>
        <Link
          to="/cart"
          className="flex py-2 pl-3 pr-4 hover:underline text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-secondary md:p-0"
        >
          <button className="">
            <AiOutlineShoppingCart size="25" />
          </button>
          Cart
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
