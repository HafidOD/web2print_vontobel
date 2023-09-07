"use client";
import { Disclosure, Menu } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import {
  Bars3Icon,
  ArrowRightOnRectangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { signOut } from "next-auth/react";

const navigation = [
  { name: "Inicio", href: "/admin" },
  { name: "Empresas", href: "/admin/enterprises" },
  { name: "Direcciones", href: "/admin/direcciones" },
  { name: "Usuarios", href: "/admin/usuarios" },
  { name: "Categorias", href: "/admin/categorias" },
  { name: "Productos", href: "/admin/productos" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavbarAdmin() {
  return (
    <Disclosure as="nav" className="bg-blue-700">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-white focus:outline-none">
                  <span className="sr-only">
                    <Menu></Menu>
                  </span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link href="/admin">
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
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-white text-black"
                            : "text-white hover:bg-white hover:text-black",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div className="relative ml-3 flex justify-center">
                  <button
                    onClick={() => signOut()}
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

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-white text-black"
                      : "text-white hover:bg-white hover:text-black",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
