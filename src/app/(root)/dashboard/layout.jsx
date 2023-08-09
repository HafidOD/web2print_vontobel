import Navbar from "@/components/Navbar";

export default function DashboardLayout({ children, params }) {
  return (
    <>
      <Navbar></Navbar>
      <main className="p-3 md:p-8">{children}</main>
    </>
  );
}
