import React from "react";

const CartSummary = ({ cart, products }) => {
  const [total, setTotal] = React.useState(0);

  React.useEffect(() => {
    let sum = 50;
    console.log(cart);
    console.log(products);
    products.forEach((p, idx) => {
      sum += cart[idx].quantity * p.price;
    });
    setTotal(sum);
  }, [cart, products]);

  return (
    <div>
      <div className="text-3xl font-bold">Order Summary</div>
      <div className="border-y border-white my-4">
        {products.map((p, idx) => {
          return (
            <div className="flex justify-between py-2" key={idx}>
              <div className="text-gray-300">
                {p.name} ({cart[idx].quantity}kg)
              </div>
              <div className="text-gray-300">
                ₹ {cart[idx].quantity * p.price}
              </div>
            </div>
          );
        })}
        {/* <div className="flex justify-between py-2">
          <div className="text-gray-300">Tomato</div>
          <div className="text-gray-300">₹ 50</div>
        </div>
        <div className="flex justify-between py-2">
          <div className="text-gray-300">Tomato</div>
          <div className="text-gray-300">₹ 50</div>
        </div>
        <div className="flex justify-between py-2">
          <div className="text-gray-300">Tomato</div>
          <div className="text-gray-300">₹ 50</div>
      </div>*/}
        <div className="flex justify-between py-2">
          <div className="text-gray-300">Shipping</div>
          <div className="text-gray-300">₹ 50</div>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="text-lg font-semibold">Total</div>
        <div className="text-lg font-semibold">₹ {total}</div>
      </div>
    </div>
  );
};

export default CartSummary;
