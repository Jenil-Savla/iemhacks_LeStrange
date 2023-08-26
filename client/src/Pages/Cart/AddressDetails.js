import React, { useState } from "react";

const AddressDetails = ({
  handleClick,
  setAddress,
  setCity,
  setPin,
  address,
  city,
  pin,
}) => {
  return (
    <div className="shadow-card p-4 rounded-md flex flex-col gap-4 ">
      <div className="info flex">
        <div className="pr-4">
          <div className="text-lg pb-1">Name *</div>
          <input
            type="text"
            className="p-2 rounded-md border w-[12vw]"
            // onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div>
          <div className="text-lg pb-1">Mobile *</div>
          <input
            type="text"
            className="p-2 rounded-md border w-[12vw]"
            // onChange={(e) => setPin(e.target.value)}
          />
        </div>
      </div>
      <div className="info">
        <div className="text-lg pb-1">Address *</div>
        <textarea
          type="text"
          value={address}
          className="p-2 rounded-md border w-[25vw]"
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div className="info flex">
        <div className="pr-4">
          <div className="text-lg pb-1">City *</div>
          <input
            type="text"
            value={city}
            className="p-2 rounded-md border w-[12vw]"
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div>
          <div className="text-lg pb-1">PinCode *</div>
          <input
            type="text"
            value={pin}
            className="p-2 rounded-md border w-[12vw]"
            onChange={(e) => setPin(parseInt(e.target.value))}
          />
        </div>
      </div>
      <button
        className="w-[11vw] self-start px-14 py-2 bg-primary text-white rounded-md text-lg"
        onClick={() => {
          handleClick({ target: { id: 3 } });
        }}
      >
        Deliver Here
      </button>
    </div>
  );
};

export default AddressDetails;
