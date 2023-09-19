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
  // console.log(address);
  return (
    <div>
      {address.length === 0 && (
        <p className="py-6">No haz seleccionado dirección</p>
      )}
      <p className="text-primaryBlue">
        <b>Empresa:</b> {address.officeName}
      </p>
      <p className="text-primaryBlue">
        <b>Dirección:</b> {address.address}, CP.{address.postalCode}.
      </p>
      <p className="text-primaryBlue">
        <b>Ciudad:</b> {address.city}.
      </p>
      <p className="text-primaryBlue">
        <b>Estado:</b> {address.state}.
      </p>
      <p className="text-primaryBlue">
        <b>País:</b> {address.country}.
      </p>
    </div>
  );
}
