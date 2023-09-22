import ButtonsActionAdmin from "@/components/ButtonsActionAdmin";
import { PlusSmallIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

const URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchEnterprisesAdmin() {
  const res = await fetch(`${URL}/properties/`, { cache: "no-cache" });
  const data = await res.json();
  // console.log(data);

  return data.properties;
}

export default async function PropertiesPage() {
  const properties = await fetchEnterprisesAdmin();

  return (
    <div className="w-full px-2 pt-8 m-auto md:w-3/5 sm:px-0">
      <section className="flex justify-between">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-center text-primaryBlue">
            Propiedades
          </h3>
        </div>
        <div>
          <Link
            href={"/admin/properties/nuevo"}
            className="flex text-white bg-primaryBlue font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Nuevo
            <PlusSmallIcon className="block w-5 h-5 ml-1" aria-hidden="true" />
          </Link>
        </div>
      </section>
      <div className="p-4 mt-5 bg-white rounded-lg shadow-lg">
        {/* {properties.length === 0 && (
          <p className="mb-2">Aun no hay propiedades agregadas</p>
        )} */}
        {/* <ul role="list" className="divide-y divide-gray-100">
          {properties.map((property) => (
            <li
              key={property.id}
              className="flex items-center justify-between py-4 gap-x-6"
            >
              <div className="flex items-center gap-x-4">
                <div className="flex-auto min-w-0">
                  <p className="text-xs font-semibold leading-tight text-primaryBlue md:text-sm">
                    {property.propertyName}
                  </p>
                </div>
              </div>
              <div className="justify-center sm:flex sm:flex-col sm:items-end ">
                <ButtonsActionAdmin itemURL={"properties"} id={property.id} />
              </div>
            </li>
          ))}
        </ul> */}
      </div>
    </div>
  );
}
