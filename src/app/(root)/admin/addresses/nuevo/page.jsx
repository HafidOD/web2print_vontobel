"use client";
import { useRef, useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

function AddressForm() {
  const [address, setAddress] = useState({
    officeName: "",
    address: "",
    city: "",
    country: "",
    state: "",
    postalCode: null,
    enterpriseId: null,
  });
  const [enterpriseOptions, setEnterpriseOptions] = useState([]);

  const form = useRef(null);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    // Hacer una solicitud fetch para obtener las empresas
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
  }, []);

  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("officeName", address.officeName);
    formData.append("address", address.address);
    formData.append("city", address.city);
    formData.append("country", address.country);
    formData.append("state", address.state);
    formData.append("postalCode", address.postalCode);
    formData.append("enterpriseId", address.enterpriseId);

    if (!params.id) {
      const res = await fetch("/api/addresses", {
        method: "POST",
        body: formData,
      });
      console.log(res);
    } else {
      const res = await axios.put("/api/products/" + params.id, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    }

    form.current.reset();
    router.refresh();
    router.push("/admin/addresses/");
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
            htmlFor="name"
            className="block mb-2 text-sm font-bold text-primaryBlue"
          >
            Nombre de la dirección:
          </label>
          <input
            name="officeName"
            type="text"
            onChange={handleChange}
            value={address.officeName}
            className="w-full px-3 py-2 border shadow appearance-none"
            autoFocus
          />

          <label
            htmlFor="address"
            className="block my-2 text-sm font-bold text-primaryBlue"
          >
            Dirección:
          </label>
          <input
            name="address"
            type="text"
            onChange={handleChange}
            value={address.address}
            className="w-full px-3 py-2 border shadow appearance-none"
          />

          <label
            htmlFor="city"
            className="block my-2 text-sm font-bold text-primaryBlue"
          >
            Ciudad:
          </label>
          <input
            name="city"
            type="text"
            onChange={handleChange}
            value={address.city}
            className="w-full px-3 py-2 border shadow appearance-none"
          />

          <label
            htmlFor="country"
            className="block my-2 text-sm font-bold text-primaryBlue"
          >
            Estado:
          </label>
          <input
            name="state"
            type="text"
            onChange={handleChange}
            value={address.state}
            className="w-full px-3 py-2 border shadow appearance-none"
          />

          <label
            htmlFor="country"
            className="block my-2 text-sm font-bold text-primaryBlue"
          >
            País:
          </label>
          <input
            name="country"
            type="text"
            onChange={handleChange}
            value={address.country}
            className="w-full px-3 py-2 border shadow appearance-none"
          />

          <label
            htmlFor="postalCode"
            className="block my-2 text-sm font-bold text-primaryBlue"
          >
            Codigo postal:
          </label>
          <input
            name="postalCode"
            type="text"
            onChange={handleChange}
            value={address.postalCode}
            placeholder="77500"
            className="w-full px-3 py-2 border shadow appearance-none"
          />

          <label
            htmlFor="users"
            className="block my-2 text-sm font-bold text-primaryBlue"
          >
            Empresa:
          </label>
          <select
            name="enterpriseId"
            onChange={handleChange}
            value={address.enterpriseId}
            className="w-full px-3 py-2 border shadow"
          >
            <option value="">Selecciona una empresa</option>
            {enterpriseOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <button className="px-4 py-2 mt-4 font-bold text-white bg-primaryBlue">
            {params.id ? "Actualizar" : "Crear"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddressForm;
