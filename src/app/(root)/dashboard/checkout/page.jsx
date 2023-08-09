// "use client";
// import ReactPDF, { PDFDownloadLink } from "@react-pdf/renderer";
import SummaryAddress from "@/components/SummaryAddress";
import SummaryProducts from "@/components/SummaryProducts";
import ExButt from "./components/ExButt";

// import PdfTemplate from "./components/PdfTemplate";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";

const GeneratePDF = async () => {
  const { user } = await getServerSession(authOptions);
  // console.log(user.id);
  // console.log(user);
  // const PDF = PdfTemplate;

  // ReactPDF.render(<PdfTemplate />, `${__dirname}/example.pdf`);
  // ReactPDF.renderToStream(<PdfTemplate />);
  return (
    <div>
      <div className="flex justify-center flex-col md:flex-row m-4">
        <div className="md:w-2/5 p-6 bg-white rounded-lg shadow-lg mb-4 mx-2 md:mb-0">
          <h2 className="text-xl font-semibold mb-4">Resumen de Compra</h2>
          <SummaryProducts></SummaryProducts>
        </div>
        <div className="md:w-2/5 mx-2 p-6 rounded-lg bg-white shadow-lg align-middle">
          <h2 className="text-xl font-semibold mb-4">Dirección de Envío</h2>
          <SummaryAddress></SummaryAddress>
        </div>
      </div>
      <div className="w-full md:w-2/5 px-2 m-auto py-5 space-y-5 sm:px-0">
        <div className="flex justify-center mb-4">
          <ExButt user={user.id}></ExButt>
        </div>
      </div>
      {/* <PDFDownloadLink
        document={<PdfTemplate />}
        fileName="test.pdf"
      ></PDFDownloadLink> */}
      {/* <PdfTemplate user={user}></PdfTemplate> */}
    </div>
  );
};

export default GeneratePDF;
