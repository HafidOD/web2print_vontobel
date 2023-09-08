import {
  PencilSquareIcon,
  TrashIcon,
  PlusSmallIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";

const URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchProductsAdmin() {
  const res = await fetch(`${URL}/products/`);
  const data = await res.json();
  // console.log(data);

  return data.products;
}
export default async function AdminProductsPage() {
  const products = await fetchProductsAdmin();
  // console.log(products);
  return (
    <div className="w-full px-2 pt-8 m-auto md:w-3/5 sm:px-0">
      <section className="flex justify-between">
        <div>
          <h2>Listado de productos</h2>
        </div>
        <div>
          <Link
            href={"/admin/products/nuevo"}
            className="flex text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Nuevo
            <PlusSmallIcon className="block w-5 h-5 ml-1" aria-hidden="true" />
          </Link>
        </div>
      </section>
      <div className="p-4 mt-5 bg-white rounded-lg shadow-lg">
        {products.length === 0 && <p className="mb-2">Aun no hay productos</p>}
        <ul role="list" className="divide-y divide-gray-100">
          {products.map((product) => (
            <li
              key={product.id}
              className="items-center justify-between block py-4 md:flex gap-x-6"
            >
              <div className="flex items-center gap-x-4">
                <img
                  className="flex-none object-contain w-12 h-12 rounded-full"
                  src={product.imageProduct}
                  alt={product.nameProduct}
                />
                <div className="flex-auto min-w-0">
                  <p className="text-xs font-semibold leading-tight text-gray-900 md:text-sm">
                    {product.nameProduct}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-gray-500 truncate">
                    SKU: {product.sku}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-gray-500 truncate">
                    Precio Local: ${product.priceLocal}, Precio Nacional: $
                    {product.priceLocal}, Precio Extranjero: ${product.priceExt}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-gray-500 truncate">
                    Empresa: {product.enterpriseId}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-gray-500 truncate">
                    Categoria:{" "}
                    {product.categories.map(
                      (category) => category.categoryName
                    )}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-gray-500 truncate">
                    Stock: {product.stockProduct}, Unidades por caja:{" "}
                    {product.unitsPackage}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-gray-500 truncate">
                    Visible: {product.published ? "Publicado" : "Borrador"}
                  </p>
                </div>
              </div>
              <div className="justify-center sm:flex sm:flex-col sm:items-end ">
                <div className="flex justify-center">
                  <div className="flex items-center justify-center ml-3 ">
                    <button className="text-sm text-green-500">
                      <PencilSquareIcon
                        className="w-5 h-5"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                  <div className="flex items-center justify-center ml-3 ">
                    <button className="text-sm text-red-600">
                      <TrashIcon className="w-5 h-5" aria-hidden="true" />
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
