"use client";
import Link from "next/link";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";
import userCart from "@/app/hooks/use-cart";
import { useEffect, useState } from "react";

export default function IconCart({ params }) {
  console.log(params);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  const cart = userCart();

  if (!isMounted) {
    return null;
  }
  return (
    <Link
      href={`/dashboard/${params.enterpriseId}/checkout`}
      className="ml-4 flow-root lg:ml-6 bg-white rounded-full px-3 py-1"
    >
      <div className="group flex items-center">
        <ShoppingBagIcon
          className="h-6 w-6 flex-shrink-0 text-blue-700"
          aria-hidden="true"
        />
        <span className="ml-2 text-sm font-medium text-blue-700">
          {cart.items.length}
        </span>
        <span className="sr-only">Ir al carrito</span>
      </div>
    </Link>
  );
}
