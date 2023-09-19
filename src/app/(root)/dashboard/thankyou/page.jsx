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
            className="text-primaryBlue w-28 h-28"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h1 className="text-4xl font-bold text-center text-primaryBlue">
            ¡Gracias por tu solicitud!
          </h1>
          <p className="text-center text-gray-600">
            Te enviaremos una confirmación por correo electrónico para un
            seguimiento personalizado con un asesor.
          </p>
          <p className="text-center text-primaryBlue">
            <b>Tu ID de pedido es: {saleId}</b>
          </p>
          <p className="text-center text-gray-600">
            Dudas: marriott@gruporegio.mx
          </p>
          <Link
            href="/dashboard"
            // onClick={remove}
            className="inline-flex items-center px-4 py-2 text-white rounded-full bg-primaryBlue "
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" aria-hidden="true" />
            <span className="font-bold text-md">Inicio</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
