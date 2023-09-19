"use client";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

const URL = process.env.NEXT_PUBLIC_API_URL;

export default function ButtonsActionAdmin({ itemURL, id }) {
  const router = useRouter();
  // console.log(itemURL, id);
  const edit = () => {
    alert(id + " " + itemURL);
  };
  const remove = async () => {
    const res = await fetch(`${URL}/${itemURL}/${id}`, {
      method: "DELETE",
    });
    // console.log(res);
    // if (res.status === 204) {
    router.push(`/admin/${itemURL}`);
    router.refresh();
    // }
  };
  return (
    <div className="flex">
      <div className="flex items-center justify-center ml-3 ">
        <a
          href={`/admin/${itemURL}/edit/${id}`}
          className="text-sm text-secondGray"
        >
          <PencilSquareIcon className="w-5 h-5" aria-hidden="true" />
        </a>
      </div>
      <div className="flex items-center justify-center ml-3 ">
        <button className="text-sm text-red-700" onClick={remove}>
          <TrashIcon className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
