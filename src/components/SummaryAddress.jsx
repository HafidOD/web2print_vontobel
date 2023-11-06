"use client";
import useAddress from "@/app/hooks/use-address";
import { useEffect, useState } from "react";

export default function SummaryAddress({ paramslang }) {
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
        <p className=" text-primaryBlue">
          {paramslang.addresses["no-address"]}
        </p>
      ) : (
        <div>
          <p className=" text-primaryBlue">
            <b>{paramslang.addresses.company}:</b> {address.officeName}
          </p>
          <p className=" text-primaryBlue">
            <b>{paramslang.addresses.address}:</b> {address.address}, CP.
            {address.postalCode}.
          </p>
          <p className=" text-primaryBlue">
            <b>{paramslang.addresses.city}:</b> {address.city}.
          </p>
          <p className=" text-primaryBlue">
            <b>{paramslang.addresses.state}:</b> {address.state}.
          </p>
          <p className=" text-primaryBlue">
            <b>{paramslang.addresses.country}:</b> {address.country}.
          </p>
        </div>
      )}
    </div>
  );
}
