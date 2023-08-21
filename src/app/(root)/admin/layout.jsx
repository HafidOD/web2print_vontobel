import NavbarAdmin from "@/components/NavbarAdmin";

export default function AdminLayout({ children, params }) {
  return (
    <>
      <NavbarAdmin />
      <main className="p-3 md:p-8">{children}</main>
    </>
  );
}
