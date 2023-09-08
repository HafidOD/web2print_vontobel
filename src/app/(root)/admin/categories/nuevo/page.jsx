"use client";
import { useRef, useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

function CategoryForm() {
  const [category, setCategory] = useState({
    categoryName: "",
    parentCategory: null,
    enterprises: [],
  });
  const [file, setFile] = useState(null);
  const form = useRef(null);
  const router = useRouter();
  const params = useParams();

  const handleChange = (e) => {
    setCategory({
      ...category,
      [e.target.name]: e.target.value,
    });
  };

  // useEffect(() => {
  //   if (params.id) {
  //     axios.get("/api/adresses/" + params.id).then((res) => {
  //       setProduct({
  //         name: res.data.name,
  //         price: res.data.price,
  //         description: res.data.description,
  //       });
  //     });
  //   }
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("categoryName", category.categoryName);
    formData.append("parentCategory", category.parentCategory);
    formData.append("enterprises", category.enterprises);

    if (file) {
      formData.append("imageCategory", file);
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
    router.push("/products");
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
            htmlFor="categoryName"
            className="block my-2 text-sm font-bold text-gray-700"
          >
            Nombre de la categoria:
          </label>
          <input
            name="categoryName"
            type="text"
            // placeholder="Marr"
            onChange={handleChange}
            value={category.categoryName}
            className="w-full px-3 py-2 border rounded shadow appearance-none"
            autoFocus
          />

          <label
            htmlFor="categoryName"
            className="block my-2 text-sm font-bold text-gray-700"
          >
            Categoria padre:
          </label>
          <input
            name="parentCategory"
            type="text"
            // placeholder="Marr"
            onChange={handleChange}
            value={category.parentCategory}
            className="w-full px-3 py-2 border rounded shadow appearance-none"
            autoFocus
          />

          <label
            htmlFor="enterprises"
            className="block my-2 text-sm font-bold text-gray-700"
          >
            Empresas:
          </label>
          <input
            name="parentCategory"
            type="text"
            // placeholder="Marr"
            onChange={handleChange}
            value={category.enterprises}
            className="w-full px-3 py-2 border rounded shadow appearance-none"
            autoFocus
          />

          <label
            htmlFor="imageCategory"
            className="block my-2 text-sm font-bold text-gray-700"
          >
            Imagen:
          </label>
          <input
            type="file"
            className="w-full px-3 py-2 mb-2 border rounded shadow appearance-none"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />

          {file && (
            <img
              className="object-contain mx-auto my-4 w-96"
              src={URL.createObjectURL(file)}
              alt=""
            />
          )}

          <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
            {params.id ? "Actualizar" : "Crear"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CategoryForm;
