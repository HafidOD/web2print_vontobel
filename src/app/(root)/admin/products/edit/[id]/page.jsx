"use client";
import { useRef, useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditProductPage() {
  const [product, setProduct] = useState({
    sku: "",
    nameProduct: "",
    old_imageProduct: "",
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

  const [categoryOptions, setCategryOptions] = useState([]);
  const [enterpriseOptions, setEnterpriseOptions] = useState([]);
  const handleChange = (e) => {
    if (e.target.type === "checkbox") {
      console.log(e.target.checked);
      if (e.target.checked) {
        // console.log(e.target.name);
        setProduct({
          ...product,
          [e.target.name]: [...product[e.target.name], e.target.value],
        });
      } else {
        setProduct({
          ...product,
          [e.target.name]: product[e.target.name].filter((item) => item !== e.target.value),
        });
      }
    } else {

      setProduct({
        ...product,
        [e.target.name]: e.target.value,
      });
    }
  };
  useEffect(() => {
    fetch(`/api/products/${params.id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Extraer los IDs de las empresas y establecerlos como opciones
        const categories = [];
        data.product.categories.forEach(category => {
          categories.push(category.id)
        });
        setProduct({
          sku: data.product.sku,
          nameProduct: data.product.nameProduct,
          old_imageProduct: data.product.imageProduct,
          priceLocal: data.product.priceLocal,
          priceNacional: data.product.priceNacional,
          priceExt: data.product.priceExt,
          descriptionProduct: data.product.descriptionProduct,
          stockProduct: data.product.stockProduct,
          unitsPackage: data.product.unitsPackage,
          published: data.product.published,
          enterpriseId: data.product.enterpriseId,
          categories: categories,

          // UPDATE `User` SET `password` = '$2a$12$mm75a9HEcagLhHJwDcRrBeEIaFhWMkZa1b8CXczhpvTfdLVZNzT4W' WHERE `User`.`id` = 1
        })
        // const options = data.enterprises.map((enterprise) => ({
        //   value: enterprise.id,
        //   label: enterprise.enterpriseName, // Supongamos que el nombre de la empresa se llama 'name'
        // }));
        // setEnterpriseOptions(options);
      })
      .catch((error) => {
        console.error("Error al obtener las empresas:", error);
      });
    fetch("/api/enterprises")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.enterprises);
        // Extraer los IDs de las empresas y establecerlos como opciones
        const options = data.enterprises.map((enterprise) => ({
          value: enterprise.id,
          label: enterprise.enterpriseName, // Supongamos que el nombre de la empresa se llama 'name'
        }));
        setEnterpriseOptions(options);
      })
      .catch((error) => {
        console.error("Error al obtener las empresas:", error);
      });

      fetch("/api/categories")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.enterprises);
        // Extraer los IDs de las empresas y establecerlos como opciones
        const options = data.categories.map((category) => ({
          value: category.id,
          label: category.categoryName, // Supongamos que el nombre de la empresa se llama 'name'
        }));
        setCategryOptions(options);
      })
      .catch((error) => {
        console.error("Error al obtener las categorias:", error);
      });

  }, []);
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
    formData.append("old_image", product.old_imageProduct);

    if (file) {
      formData.append("imageProduct", file);
    }

      const res = await fetch(`/api/products/${params.id}`, {
        method: "PUT",
        body: formData,
      });

      if(res.ok){

        form.current.reset();
        router.refresh();
        router.push("/admin/products/");
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
            SKU:
          </label>
          <input
            name="sku"
            type="text"
            // placeholder="Marr"
            onChange={handleChange}
            value={product.sku}
            className="w-full px-3 py-2 border rounded shadow appearance-none"
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

          <select
            name="published"
            onChange={handleChange}
            value={product.published}
            className="w-full px-3 py-2 border rounded shadow"
          >
            <option value="true">Publicado</option>
            <option value="false">Borrador</option>
          </select>

          <label
            htmlFor="enterpriseId"
            className="block my-2 text-sm font-bold text-gray-700"
          >
            Empresa:
          </label>
          <select
            name="enterpriseId"
            onChange={handleChange}
            value={product.enterpriseId}
            className="w-full px-3 py-2 border rounded shadow"
          >
            <option value="">Selecciona una empresa</option>
            {enterpriseOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <label
            htmlFor="categories"
            className="block my-2 text-sm font-bold text-gray-700"
          >
            Categoria:
          </label>
          <div className="flex flex-col space-y-2">
            {categoryOptions.map((option) => (
              <label key={option.value} className="flex items-center space-x-2">
                <input
                  name="categories"
                  type="checkbox"
                  value={option.value}
                  onChange={handleChange}
                  // checked={user.enterprises.includes(option.value)}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>

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
          {!file && (
            <img
              className="object-contain mx-auto my-4 w-96"
              src={product.old_imageProduct}
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

          <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
            {params.id ? "Actualizar" : "Crear"}
          </button>
        </form>
      </div>
    </div>
  )
}
