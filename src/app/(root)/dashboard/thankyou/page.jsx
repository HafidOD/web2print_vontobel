"use client";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { redirect, useSearchParams } from "next/navigation";

import useCart from "@/app/hooks/use-cart";
import useAddress from "@/app/hooks/use-address";

export default function ThankyouPage() {
  const searchParams = useSearchParams();
  const saleId = searchParams.get("saleId");

  // const cart = useCart();
  const removeAll = useCart((state) => state.removeAll);
  const removeAddress = useAddress((state) => state.removeAddress);

  // console.log(items);
  // console.log(address);
  function remove() {
    try {
      removeAll();
      removeAddress();
      // redirect("/dashboard");
    } catch (error) {
      console.log(error);
    }
    // console.log("hola");
  }
  remove();
  return (
    <div className="flex items-center justify-center h-96">
      <div>
        <div className="flex flex-col items-center space-y-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="text-blue-700 w-28 h-28"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h1 className="text-4xl font-bold text-center">
            ¡Gracias por tu solicitud!
          </h1>
          <p className="text-center">
            Te enviaremos una confirmación por correo electrónico en breve.
          </p>
          <p className="text-center">
            <b>Tu ID de pedido es: {saleId}</b>
          </p>
          <Link
            href="/dashboard"
            // onClick={remove}
            className="inline-flex items-center px-4 py-2 text-white bg-blue-700 border border-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:ring"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" aria-hidden="true" />
            <span className="text-md font-medium">Inicio</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
