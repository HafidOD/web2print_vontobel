"use client";
import ProductList from "@/components/ProductList";
import useCart from "@/app/hooks/use-cart";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CheckoutPage({ params }) {
  const [isMounted, setIsMounted] = useState(false);
  const cart = useCart();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);
  // console.log(items);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  const totalPrice = items.reduce((total, item) => {
    return total + item.quantity * item.priceLocal;
  }, 0);
  // console.log(totalPrice);
  return (
    <div className="w-full md:w-2/5 px-2 m-auto py-5 space-y-5 sm:px-0">
      <div>Resumen de compra</div>
      <div className="rounded-lg shadow-lg mt-5 bg-white p-4">
        {cart.items.length === 0 && (
          <p className="mb-2">No hay productos en el carrito</p>
        )}
        <ul role="list" className="divide-y divide-gray-100">
          {cart.items.map((product) => (
            // <p key={product.id}>{product.nameProduct}</p>
            <ProductList key={product.id} product={product}></ProductList>
          ))}
        </ul>
        <div className="border-t-2 border-t-gray-200 pt-2">
          <p className="text-end">Total: ${totalPrice}.00</p>
        </div>
      </div>
      {cart.items.length !== 0 && (
        <div>
          <div className="flex justify-center mb-4">
            <a
              href="#"
              className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Actualizar carrito
            </a>
          </div>
          <div className="flex justify-center mb-4">
            <Link
              href={`/dashboard/${params.enterpriseId}/direccion`}
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Seleccionar dirección
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
