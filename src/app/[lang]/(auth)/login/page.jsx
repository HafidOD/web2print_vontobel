import FormLoginGeneric from "@/components/FormLoginGeneric";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import { redirect } from "next/navigation";
import { getDictionary } from "@/utils/dictionary";

export default async function Home({ params }) {
  // console.log(params);
  const lang = await getDictionary(params.lang);
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
      <FormLoginGeneric lang={lang} paramslang={params.lang}></FormLoginGeneric>
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
