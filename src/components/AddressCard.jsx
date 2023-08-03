"use client";
import useAddress from "@/app/hooks/use-address";
// import { useState } from "react";

export default function AddressCard({ address }) {
  const addressState = useAddress();

  // console.log(address);
  // const [direccionSeleccionada, setDireccionSeleccionada] = useState("");

  const onAddAddress = (event) => {
    addressState.addAddress(address);
    // console.log(address);
  };

  return (
    <li
      key={address.id}
      className="flex justify-between gap-x-6 py-3 cursor-pointer"
    >
      <label htmlFor={`address-${address.id}`} className="cursor-pointer">
        <div className="flex gap-x-4">
          <div className="min-w-0 flex-auto">
            <p className="text-sm font-semibold leading-6 text-gray-900">
              {address.officeName}
            </p>
            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
              {address.address}
            </p>
            <p className="truncate text-xs leading-5 text-gray-500">
              {address.city}, {address.state}, {address.country}
            </p>
          </div>
        </div>
      </label>
      <input
        type="radio"
        id={`address-${address.id}`}
        name="address"
        value={address.id}
        // checked={direccionSeleccionada === addresses.id}
        onChange={onAddAddress}
      />
    </li>
  );
}
