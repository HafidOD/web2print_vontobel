"use client";
import { useRef, useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditEnterprisePage() {
  const form = useRef(null);
  const router = useRouter();
  const params = useParams();

  const [enterprise, setEnterprise] = useState({
    enterpriseName: "",
    old_logo: "",
  });
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setEnterprise({
      ...enterprise,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (params.id) {
      fetch("/api/enterprises/" + params.id)
        .then((response) => response.json())
        .then((data) => {
          // console.log(data.data);
          setEnterprise({
            enterpriseName: data.data.enterpriseName,
            old_logo: data.data.logo,
          });
          // console.log(enterprise.logo);
        })
        .catch((error) => {
          console.error("Error al obtener le empresa:", error);
        });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("enterpriseName", enterprise.enterpriseName);
    formData.append("old_logo", enterprise.old_logo);

    if (file) {
      formData.append("logo", file);
    }
    const res = await fetch(`/api/enterprises/${params.id}`, {
      method: "PUT",
      body: formData,
      // headers: { "Content-type": "multipart/form-data" },
    });
    // console.log(res);
    if (res.ok) {
      form.current.reset();
      router.refresh();
      router.push(`/admin/enterprises`);
    }
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
            Nombre de la empresa:
          </label>
          <input
            name="enterpriseName"
            type="text"
            // placeholder="Marr"
            onChange={handleChange}
            value={enterprise.enterpriseName}
            className="w-full px-3 py-2 border shadow appearance-none"
            autoFocus
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
          />

          {!file && (
            <img
              className="object-contain mx-auto my-4 w-96"
              src={enterprise.old_logo}
              alt=""
            />
          )}
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
