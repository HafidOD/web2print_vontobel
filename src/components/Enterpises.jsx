"use client";

// import Image from "next/image";
import Link from "next/link";
// import { useState } from "react";

export default function Enterpises({ enterprises, paramslang }) {
  return (
    // <div className="grid gap-3 lg:grid-cols-3 justify-items-center">
    <div className="flex flex-wrap justify-center gap-3 justify-items-center">
      {/* <p>enterprise id = { enterprise }</p> */}
      {enterprises.map((enterprise) => {
        return (
          <Link
            href={`/${paramslang}/dashboard/${enterprise.id}/2`}
            className=""
            key={enterprise.id}
          >
            <div className="w-full bg-white rounded-sm shadow-lg lg:max-w-sm">
              <img
                className="object-contain w-full h-48 p-4"
                src={enterprise.logo}
                alt={enterprise.enterpriseName}
              />
            </div>
            <div className="p-3">
              <h4 className="text-center text-md text-primaryBlue">
                {enterprise.enterpriseName}
              </h4>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
