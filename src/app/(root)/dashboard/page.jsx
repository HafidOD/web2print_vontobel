import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import Enterpises from "@/components/Enterpises";

const URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchUser(id) {
  const res = await fetch(`${URL}/users/${id}`, { cache: "no-cache" });
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
    <div className="w-full px-2 py-16 m-auto md:w-3/5 sm:px-0">
      <section>
        <h3 className="text-3xl font-medium text-center text-primaryBlue">
          ¡Bienvenido <span className="font-bold">{user.data.userName}</span> a
          nuestra
        </h3>
        <h3 className="mb-5 text-3xl font-bold text-center text-primaryBlue">
          plataforma de gestión de inventario!
        </h3>
        <p className="text-xl text-right text-secondGray">
          - Simplifica y controla tu inventario.
        </p>
      </section>
      <section className="mt-16 md:mt-20">
        <Enterpises enterprises={user.data.enterprises}></Enterpises>
      </section>
    </div>
  );
}
