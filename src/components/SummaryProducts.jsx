"use client";
import useCart from "@/app/hooks/use-cart";
import { useEffect, useState } from "react";
import SummaryListProducts from "@/components/SummaryListProducts";

export default function SummaryProducts() {
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
  return (
    <div>
      {items.length === 0 && (
        <p className="mb-2">No hay productos en el carrito</p>
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
    </div>
  );
}
