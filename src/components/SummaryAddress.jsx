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
        <p className=" text-primaryBlue">No haz seleccionado dirección</p>
      ) : (
        <div>
          <p className=" text-primaryBlue">
            <b>Empresa:</b> {address.officeName}
          </p>
          <p className=" text-primaryBlue">
            <b>Dirección:</b> {address.address}, CP.{address.postalCode}.
          </p>
          <p className=" text-primaryBlue">
            <b>Ciudad:</b> {address.city}.
          </p>
          <p className=" text-primaryBlue">
            <b>Estado:</b> {address.state}.
          </p>
          <p className=" text-primaryBlue">
            <b>País:</b> {address.country}.
          </p>
        </div>
      )}
    </div>
  );
}
