import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import SalesList from "./components/SalesList";

const URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchSales(userId) {
  const res = await fetch(`${URL}/sales/user/${userId}`);
  const data = await res.json();
  // console.log(data.sales);
  return data.sales;
}

export default async function pagePedidos() {
  const { user } = await getServerSession(authOptions);

  const sales = await fetchSales(user.id);
  return (
    <div className="w-full md:w-2/5 px-2 m-auto py-5 space-y-5 sm:px-0">
      <div>
        <p>Pedidos anteriores</p>
      </div>
      <div className="rounded-lg shadow-lg mt-5 bg-white">
        {sales.length === 0 && <p className="py-6">No hay Pedidos aun</p>}

        <ul role="list" className="divide-y divide-gray-100 px-3">
          {sales.map((sale) => (
            <SalesList
              key={sale.id}
              sale={sale}
              address={sale.address}
            ></SalesList>
          ))}
        </ul>
      </div>
    </div>
  );
}
