// "use client";
import Link from "next/link";

export default function Card({ item }) {
  return (
    <Link href={`${item.href}`} className="w-full">
      <div className="w-full rounded-md shadow-lg lg:max-w-sm bg-white border-l-6 border-green-500">
        {/* <img
                className="object-contain w-full h-48"
                src={enterprise.logo}
                alt={enterprise.enterpriseName}
              /> */}
        <div className="p-4">
          <h4 className="text-md font-semibold text-center text-blue-600 uppercase">
            {item.name}
          </h4>
        </div>
      </div>
    </Link>
  );
}
