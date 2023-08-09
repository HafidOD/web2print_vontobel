import {
  ClipboardDocumentCheckIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";
import { format } from "date-fns";
import Link from "next/link";
export default function SalesList({ sale, address }) {
  address = JSON.parse(address);
  // console.log(sale);
  const items = JSON.parse(sale.data);
  // console.log(items.items[0].currency);
  const currency = items.items[0].currency;
  // const totalItems = items.items.length;
  const fecha = format(new Date(sale.date), "dd-MM-yyyy");
  // console.log(formattedCreatedAt);
  // console.log(totalItems);
  // console.log(address);
  // console.log(items.items.length);
  return (
    <li className="py-3">
      <Link href={`/dashboard/pedidos/${sale.id}`}>
        <div className="flex flex-wrap justify-between">
          <div className="flex content-center">
            <div className="flex flex-wrap content-center">
              <ClipboardDocumentCheckIcon
                className="inline-block h-6 w-6 mx-3 text-green-600"
                aria-hidden="true"
              />
            </div>
            <div>
              <p className="text-xs"># Pedido</p>
              <p className="text-sm leading-6 text-gray-900 text-center">
                <b>{sale.id}</b>
              </p>
            </div>
          </div>
          <div>
            <p className="text-xs">Oficina</p>
            <p className="text-sm font-semibold leading-6 text-gray-900">
              {address.officeName}
            </p>
          </div>
          <div>
            <p className="text-xs">Fecha</p>
            <p className="mt-1 truncate text-xs leading-5 text-gray-500 text-center">
              {fecha}
            </p>
          </div>
          {/* <div>
            <p className="text-xs">Items</p>
            <p className="mt-1 truncate text-xs leading-5 text-gray-500 text-center">
              {totalItems}
            </p>
          </div> */}
          <div>
            <p className="text-xs">Total</p>
            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
              ${sale.totalSale} {currency}
            </p>
          </div>
          <div className="flex content-center flex-wrap">
            <ChevronRightIcon
              className="inline-block h-4 w-4 mx-3 text-gray-400"
              aria-hidden="true"
            />
          </div>
        </div>
      </Link>
    </li>
  );
}
