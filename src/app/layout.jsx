// "use client"
import ToastProvider from "@/providers/toast-providers";

// import { Inter } from 'next/font/google'
// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from "react";
// import { userContext } from '@/context/user';

import "./globals.css";
import { Providers } from "@/providers/providers";
export const metadata = {
  title: "Web 2 Print",
  description: "HOD",
};

export default function RootLayout({ children }) {
  // const [userData, setUserData] = useState({});
  // const router = useRouter();
  // const logout = function () {
  //   setUserData({});
  //   localStorage.removeItem('apiauth')
  //   router.replace('/');
  // }
  // useEffect(() => {
  //   const data = localStorage.getItem('apiauth');
  //     if (data == null) {
  //       router.replace('/')
  //       // Swal.fire('You need to login before')

  //     } else {
  //       const obj = JSON.parse(data);
  //       if (!["concierge", "admin", "admon", "sales", "operations", "manager"].includes(obj.user.role)) {
  //         router.replace('/')
  //       }

  //   }
  // }, [router])
  // useEffect(()=> {
  //   try {
  //     const data = localStorage.getItem('apiauth');
  //     if (data != null) {
  //       const obj = JSON.parse(data);
  //       setUserData(obj)
  //     }
  //   } catch (error) {
  //     console.log(err);
  //   }
  // },[])

  // const contextUserValue = {
  //   userData,
  //   setUserData: setUserData,
  //   logout: logout,
  // }
  return (
    <html lang="es">
      {/* <userContext.Provider value={contextUserValue}> */}
      <body className="min-h-screen bg-slate-100">
        <ToastProvider />
        <Providers>{children}</Providers>
      </body>
      {/* </userContext.Provider> */}
    </html>
  );
}
