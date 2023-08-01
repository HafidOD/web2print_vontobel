import FormLogin from "@/components/FormLogin";
import Image from "next/image";

export default function Home() {
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
