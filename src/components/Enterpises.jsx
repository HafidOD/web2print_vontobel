"use client";

import Image from "next/image";
import Link from "next/link";
import { createContext, useContext, useState } from "react";

export const enterpriseContext = createContext();

export default function Enterpises({ enterprises }) {
  const [enterprise, setEnterpise] = useState(null);

  return (
    <div className="grid gap-3 lg:grid-cols-3 justify-items-center">
      {/* <p>enterprise id = { enterprise }</p> */}
      {enterprises.map((enterprise) => {
        return (
          <Link
            href={"/dashboard/" + enterprise.id}
            className="w-full"
            key={enterprise.id}
            onClick={() => setEnterpise(enterprise.id)}
          >
            <div className="w-full rounded-lg shadow-lg lg:max-w-sm bg-white">
              <img
                className="object-contain w-full h-48"
                src={enterprise.logo}
                alt={enterprise.enterpriseName}
              />
              {/* <div className="p-4">
                <h4 className="text-xl font-semibold tracking-tight text-center text-blue-600">
                  {enterprise.enterpriseName}
                </h4>
              </div> */}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
