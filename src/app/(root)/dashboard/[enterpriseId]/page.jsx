import { prisma } from "@/libs/db";
import Link from "next/link";
import { redirect } from "next/navigation";

const URL = process.env.NEXT_PUBLIC_API_URL;

import { PrinterIcon, TruckIcon } from "@heroicons/react/24/solid";
export async function fetchEnterprises(id) {
  const res = await fetch(`${URL}/enterprises/${id}`);
  const data = await res.json();
  // console.log(data);

  return data.data;
}
export default async function EnterprisePage({ params }) {
  const enterprise = await fetchEnterprises(params.enterpriseId);
  // console.log(enterprise);
  // console.log(params.enterpriseId);
  if (!enterprise) {
    redirect("/dashboard");
  }
  // console.log(enterprise);
  return (
    <div className="flex flex-col items-center justify-center h-96">
      <div className="w-full md:w-2/5 px-2 m-auto py-5 space-y-5 sm:px-0">
        <div>
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-center text-blue-700">
              ¿Qué deseas realizar hoy?
            </h3>

            <Link
              className="block w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm md:text-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              href="/dashboard/impresion"
            >
              <PrinterIcon
                className="inline-block h-6 w-6 mx-3"
                aria-hidden="true"
              />
              Creación de archivos para impresión
            </Link>

            <Link
              className="block w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm md:text-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              href={`${params.enterpriseId}/2`}
            >
              <TruckIcon
                className="inline-block h-6 w-6 mx-3"
                aria-hidden="true"
              />
              Envío de inventarios
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
