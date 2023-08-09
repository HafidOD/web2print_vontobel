"use client";
import { useEffect, useState } from "react";

export default function AddressSale({ address }) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  console.log(address);
  return (
    <div>
      {address.length === 0 && (
        <p className="py-6">No haz seleccionado dirección</p>
      )}
      <p>
        <b>Empresa:</b> {address.officeName}
      </p>
      <p>
        <b>Dirección:</b> {address.address}, CP.{address.postalCode}.
      </p>
      <p>
        <b>Ciudad:</b> {address.city}.
      </p>
      <p>
        <b>Estado:</b> {address.state}.
      </p>
      <p>
        <b>País:</b> {address.country}.
      </p>
    </div>
  );
}
