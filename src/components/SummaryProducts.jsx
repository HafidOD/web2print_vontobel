"use client";
import useCart from "@/app/hooks/use-cart";
import { useEffect, useState } from "react";
import SummaryListProducts from "@/components/SummaryListProducts";

export default function SummaryProducts({ paramslang }) {
  const [isMounted, setIsMounted] = useState(false);
  // const cart = useCart();
  const items = useCart((state) => state.items);
  // console.log(items);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  const totalPrice = items.reduce((total, item) => {
    return total + item.quantity * item.price;
  }, 0);
  return (
    <div>
      {items.length === 0 && (
        <p className="mb-2 text-md text-primaryBlue">
          No hay productos en el carrito
        </p>
      )}
      <ul role="list" className="divide-y divide-gray-100">
        {items.map((product) => (
          // <p key={product.id}>{product.nameProduct}</p>
          <SummaryListProducts
            key={product.id}
            product={product}
          ></SummaryListProducts>
        ))}
      </ul>
      <div className="pt-2 border-t-2 border-t-gray-200">
        <p className="text-end">
          Total: ${totalPrice} {items[0].currency}
        </p>
      </div>
    </div>
  );
}
