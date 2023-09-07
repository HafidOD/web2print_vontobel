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
  const options = ["Opción 1", "Opción 2", "Opción 3", "Opción 4"];
  const [file, setFile] = useState(null);
  const form = useRef(null);
  const router = useRouter();
  const params = useParams();

  const handleChange = (e) => {
    setProduct({
      ...address,
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
    formData.append("officeName", address.officeName);
    formData.append("address", address.address);
    formData.append("city", address.city);
    formData.append("country", address.country);
    formData.append("state", address.state);
    formData.append("postalCode", address.postalCode);
    formData.append("enterpriseId", address.enterpriseId);

    if (file) {
      formData.append("image", file);
    }

    if (!params.id) {
      const res = await axios.post("/api/addresses", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
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
            htmlFor="name"
            className="block mb-2 text-sm font-bold text-gray-700"
          >
            Nombre de la dirección:
          </label>
          <input
            name="officeName"
            type="text"
            onChange={handleChange}
            value={address.officeName}
            className="w-full px-3 py-2 border rounded shadow appearance-none"
            autoFocus
          />

          <label
            htmlFor="name"
            className="block my-2 text-sm font-bold text-gray-700"
          >
            Dirección:
          </label>
          <input
            name="officeName"
            type="text"
            onChange={handleChange}
            value={address.address}
            className="w-full px-3 py-2 border rounded shadow appearance-none"
          />

          <label
            htmlFor="name"
            className="block my-2 text-sm font-bold text-gray-700"
          >
            Ciudad:
          </label>
          <input
            name="ciudad"
            type="text"
            onChange={handleChange}
            value={address.city}
            className="w-full px-3 py-2 border rounded shadow appearance-none"
          />

          <label
            htmlFor="country"
            className="block my-2 text-sm font-bold text-gray-700"
          >
            Estado:
          </label>
          <input
            name="state"
            type="text"
            onChange={handleChange}
            value={address.state}
            className="w-full px-3 py-2 border rounded shadow appearance-none"
          />

          <label
            htmlFor="country"
            className="block my-2 text-sm font-bold text-gray-700"
          >
            País:
          </label>
          <input
            name="country"
            type="text"
            onChange={handleChange}
            value={address.country}
            className="w-full px-3 py-2 border rounded shadow appearance-none"
          />

          <label
            htmlFor="postalCode"
            className="block my-2 text-sm font-bold text-gray-700"
          >
            Codigo postal:
          </label>
          <input
            name="postalCode"
            type="text"
            onChange={handleChange}
            value={address.country}
            placeholder="77500"
            className="w-full px-3 py-2 border rounded shadow appearance-none"
          />

          <label
            htmlFor="users"
            className="block mt-2 text-sm font-bold text-gray-700"
          >
            Empresa:
          </label>
          {options.map((option, index) => (
            <label key={index} className="mr-5">
              <input
                type="checkbox"
                value={option}
                className="mr-1"
                // checked={selectedOptions.includes(option)}
                // onChange={handleCheckboxChange}
              />
              {option}
            </label>
          ))}

          <br />

          <button className="px-4 py-2 mt-5 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
            {params.id ? "Actualizar" : "Crear"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddressForm;
