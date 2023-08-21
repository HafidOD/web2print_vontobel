import { TrashIcon } from "@heroicons/react/24/solid";
import ButtonCheckout from "./ButtonCheckout";
import useCart from "@/app/hooks/use-cart";

export default function ProductList({ product }) {
  const cart = useCart();
  const onRemove = () => {
    cart.removeItem(product.id);
  };

  return (
    <li
      key={product.id}
      className="flex justify-between items-center gap-x-6 py-2"
    >
      <div className="flex items-center gap-x-4">
        <img
          className="object-contain h-12 w-12 flex-none rounded-full"
          src={product.imageProduct}
          alt={product.nameProduct}
        />
        <div className="min-w-0 flex-auto">
          <p className="text-xs md:text-sm font-semibold text-gray-900 leading-tight">
            {product.nameProduct}
          </p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
            ${product.price} {product.currency}
          </p>
        </div>
      </div>
      <div className="justify-center sm:flex sm:flex-col sm:items-end ">
        <div className="flex">
          <ButtonCheckout
            quantity={product.quantity}
            productId={product.id}
          ></ButtonCheckout>
          <div className="flex justify-center items-center ml-3">
            <p className="text-xs md:text-sm">
              ${product.quantity * product.price} {product.currency}
            </p>
          </div>
          <div className="flex justify-center items-center ml-3 ">
            <button className="text-sm text-red-600" onClick={onRemove}>
              <TrashIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
