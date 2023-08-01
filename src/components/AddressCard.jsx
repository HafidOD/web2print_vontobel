export default function AddressCard({ addresses }) {
  return (
    <ul role="list" className="divide-y divide-gray-100 px-3">
      {addresses.length === 0 && (
        <p className="py-6">No hay direcciones disponibles</p>
      )}
      {addresses.map((address) => (
        <li key={address.id} className="flex justify-between gap-x-6 py-3">
          <div className="flex gap-x-4">
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                {address.officeName}
              </p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                {address.address}
              </p>
              <p className="truncate text-xs leading-5 text-gray-500">
                {address.city}, {address.state}, {address.country}
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <input type="checkbox" name="" id="" />
          </div>
        </li>
      ))}
    </ul>
  );
}
