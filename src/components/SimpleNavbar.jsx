"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

import useCart from "@/app/hooks/use-cart";
import { signOut } from "next-auth/react";

export default function Navbar({ params }) {
  // console.log(params);
  const removeAll = useCart((state) => state.removeAll);
  removeAll();

  function logout() {
    removeAll();
    signOut();
  }

  return (
    <div className="w-full bg-blue-700">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <Link href="/dashboard/">
                <Image
                  className=""
                  src="/images/logos/logo_regio_white.png"
                  alt="Logo Grupo Regio"
                  width={125}
                  height={37}
                  priority
                />
              </Link>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="relative ml-3 flex justify-center">
              <button
                onClick={logout}
                type="button"
                className="rounded-full bg-white p-1 text-blue-700 focus:outline-none"
              >
                <ArrowRightOnRectangleIcon
                  className="h-6 w-6"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
