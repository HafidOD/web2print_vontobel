import {
  PencilSquareIcon,
  TrashIcon,
  PlusSmallIcon,
} from "@heroicons/react/24/solid";

const URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchEnterprisesAdmin() {
  const res = await fetch(`${URL}/enterprises/`);
  const data = await res.json();
  // console.log(data);

  return data.enterprises;
}
export default async function AdminEnterprisesPage() {
  const enterprises = await fetchEnterprisesAdmin();
  // console.log(enterprises);

  const edit = () => {
    alert("edit");
  };
  const remove = () => {
    alert("remove");
  };
  return (
    <div className="w-full md:w-3/5 px-2 m-auto pt-8 sm:px-0">
      <section className="flex justify-between">
        <div>
          <h2>Listado de empresas</h2>
        </div>
        <div>
          <button className="flex text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Nuevo
            <PlusSmallIcon className="block h-5 w-5 ml-1" aria-hidden="true" />
          </button>
        </div>
      </section>
      <div className="rounded-lg shadow-lg mt-5 bg-white p-4">
        {enterprises.length === 0 && (
          <p className="mb-2">Aun no hay empresas agregadas</p>
        )}
        <ul role="list" className="divide-y divide-gray-100">
          {enterprises.map((enterprise) => (
            <li
              key={enterprise.id}
              className="flex justify-between items-center gap-x-6 py-2"
            >
              <div className="flex items-center gap-x-4">
                <img
                  className="object-contain h-12 w-12 flex-none rounded-full"
                  src={enterprise.logo}
                  alt={enterprise.enterpriseName}
                />
                <div className="min-w-0 flex-auto">
                  <p className="text-xs md:text-sm font-semibold text-gray-900 leading-tight">
                    {enterprise.enterpriseName}
                  </p>
                  {/* <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    ${product.price} {product.currency}
                  </p> */}
                </div>
              </div>
              <div className="justify-center sm:flex sm:flex-col sm:items-end ">
                <div className="flex">
                  <div className="flex justify-center items-center ml-3 ">
                    <button className="text-sm text-green-500">
                      <PencilSquareIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                  <div className="flex justify-center items-center ml-3 ">
                    <button className="text-sm text-red-600">
                      <TrashIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
