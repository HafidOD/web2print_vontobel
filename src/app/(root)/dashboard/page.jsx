import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import Enterpises from "@/components/Enterpises";

const URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchUser(id) {
  const res = await fetch(`${URL}/users/${id}`, {cache: "no-cache"});
  const user = await res.json();
  // console.log(user);
  return user;
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  // console.log(session.user);
  if (!session) return;
  const user = await fetchUser(session.user.id);
  // console.log(user);
  return (
    <div className="w-3/5 px-2 py-16 m-auto sm:px-0">
      <h3 className="mb-5 text-xl font-medium text-center text-gray-700">
              ¡Bienvenido a nuestra plataforma de gestión de inventarios! Simplifica y controla tu inventario.
            </h3>
      <Enterpises enterprises={user.data.enterprises}></Enterpises>
    </div>
  );
}
