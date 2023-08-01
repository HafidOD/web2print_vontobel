import ProductCard from "@/components/ProductCard";
import Link from "next/link";

const URL = process.env.NEXT_PUBLIC_API_URL;
export async function fetchProducts(id, parentId, categoryId) {
  const res = await fetch(`${URL}/${id}/${parentId}/${categoryId}`);
  const data = await res.json();
  // console.log(data);

  return data.products;
}
export default async function ProductPageCategory({ params }) {
  const products = await fetchProducts(
    params.enterpriseId,
    params.categoryParentId,
    params.categoryId
  );

  // console.log(params);
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full md:w-2/5 px-2 m-auto py-5 space-y-5 sm:px-0">
        <div className="space-y-4">
          <h3 className="text-xl font-medium text-center text-blue-700">
            Selecciona los productos
          </h3>
          {products.length === 0 && (
            <p className="py-6 px-4 bg-white rounded-lg">
              No hay productos disponibles
            </p>
          )}
          {/* <ProductCard products={products}></ProductCard> */}
          {products.map((product) => (
            <ProductCard key={product.id} product={product}></ProductCard>
          ))}
          <div className="flex justify-center">
            {products.length !== 0 && (
              <Link
                href={`/dashboard/${params.enterpriseId}/checkout`}
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Ver Carrito
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
