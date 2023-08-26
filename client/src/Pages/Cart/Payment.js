import React, { useState } from "react";

const Payment = ({ placeOrder }) => {
  const [payment, setPayment] = useState("card");

  const handlePayment = (e) => {
    setPayment(e.target.id);
  };

  return (
    <div className="shadow-card p-4 rounded-md flex flex-col gap-4 items-start">
      <div
        className={
          (payment === "card" ? "bg-light-gray " : "") +
          "border-b border-t w-full p-2 text-lg font-semibold cursor-pointer"
        }
        id="card"
        onClick={handlePayment}
      >
        Credit / Debit / ATM Card <br />
        <span className="font-light text-sm">
          Add and secure your card as per RBI guidelines
        </span>
      </div>
      {payment === "card" && (
        <div className="flex flex-col gap-4 px-4">
          <div className="info">
            <div className="text-lg pb-1">Enter card number *</div>
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              className="p-2 rounded-md border w-[17vw]"
              //   onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="info">
            <div className="text-lg pb-1">Enter cardholder's name *</div>
            <input
              type="text"
              placeholder="John Doe"
              className="p-2 rounded-md border w-[17vw]"
              //   onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="info flex">
            <div className="pr-4">
              <div className="text-lg pb-1">Valid thru *</div>
              <input
                type="text"
                placeholder="MM/YY"
                className="p-2 rounded-md border w-[9vw]"
                // onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div>
              <div className="text-lg pb-1">CVV *</div>
              <input
                type="password"
                placeholder="***"
                className="p-2 rounded-md border w-[7vw]"
                // onChange={(e) => setPin(e.target.value)}
              />
            </div>
          </div>
          <button
            className="w-[11vw] self-start px-12 py-2 bg-primary text-white rounded-md text-lg"
            onClick={placeOrder}
          >
            Pay ₹800/-
          </button>
        </div>
      )}
      <div
        className={
          (payment === "cash" ? "bg-light-gray " : "") +
          "border-b border-t w-full p-2 text-lg font-semibold cursor-pointer"
        }
        id="cash"
        onClick={handlePayment}
      >
        Cash on delivery
      </div>
      {payment === "cash" && (
        <div className="flex flex-col gap-4 px-4">
          <button
            className="w-[11vw] self-start px-12 py-2 bg-primary text-white rounded-md text-lg"
            onClick={placeOrder}
          >
            Confirm Order
          </button>
        </div>
      )}
    </div>
  );
};

export default Payment;
