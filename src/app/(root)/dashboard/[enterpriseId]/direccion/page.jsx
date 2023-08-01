import Link from "next/link";
import AddressCard from "@/components/AddressCard";

const URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchAddresses(enterpriseId) {
  const res = await fetch(`${URL}/${enterpriseId}/addresses`);
  const data = await res.json();

  return data.addresses;
}
// const addresses = [
//   {
//     id: 1,
//     officeName: "City Express Junior Aguascalientes Centro",
//     address: "Av. Ayuntamiento 102, Obraje.",
//     city: "Aguascalientes",
//     country: "México",
//     state: "Aguascalientes",
//     postalCode: 20230,
//     enterpriseId: 2,
//     createdAt: "2023-07-27T21:48:27.329Z",
//     updatedAt: "2023-07-27T21:48:27.329Z",
//     enterprise: {
//       id: 2,
//       enterpriseName: "City Express",
//       logo: "/images/enterprises/logos/city-express.jpg",
//       createdAt: "2023-07-27T21:48:10.129Z",
//       updatedAt: "2023-07-27T21:48:10.129Z",
//     },
//   },
// ];
export default async function AddressPage({ params }) {
  const addresses = await fetchAddresses(params.enterpriseId);
  // console.log(addresses);
  return (
    <div className="w-full md:w-2/5 px-2 m-auto py-5 space-y-5 sm:px-0">
      <div>page seleccion de direcciones</div>
      <div className="rounded-lg shadow-lg mt-5 bg-white">
        <AddressCard addresses={addresses}></AddressCard>
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
