export default function ProductsSale({ product }) {
  // console.log(product);
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
          <p className="text-xs md:text-sm font-semibold text-primaryBlue leading-tight">
            {product.nameProduct}
          </p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
            ${product.price} {product.currency}
          </p>
        </div>
      </div>
      <div className="justify-center sm:flex sm:flex-col sm:items-end ">
        <div className="flex">
          <div className="pl-3 flex flex-col justify-center">
            <p className="text-xs md:text-sm">x {product.quantity}</p>
          </div>
          <div className="flex justify-center items-center ml-3">
            <p className="text-xs md:text-sm">
              ${product.total} {product.currency}
            </p>
          </div>
        </div>
      </div>
    </li>
  );
}
