import AddressSale from "../components/AddressSale";
import ProductSale from "../components/ProductSale";
import ButtonPdf from "../components/ButtonPdf";

const URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchSingleSales(saleId) {
  const res = await fetch(`${URL}/sales/${saleId}`);
  const data = await res.json();
  // console.log(data);
  return data.sale;
}

export default async function SingleSale({ params }) {
  // console.log(params.saleId);
  const sale = await fetchSingleSales(params.saleId);
  console.log(sale);
  const items = JSON.parse(sale.data);
  const address = JSON.parse(sale.address);
  const currency = items.items[0].currency;
  // console.log(items.items);
  // console.log(address);
  // console.log(sale);
  return (
    <div>
      <div>
        <div className="flex justify-center flex-col md:flex-row m-4">
          <div className="md:w-2/5 p-6 bg-white rounded-lg shadow-lg mb-4 mx-2 md:mb-0">
            <h2 className="text-xl font-semibold mb-4">Resumen de Compra</h2>
            <ul className="divide-y divide-gray-100">
              {/* <SummaryProducts></SummaryProducts> */}
              {items.items.map((item) => (
                <ProductSale key={item.id} product={item}></ProductSale>
              ))}
            </ul>
            <div className="border-t-2 border-t-gray-200 pt-2">
              <p className="text-end">
                Total: ${sale.totalSale} {currency}
              </p>
            </div>
          </div>
          <div className="md:w-2/5 mx-2 p-6 rounded-lg bg-white shadow-lg align-middle">
            <h2 className="text-xl font-semibold mb-4">Dirección de Envío</h2>
            <AddressSale address={address}></AddressSale>
          </div>
        </div>
        <div className="w-full md:w-1/5 px-2 m-auto py-5 space-y-5 sm:px-0">
          <div className="flex justify-center mb-4">
            <ButtonPdf sale={sale} items={items} address={address}></ButtonPdf>
          </div>
        </div>
      </div>
    </div>
  );
}
