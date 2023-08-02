"use client";

import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import useCart from "@/app/hooks/use-cart";

export default function ButtonCheckout({ quantity, productId }) {
  const cart = useCart();
  const [counter, setCounter] = useState(quantity);
  // const onUpdate = useCart((state) => state.onUpdate);
  const plusCounter = () => {
    setCounter(counter + 1);
    // console.log(productId, counter);
    cart.updateItem(productId, counter + 1);
  };
  const minusCounter = () => {
    // Counter state is decremented
    if (counter > 1) {
      setCounter(counter - 1);
      cart.updateItem(productId, counter - 1);
      // onUpdate(productId, counter);
    } else {
      setCounter(1);
    }
  };
  // useEffect(
  //   (productId) => {
  //     // console.log(productId, counter);
  //   },
  //   [counter]
  // );

  // const onUpdate = () => {
  //   // console.log(productId, counter);
  //   // cart.updateItem(product.id, counter);
  // };

  return (
    <div className="pl-3 flex flex-col justify-center">
      <div className=" flex">
        <button className="text-sm text-blue-700">
          <MinusCircleIcon
            className="h-6 w-6 "
            aria-hidden="true"
            onClick={minusCounter}
          />
        </button>
        <div className="">
          <input
            type="number"
            className="w-12 text-xs px-4 py-2 md:py-4 md:text-base outline-none"
            value={counter}
            readOnly
          />
        </div>
        <button className="text-sm text-blue-700">
          <PlusCircleIcon
            className="h-6 w-6"
            aria-hidden="true"
            onClick={plusCounter}
          />
        </button>
      </div>
    </div>
  );
}
