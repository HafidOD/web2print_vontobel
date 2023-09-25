"use client";
import { useRef, useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditUserpage() {
  const form = useRef(null);
  const router = useRouter();
  const params = useParams();
  // console.log(params);
  const [user, setUser] = useState({
    propertyId: null,
    userName: "",
    email: "",
    old_password: "",
    password: "",
    telefono: "",
    enterprises: [],
    role: null, //1:admin, 2:user
    typePrice: null, //1:local, 2:nacional, 3:extrangero
    currency: "", //MXN, USD
    addresses: [],
  });

  const [enterpriseOptions, setEnterpriseOptions] = useState([]);
  const [addressOptions, setAddressOptions] = useState([]);
  const [propertyOptions, setPropertyOptions] = useState([]);

  const handleChange = (e) => {
    // console.log(e.target.type);
    if (e.target.type === "checkbox") {
      if (e.target.checked) {
        setUser({
          ...user,
          [e.target.name]: [...user[e.target.name], parseInt(e.target.value)],
        });
        // console.log(user.addresses);
      } else {
        // console.log(e.target.name);
        setUser({
          ...user,
          [e.target.name]: user[e.target.name].filter(
            (item) => item !== parseInt(e.target.value)
          ),
        });
      }
    } else {
      setUser({
        ...user,
        [e.target.name]: e.target.value,
      });
    }
    // console.log(user);
  };
  useEffect(() => {
    if (params.id) {
      fetch("/api/users/" + params.id)
        .then((response) => response.json())
        .then((data) => {
          // console.log(data.data);
          const enterprises = [];
          data.data.enterprises.forEach((enterprise) => {
            enterprises.push(enterprise.id);
          });
          const addresses = [];
          data.data.addresses.forEach((address) => {
            addresses.push(address.id);
          });
          // console.log(enterprises);
          // console.log(addresses);
          setUser({
            propertyId: data.data.propertyId,
            email: data.data.email,
            old_password: data.data.password,
            telefono: data.data.telefono,
            userName: data.data.userName,
            // enterprises: enterprises,
            enterprises: enterprises,
            role: data.data.role, //1:admin, 2:user
            typePrice: data.data.typePrice, //1:local, 2:nacional, 3:extrangero
            currency: data.data.currency, //MXN, USD
            // addresses: addresses,
            addresses: addresses,
          });
        })
        .catch((error) => {
          console.error("Error al obtener le usuario:", error);
        });

      // console.log(typeof(user.addresses));
      // console.log(user.addresses);
      // console.log(typeof(addressOptions));
      // console.log(addressOptions);
    }
    fetch("/api/properties")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.enterprises);
        // Extraer los IDs de las empresas y establecerlos como opciones
        const options = data.properties.map((property) => ({
          value: property.id,
          label: property.propertyName, // Supongamos que el nombre de la empresa se llama 'name'
        }));
        setPropertyOptions(options);
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
          label: enterprise.enterpriseName,
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
          label: address.officeName,
        }));
        setAddressOptions(options);
      })
      .catch((error) => {
        console.error("Error al obtener las direcciones:", error);
      });
  }, [params.id]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("propertyId", user.propertyId);
    formData.append("email", user.email);
    // formData.append("password", user.password);
    formData.append("telefono", user.telefono);
    formData.append("userName", user.userName);
    formData.append("enterprises", user.enterprises);
    formData.append("role", user.role);
    formData.append("typePrice", user.typePrice);
    formData.append("currency", user.currency);
    formData.append("addresses", user.addresses);
    // console.log(user.password == null);
    if (user.password == null || user.password == "") {
      // console.log("contra vacia");
      // Usar el valor antiguo de la contraseña
      formData.append("old_password", user.old_password);
    } else {
      formData.append("new_password", user.password);
    }

    const res = await fetch(`/api/users/${params.id}`, {
      method: "PUT",
      body: formData,
    });

    if (res.ok) {
      form.current.reset();
      router.refresh();
      router.push("/admin/users");
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
            htmlFor="userName"
            className="block my-2 text-sm font-bold text-primaryBlue"
          >
            Propiedad:
          </label>
          <select
            name="propertyId"
            onChange={handleChange}
            value={user.propertyId}
            className="w-full px-3 py-2 border shadow"
            required
          >
            <option value="">Selecciona propiedad</option>

            {propertyOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <label
            htmlFor="userName"
            className="block my-2 text-sm font-bold text-primaryBlue"
          >
            Nombre de usuario:
          </label>
          <input
            name="userName"
            type="text"
            placeholder="Nombre"
            onChange={handleChange}
            value={user.userName}
            className="w-full px-3 py-2 border shadow appearance-none"
            required
          />
          <label
            htmlFor="email"
            className="block my-2 text-sm font-bold text-primaryBlue"
          >
            Email:
          </label>
          <input
            name="email"
            type="email"
            placeholder="Correo electronico"
            onChange={handleChange}
            value={user.email}
            className="w-full px-3 py-2 border shadow appearance-none"
            required
            autoFocus
          />
          <label
            htmlFor="password"
            className="block my-2 text-sm font-bold text-primaryBlue"
          >
            Contraseña:
          </label>
          <input
            name="password"
            type="password"
            placeholder="Contraseña"
            onChange={handleChange}
            value={user.password}
            className="w-full px-3 py-2 border shadow appearance-none"
          />
          <label
            htmlFor="telefono"
            className="block my-2 text-sm font-bold text-primaryBlue"
          >
            Telefono:
          </label>
          <input
            name="telefono"
            type="text"
            placeholder="Telefono"
            onChange={handleChange}
            value={user.telefono}
            className="w-full px-3 py-2 border shadow appearance-none"
          />

          <label
            htmlFor="enterprises"
            className="block my-2 text-sm font-bold text-primaryBlue"
          >
            Marca:
          </label>
          <div className="flex flex-col space-y-2">
            {enterpriseOptions.map((option) => (
              <label key={option.value} className="flex items-center space-x-2">
                <input
                  name="enterprises"
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
            className="block my-2 text-sm font-bold text-primaryBlue"
          >
            Role:
          </label>
          <select
            name="role"
            onChange={handleChange}
            value={user.role}
            className="w-full px-3 py-2 border shadow"
          >
            <option value="">Selecciona tipo de usuario</option>

            <option value="2">USER</option>
            <option value="1">ADMIN</option>
          </select>

          <label
            htmlFor="typePrice"
            className="block my-2 text-sm font-bold text-primaryBlue"
          >
            Ubicación del usuario:
          </label>
          <select
            name="typePrice"
            onChange={handleChange}
            value={user.typePrice}
            className="w-full px-3 py-2 border shadow"
          >
            <option value="">Seleccionar opción</option>

            <option value="1">Local</option>
            <option value="2">Nacional</option>
            <option value="3">Extranjero</option>
          </select>

          <label
            htmlFor="currency"
            className="block my-2 text-sm font-bold text-primaryBlue"
          >
            Divisa:
          </label>
          <select
            name="currency"
            onChange={handleChange}
            value={user.currency}
            className="w-full px-3 py-2 border shadow"
            required
          >
            <option value="">Seleccionar opción</option>

            <option value="MXN">MXN</option>
            <option value="USD">USD</option>
          </select>

          <label
            htmlFor="addresses"
            className="block my-2 text-sm font-bold text-primaryBlue"
          >
            Dirección:
          </label>
          <div className="flex flex-col space-y-2">
            {addressOptions.map((option) => (
              <label key={option.value} className="flex items-center space-x-2">
                <input
                  name="addresses"
                  type="checkbox"
                  value={option.value}
                  onChange={handleChange}
                  checked={user.addresses.includes(option.value)}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>

          <button className="px-4 py-2 mt-5 font-bold text-white bg-primaryBlue">
            {params.id ? "Actualizar" : "Crear"}
          </button>
        </form>
      </div>
    </div>
  );
}
