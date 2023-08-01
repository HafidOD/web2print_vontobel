import SimpleNavbar from "@/components/SimpleNavbar";

export default function DashboardLayout({ children, params }) {
  return (
    <>
      <SimpleNavbar params={params}></SimpleNavbar>
      <main className="p-3 md:p-8">{children}</main>
    </>
  );
}
