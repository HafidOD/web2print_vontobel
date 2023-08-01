import FormLogin from "@/components/FormLogin";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/dashboard");
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-evenly p-10 bg-gradient-to-b from-blue-700 from-1% via-white via-40% to-white to-100%">
      <div className="">
        <Image
          className=""
          src="/images/logos/Logo_web_2_print.png"
          alt="Web 2 Print Logo"
          width={180}
          height={37}
          priority
        />
      </div>
      <FormLogin></FormLogin>
      <div className="">
        <Image
          className=""
          src="/images/logos/Logo_Regio_Tachuela.png"
          alt="Web 2 Print Logo"
          width={180}
          height={37}
          priority
        />
      </div>
    </main>
  );
}
