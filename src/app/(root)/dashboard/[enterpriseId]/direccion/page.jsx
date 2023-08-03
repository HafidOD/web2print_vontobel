import Link from "next/link";
import AddressCard from "@/components/AddressCard";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";

const URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchAddresses(enterpriseId) {
  const res = await fetch(`${URL}/${enterpriseId}/addresses/`);
  const data = await res.json();

  return data.addresses;
}
export async function fetchSingleAddresses(enterpriseId, userId) {
  const res = await fetch(`${URL}/${enterpriseId}/addresses/${userId}`);
  const data = await res.json();

  return data.addresses;
}
export default async function AddressPage({ params }) {
  const { user } = await getServerSession(authOptions);

  let addresses = [];
  // console.log(user.role);
  if (user.role === 1) {
    addresses = await fetchSingleAddresses(params.enterpriseId, user.id);
  } else {
    addresses = await fetchAddresses(params.enterpriseId);
  }

  // console.log(addresses);
  return (
    <div className="w-full md:w-2/5 px-2 m-auto py-5 space-y-5 sm:px-0">
      <div>page seleccion de direcciones</div>
      <div className="rounded-lg shadow-lg mt-5 bg-white">
        {addresses.length === 0 && (
          <p className="py-6">No hay direcciones disponibles</p>
        )}

        <ul role="list" className="divide-y divide-gray-100 px-3">
          {addresses.map((address) => (
            <AddressCard key={address.id} address={address}></AddressCard>
          ))}
        </ul>
      </div>
      <div className="flex justify-center">
        <Link
          href={`/dashboard/${params.enterpriseId}/thankyou`}
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Finalizar pedido
        </Link>
      </div>
    </div>
  );
}
