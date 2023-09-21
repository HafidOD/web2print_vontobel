"use client";
import { useRef, useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

function EnterpriseForm() {
  const [enterprise, setEnterprise] = useState({
    enterpriseName: "",
  });
  const [file, setFile] = useState(null);
  const form = useRef(null);
  const router = useRouter();
  const params = useParams();

  const handleChange = (e) => {
    setEnterprise({
      ...enterprise,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("enterpriseName", enterprise.enterpriseName);

    if (file) {
      formData.append("logo", file);
    }

    if (!params.id) {
      const res = await fetch("/api/enterprises", {
        method: "POST",
        body: formData,
        // headers: { "Content-type": "multipart/form-data" },
      });
    } else {
      const res = await axios.put("/api/products/" + params.id, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    }

    form.current.reset();
    router.refresh();
    router.push(`/admin/enterprises`);
  };

  return (
    <div className="w-full px-2 pt-8 m-auto md:w-2/5 sm:px-0">
      <div className="">
        <form
          className="px-8 pt-6 pb-8 mb-4 bg-white rounded-md shadow-md"
          onSubmit={handleSubmit}
          ref={form}
        >
          <label
            htmlFor="enterpriseName"
            className="block mb-2 text-sm font-bold text-primaryBlue"
          >
            Nombre de la propiedad:
          </label>
          <input
            name="enterpriseName"
            type="text"
            // placeholder="Marr"
            onChange={handleChange}
            value={enterprise.enterpriseName}
            className="w-full px-3 py-2 border shadow appearance-none "
            autoFocus
            required
          />

          <label
            htmlFor="productImage"
            className="block my-2 text-sm font-bold text-primaryBlue"
          >
            Logo:
          </label>
          <input
            type="file"
            className="w-full px-3 py-2 mb-2 border shadow appearance-none"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
            required
          />

          {file && (
            <img
              className="object-contain mx-auto my-4 w-96"
              src={URL.createObjectURL(file)}
              alt=""
            />
          )}

          <button className="px-4 py-2 mt-4 font-bold text-white bg-primaryBlue">
            {params.id ? "Actualizar" : "Crear"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EnterpriseForm;
