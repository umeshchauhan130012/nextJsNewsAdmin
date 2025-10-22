"use client"; // Must be a client component
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Div from "./division";
import Header from "./header";
import Sidebar from "./sidebar";
import Footer from "./footer";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(null); 

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.push("/cmslogin");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (isAuthenticated === null) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Header />
      <Sidebar />
      <Div className="block min-h-[calc(100vh-53px)] pl-[70px] pt-[71px] transition-all duration-100 ease-out">
        <Div className="pb-[20px]">{children}</Div>
      </Div>
      <Footer />
    </>
  );
};

export default ProtectedRoute;
