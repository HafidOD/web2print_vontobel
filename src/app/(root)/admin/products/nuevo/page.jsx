"use client";
import { useRef, useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

function ProductForm() {
  const [product, setProduct] = useState({
    sku: "",
    nameProduct: "",
    imageProduct: "",
    priceLocal: null,
    priceNacional: null,
    priceExt: null,
    descriptionProduct: null,
    stockProduct: null,
    unitsPackage: null,
    published: true,
    enterpriseId: null,
    categories: [],
  });
  const [file, setFile] = useState(null);
  const form = useRef(null);
  const router = useRouter();
  const params = useParams();

  const handleChange = (e) => {
    setProduct({
      ...product,
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

    formData.append("sku", product.sku);
    formData.append("nameProduct", product.nameProduct);
    formData.append("priceLocal", product.priceLocal);
    formData.append("priceNacional", product.priceNacional);
    formData.append("priceExt", product.priceExt);
    formData.append("descriptionProduct", product.descriptionProduct);
    formData.append("stockProduct", product.stockProduct);
    formData.append("unitsPackage", product.unitsPackage);
    formData.append("published", product.published);
    formData.append("enterpriseId", product.enterpriseId);
    formData.append("categories", product.categories);

    if (file) {
      formData.append("imageProduct", file);
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
    router.push("/admin/products/");
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
            htmlFor="nameProduct"
            className="block mb-2 text-sm font-bold text-gray-700"
          >
            Nombre del producto:
          </label>
          <input
            name="nameProduct"
            type="text"
            // placeholder="Marr"
            onChange={handleChange}
            value={product.nameProduct}
            className="w-full px-3 py-2 border rounded shadow appearance-none"
            autoFocus
          />

          <label
            htmlFor="priceLocal"
            className="block my-2 text-sm font-bold text-gray-700"
          >
            Precio local:
          </label>
          <input
            name="priceLocal"
            type="text"
            // placeholder="Marr"
            onChange={handleChange}
            value={product.priceLocal}
            className="w-full px-3 py-2 border rounded shadow appearance-none"
          />
          <label
            htmlFor="priceNacional"
            className="block my-2 text-sm font-bold text-gray-700"
          >
            Precio Nacional:
          </label>
          <input
            name="priceNacional"
            type="text"
            // placeholder="Marr"
            onChange={handleChange}
            value={product.priceNacional}
            className="w-full px-3 py-2 border rounded shadow appearance-none"
          />
          <label
            htmlFor="priceExt"
            className="block my-2 text-sm font-bold text-gray-700"
          >
            Precio Extrangero:
          </label>
          <input
            name="priceExt"
            type="text"
            // placeholder="Marr"
            onChange={handleChange}
            value={product.priceExt}
            className="w-full px-3 py-2 border rounded shadow appearance-none"
          />
          <label
            htmlFor="descriptionProduct"
            className="block my-2 text-sm font-bold text-gray-700"
          >
            Descripción del producto:
          </label>
          <input
            name="descriptionProduct"
            type="text"
            // placeholder="Marr"
            onChange={handleChange}
            value={product.descriptionProduct}
            className="w-full px-3 py-2 border rounded shadow appearance-none"
          />
          <label
            htmlFor="stockProduct"
            className="block my-2 text-sm font-bold text-gray-700"
          >
            Stock:
          </label>
          <input
            name="stockProduct"
            type="text"
            // placeholder="Marr"
            onChange={handleChange}
            value={product.stockProduct}
            className="w-full px-3 py-2 border rounded shadow appearance-none"
          />
          <label
            htmlFor="unitsPackage"
            className="block my-2 text-sm font-bold text-gray-700"
          >
            Unidades por paquete:
          </label>
          <input
            name="unitsPackage"
            type="text"
            // placeholder="Marr"
            onChange={handleChange}
            value={product.unitsPackage}
            className="w-full px-3 py-2 border rounded shadow appearance-none"
          />
          <label
            htmlFor="published"
            className="block my-2 text-sm font-bold text-gray-700"
          >
            Visibilidad:
          </label>
          <input
            name="published"
            type="text"
            // placeholder="Marr"
            onChange={handleChange}
            value={product.published}
            className="w-full px-3 py-2 border rounded shadow appearance-none"
          />
          <label
            htmlFor="enterpriseId"
            className="block my-2 text-sm font-bold text-gray-700"
          >
            Empresa:
          </label>
          <input
            name="enterpriseId"
            type="text"
            // placeholder="Marr"
            onChange={handleChange}
            value={product.enterpriseId}
            className="w-full px-3 py-2 border rounded shadow appearance-none"
          />
          <label
            htmlFor="categories"
            className="block my-2 text-sm font-bold text-gray-700"
          >
            Categoria:
          </label>
          <input
            name="categories"
            type="text"
            // placeholder="Marr"
            onChange={handleChange}
            value={product.categories}
            className="w-full px-3 py-2 border rounded shadow appearance-none"
          />

          <label
            htmlFor="productImage"
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

export default ProductForm;
