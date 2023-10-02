"use client";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

function PropertyForm() {
  const [property, setProperty] = useState({
    propertyName: "",
  });
  const form = useRef(null);
  const router = useRouter();

  const handleChange = (e) => {
    setProperty({
      ...property,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("propertyName", property.propertyName);

    const res = await fetch("/api/properties", {
      method: "POST",
      body: formData,
      // headers: { "Content-type": "multipart/form-data" },
    });

    if (res.ok) {
      form.current.reset();
      router.refresh();
      router.push(`/admin/properties`);
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
            Nombre de la propiedad:
          </label>
          <input
            name="propertyName"
            type="text"
            onChange={handleChange}
            value={property.propertyName}
            className="w-full px-3 py-2 border shadow appearance-none "
            autoFocus
            required
          />

          <button className="px-4 py-2 mt-4 font-bold text-white bg-primaryBlue">
            Crear
          </button>
        </form>
      </div>
    </div>
  );
}

export default PropertyForm;
