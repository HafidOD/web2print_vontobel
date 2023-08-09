"use client";
import { PDFDownloadLink } from "@react-pdf/renderer";
import SalePdf from "./SalePdf";

export default function ButtonPdf({ sale, items, address }) {
  // console.log(sale.date);
  return (
    // <div>hola</div>
    <PDFDownloadLink
      document={<SalePdf sale={sale} items={items.items} address={address} />}
      fileName={`gr-pedido-${sale.id}`}
      className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      {({ blob, url, loading, error }) =>
        loading ? "Cargando..." : "Descargar PDF"
      }
    </PDFDownloadLink>
  );
}
