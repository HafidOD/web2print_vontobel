"use client";

import useAddress from "@/app/hooks/use-address";
import useCart from "@/app/hooks/use-cart";
import { useState } from "react";

export default function ExButt({ user }) {
  const [loading, setLoading] = useState(false);
  // console.log(user);
  const items = useCart((state) => state.items);
  const address = useAddress((state) => state.address);
  // console.log(address);
  const handleClick = async () => {
    // console.log(items);
    // Llama a la función para enviar el email con los detalles del pedido
    try {
      setLoading(true);
      const response = await fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items, user: user, address }),
      });
      // console.log(response);

      // console.log(response);
      if (response.ok) {
        const data = await response.json();
        // Redirigir a la página de agradecimiento
        // console.log(data);
        window.location.href = `/dashboard/thankyou?saleId=${data.sale.id}`;
      } else {
        console.error("Error al enviar el correo.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error de red:", error);
      setLoading(false);
    }
  };
  // console.log(items);
  return (
    <button
      // href={`/dashboard/thankyou`}
      onClick={handleClick}
      style={{ backgroundColor: `${loading ? "#ccc" : "#3446eb"}` }}
      className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      disabled={loading}
    >
      {loading ? "Relizando pedido..." : "Realizar pedido"}
    </button>
  );
}
