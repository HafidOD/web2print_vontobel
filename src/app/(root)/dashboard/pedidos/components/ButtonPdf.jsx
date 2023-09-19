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
      className="w-full text-white bg-primaryBlue font-medium text-sm px-5 py-2.5 text-center"
    >
      {({ blob, url, loading, error }) =>
        loading ? "Cargando..." : "Descargar PDF"
      }
    </PDFDownloadLink>
  );
}
