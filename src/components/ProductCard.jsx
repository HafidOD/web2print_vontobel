"use client";

// import Image from "next/image";
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import { toast } from "react-hot-toast";
import useCart from "@/app/hooks/use-cart";
import { useState } from "react";

// import ButtonProduct from "./ButtonProduct";

export default function ProductCard({ product }) {
  const cart = useCart();
  const data = product;
  // console.log(product);
  const [counter, setCounter] = useState(0);
  const plusCounter = () => {
    setCounter(counter + 1);
  };
  const minusCounter = () => {
    // Counter state is decremented
    if (counter > 0) {
      setCounter(counter - 1);
    } else {
      setCounter(0);
    }
  };
  const onAddToCart = (e) => {
    e.stopPropagation();
    if (counter > 0) {
      data.quantity = counter;
      cart.addItem(data);
    } else {
      toast.error("Aumenta el numero de productos");
    }
  };

  return (
    <div className="w-full p-2 rounded-lg shadow-xl flex items-center justify-between my-3 bg-white">
      <div className="flex items-center">
        <img
          className="object-contain w-20 h-20 md:w-40 md:h-40"
          src={product.imageProduct}
          alt={product.nameProduct}
        />
        {/* <Image
        className="object-cover w-full"
        src="https://cdn.pixabay.com/photo/2022/08/18/09/20/houses-7394390__340.jpg"
        alt="Logo Grupo Regio"
        width={40}
        height={40}
      /> */}
        <div className="pl-4 flex flex-col justify-evenly">
          <h4 className="text-sm md:text-lg font-semibold leading-tight text-blue-600 mb-2">
            {product.nameProduct}
          </h4>
          <div>
            <p className="text-xs md:text-sm text-gray-500 leading-normal">
              {product.unitsPackage} piezas por paquete
            </p>
            <p className="text-xs md:text-sm text-gray-500 leading-normal">
              ${product.priceLocal}.00 MXN
            </p>
          </div>
        </div>
      </div>
      {/* <ButtonProduct></ButtonProduct> */}
      <div className="pl-3 flex flex-col justify-center">
        <div className="flex">
          <button className="text-sm text-blue-700">
            <MinusCircleIcon
              className="h-6 w-6 "
              aria-hidden="true"
              onClick={minusCounter}
            />
          </button>
          <div>
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
        <div className="pt-2 md:pt-4 w-full flex justify-center">
          <button
            className="px-4 py-2 text-xs md:text-sm text-blue-100 bg-blue-700 rounded shadow"
            onClick={onAddToCart}
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
}
