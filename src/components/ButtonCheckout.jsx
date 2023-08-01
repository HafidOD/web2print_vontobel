"use client";

import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import useCart from "@/app/hooks/use-cart";

export default function ButtonCheckout({ quantity, productId }) {
  // const cart = useCart();
  // const updateItem = useCart((state) => state.updateItem);
  // console.log(cart);
  const [counter, setCounter] = useState(quantity);
  const onUpdate = () => {
    // cart.updateItem(productId, counter);
  };
  const plusCounter = () => {
    setCounter(counter + 1);
    // onUpdate(productId, counter);
  };
  const minusCounter = () => {
    // Counter state is decremented
    if (counter > 1) {
      setCounter(counter - 1);
      // onUpdate(productId, counter);
    } else {
      setCounter(1);
    }
  };

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
