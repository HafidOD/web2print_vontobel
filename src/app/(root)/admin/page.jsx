import Card from "@/components/Card";

export default function AdminPage() {
  const list = [
    {
      name: "Empresas",
      href: "admin/enterprises",
    },
    {
      name: "Direcciones",
      href: "admin/direcciones",
    },
    {
      name: "Usuarios",
      href: "admin/usuarios",
    },
    {
      name: "Categorias",
      href: "admin/categorias",
    },
    {
      name: "Productos",
      href: "admin/productos",
    },
  ];
  return (
    <div className="w-full px-2 py-8 m-auto md:w-4/5 sm:px-0">
      <div className="grid gap-3 lg:grid-cols-5 justify-items-center">
        {list.map((item) => (
          <Card key={item.name} item={item} />
        ))}
      </div>
      {/* <Enterpises enterprises={user.data.enterprises}></Enterpises> */}
    </div>
  );
}
