import Card from "@/components/Card";

export default function AdminPage() {
  const list = [
    {
      name: "Propiedades",
      href: "admin/properties",
    },
    {
      name: "Marcas",
      href: "admin/enterprises",
    },
    {
      name: "Direcciones",
      href: "admin/addresses",
    },
    {
      name: "Usuarios",
      href: "admin/users",
    },
    {
      name: "Divisiones",
      href: "admin/categories",
    },
    {
      name: "Productos",
      href: "admin/products",
    },
  ];
  return (
    <div className="w-full px-2 py-8 m-auto md:w-4/5 sm:px-0">
      <div className="grid gap-3 lg:grid-cols-5 justify-items-center">
        {list.map((item) => (
          <Card key={item.name} item={item} />
        ))}
      </div>
    </div>
  );
}
