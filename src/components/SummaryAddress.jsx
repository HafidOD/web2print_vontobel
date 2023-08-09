"use client";
import useAddress from "@/app/hooks/use-address";
import { useEffect, useState } from "react";

export default function SummaryAddress() {
  const [isMounted, setIsMounted] = useState(false);
  const address = useAddress((state) => state.address);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  // if ( === 0) {
  //   console.log("El objeto está vacío");
  // } else {
  //   console.log("El objeto no está vacío");
  // }
  // console.log(address);
  return (
    <div>
      {Object.keys(address).length === 0 ? (
        <p className="">No haz seleccionado dirección</p>
      ) : (
        <div>
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
      )}
    </div>
  );
}
