import React from "react";
import ItemCard from "../../components/ItemCard";

const ItemsOverview = ({ handleClick, products, cart }) => {
  return (
    // <div className="">
    <div className="shadow-card p-4 rounded-md flex flex-col gap-4">
      {products.map((p, idx) => {
        return <ItemCard key={p._id} p={p} idx={idx} cart={cart} />;
      })}
      {/* <ItemCard />
      <ItemCard />
      <ItemCard /> */}
      <div className="border-[0.5px] border-slate-200 rounded-md flex w-full p-4">
        <div className="item flex justify-between w-full">
          <div className="text flex items-center">
            <img src="/Images/delivery.png" alt="" className="h-6 pr-2" />
            <div className="name text-lg font-medium">
              Standard Shipping (24hrs)
            </div>
          </div>
          <div className="font-semibold text-lg">₹50</div>
        </div>
      </div>
      <button
        className="w-[10vw] self-end px-14 py-2 bg-primary text-white rounded-md text-lg"
        onClick={() => {
          handleClick({ target: { id: 2 } });
        }}
      >
        Continue
      </button>
    </div>
    // </div>
  );
};

export default ItemsOverview;
