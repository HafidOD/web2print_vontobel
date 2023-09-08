"use client";
import { useRef, useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

function UserForm() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    telefono: "",
    userName: "",
    enterprises: [],
    role: null, //1:admin, 2:user
    typePrice: null, //1:local, 2:nacional, 3:extrangero
    currency: "", //MXN, USD
    addresses: [],
  });

  const form = useRef(null);
  const router = useRouter();
  const params = useParams();

  const [enterpriseOptions, setEnterpriseOptions] = useState([]);
  const [addressOptions, setAddressOptions] = useState([]);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

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

    // Hacer una solicitud fetch para obtener las direcciones
    fetch("/api/addresses")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.addresses);
        // Mapear los datos de las direcciones para obtener opciones
        const options = data.addresses.map((address) => ({
          value: address.id,
          label: address.officeName, // Supongamos que el nombre de la dirección se llama 'name'
        }));
        setAddressOptions(options);
      })
      .catch((error) => {
        console.error("Error al obtener las direcciones:", error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("telefono", user.telefono);
    formData.append("userName", user.userName);
    formData.append("enterprises", user.enterprises);
    formData.append("role", user.role);
    formData.append("typePrice", user.typePrice);
    formData.append("currency", user.currency);
    formData.append("addresses", user.addresses);

    if (!params.id) {
      const res = await fetch("/api/users", {
        method: "POST",
        body: formData,
      });
    } else {
      const res = await axios.put("/api/products/" + params.id, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    }

    // form.current.reset();
    // router.refresh();
    // router.push("/admin/users");
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
            htmlFor="email"
            className="block mb-2 text-sm font-bold text-gray-700"
          >
            Email:
          </label>
          <input
            name="email"
            type="email"
            placeholder="Correo electronico"
            onChange={handleChange}
            value={user.email}
            className="w-full px-3 py-2 border rounded shadow appearance-none"
            autoFocus
          />
          <label
            htmlFor="password"
            className="block my-2 text-sm font-bold text-gray-700"
          >
            Contraseña:
          </label>
          <input
            name="password"
            type="password"
            placeholder="Contraseña"
            onChange={handleChange}
            value={user.password}
            className="w-full px-3 py-2 border rounded shadow appearance-none"
          />
          <label
            htmlFor="telefono"
            className="block my-2 text-sm font-bold text-gray-700"
          >
            Telefono:
          </label>
          <input
            name="telefono"
            type="text"
            placeholder="Telefono"
            onChange={handleChange}
            value={user.telefono}
            className="w-full px-3 py-2 border rounded shadow appearance-none"
          />
          <label
            htmlFor="userName"
            className="block my-2 text-sm font-bold text-gray-700"
          >
            Nombre:
          </label>
          <input
            name="userName"
            type="text"
            placeholder="Nombre"
            onChange={handleChange}
            value={user.userName}
            className="w-full px-3 py-2 border rounded shadow appearance-none"
          />

          <label
            htmlFor="enterpriseId"
            className="block my-2 text-sm font-bold text-gray-700"
          >
            Empresas:
          </label>
          {/* <select
            name="enterpriseId"
            onChange={handleChange}
            value={user.enterpriseId}
            className="w-full px-3 py-2 border rounded shadow"
          >
            <option value="">Selecciona una empresa</option>
            {enterpriseOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select> */}
          <div className="flex flex-col space-y-2">
            {enterpriseOptions.map((option) => (
              <label key={option.value} className="flex items-center space-x-2">
                <input
                  name="enterpriseId"
                  type="checkbox"
                  value={option.value}
                  onChange={handleChange}
                  checked={user.enterprises.includes(option.value)}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>

          <label
            htmlFor="role"
            className="block my-2 text-sm font-bold text-gray-700"
          >
            Role:
          </label>
          <select
            name="role"
            onChange={handleChange}
            value={user.role}
            className="w-full px-3 py-2 border rounded shadow"
          >
            <option value="">Selecciona tipo de usuario</option>

            <option value="2">USER</option>
            <option value="1">ADMIN</option>
          </select>

          <label
            htmlFor="typePrice"
            className="block my-2 text-sm font-bold text-gray-700"
          >
            Ubicación del usuario:
          </label>
          <select
            name="typePrice"
            onChange={handleChange}
            value={user.typePrice}
            className="w-full px-3 py-2 border rounded shadow"
          >
            <option value="">Seleccionar opción</option>

            <option value="1">Local</option>
            <option value="2">Nacional</option>
            <option value="3">Extrangero</option>
          </select>

          <label
            htmlFor="currency"
            className="block my-2 text-sm font-bold text-gray-700"
          >
            Divisa:
          </label>
          <select
            name="currency"
            onChange={handleChange}
            value={user.currency}
            className="w-full px-3 py-2 border rounded shadow"
          >
            <option value="">Seleccionar opción</option>

            <option value="MXN">MXN</option>
            <option value="USD">USD</option>
          </select>

          <label
            htmlFor="addresses"
            className="block my-2 text-sm font-bold text-gray-700"
          >
            Dirección:
          </label>
          {/* <input
            name="addresses"
            type="text"
            placeholder="addresses"
            onChange={handleChange}
            value={user.addresses}
            className="w-full px-3 py-2 border rounded shadow appearance-none"
          /> */}
          <div className="flex flex-col space-y-2">
            {addressOptions.map((option) => (
              <label key={option.value} className="flex items-center space-x-2">
                <input
                  name="addressId"
                  type="checkbox"
                  value={option.value}
                  onChange={handleChange}
                  checked={user.addresses.includes(option.value)}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>

          <button className="px-4 py-2 mt-5 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
            {params.id ? "Actualizar" : "Crear"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserForm;
