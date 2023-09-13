import ButtonsActionAdmin from "@/components/ButtonsActionAdmin";
import {
  PencilSquareIcon,
  TrashIcon,
  PlusSmallIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";

const URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchUsersAdmin() {
  const res = await fetch(`${URL}/users/`, { cache: 'no-store' });
  const data = await res.json();
  // console.log(data);

  return data.users;
}
export default async function AdminUsersPage() {
  const users = await fetchUsersAdmin();
  // console.log(users);
  return (
    <div className="w-full px-2 pt-8 m-auto md:w-3/5 sm:px-0">
      <section className="flex justify-between">
        <div>
          <h2>Listado de Usuarios</h2>
        </div>
        <div>
          <Link
            href={"/admin/users/nuevo"}
            className="flex text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Nuevo
            <PlusSmallIcon className="block w-5 h-5 ml-1" aria-hidden="true" />
          </Link>
        </div>
      </section>
      <div className="p-4 mt-5 bg-white rounded-lg shadow-lg">
        {users.length === 0 && <p className="mb-2">Aun no hay usuarios</p>}
        <ul role="list" className="divide-y divide-gray-100">
          {users.map((user) => (
            <li
              key={user.id}
              className="flex items-center justify-between py-2 gap-x-6"
            >
              <div className="flex items-center gap-x-4">
                {/* <img
                  className="flex-none object-contain w-12 h-12 rounded-full"
                  src={enterprise.logo}
                  alt={enterprise.enterpriseName}
                /> */}
                <div className="flex-auto min-w-0">
                  <p className="text-xs font-semibold leading-tight text-gray-900 md:text-sm">
                    {user.userName}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-gray-500 truncate">
                    {user.email}, {user.telefono} {user.role}, {user.typePrice}
                  </p>
                </div>
              </div>
              <div className="justify-center sm:flex sm:flex-col sm:items-end ">
                <ButtonsActionAdmin id={user.id} itemURL={"users"} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
