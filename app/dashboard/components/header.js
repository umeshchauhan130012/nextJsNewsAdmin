"use client";
import { useRouter } from "next/navigation";
import Div from "./division";
import Toast from "./toast";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { profileGet } from "@/app/services/authService";

export default function Header() {
    const router = useRouter();
    const [toast, setToast] = useState({ message: '', type: '', visible: false });
    const [userData, setUserData] = useState([]);


    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setTimeout(() => router.push('/cmslogin'), 100)
        setToast({ message: 'Logout successfully!', type: 'success', visible: true });
    };



    useEffect(() => {
      const fetchData = async () => {
        try {
            const token = localStorage.getItem("authToken");
            if (!token) {
             setTimeout(() => router.push('/cmslogin'), 100)
            return;
            }
          const response = await profileGet('/profile');
           setUserData(response);
        } catch (error) {
           setToast({ message: error.error || "Something went wrong!", type: "error", visible: true,});
          if (error.response?.status === 401) {
            localStorage.removeItem("authToken");
             setTimeout(() => router.push('/cmslogin'), 100)
            }
        }
      };
      fetchData();
    }, []); 


    return (
        <header className="fixed top-0 left-0 right-0 pl-[70px] transition-all duration-100 ease-out z-[100]">
            {toast.visible && (
                <Toast 
                message={toast.message} 
                type={toast.type} 
                duration={3000} 
                onClose={() => setToast({ ...toast, visible: false })} 
                />
            )}
            <Div className="bg-white border-b border-[#e9ebec]">
                <Div className="mx-auto max-w-full px-[15px] w-full">
                    <Div className="flex flex-wrap -mx-[10px]">
                        {/* <Div className="custom-search-container">
                            <form className="custom-search-block">
                                <input type="text" className="custom-form-control" placeholder="Search..." autoComplete="off" />
                                <button type="submit" className="search-button-icon"><i className="fa fa-search"></i></button>
                            </form>
                        </Div> */}
                        <ul className="flex items-center justify-end flex-1 list-none m-0 px-[15px]">
                            <li className="py-[15px] relative group">
                                <button className="flex items-center bg-transparent border-none text-[#1f2f3e] cursor-pointer min-h-[40px] outline-none px-[15px] text-left w-full">
                                    <Image src="/user.webp" alt="user" height="50" width="50" className="rounded-full h-auto max-w-[40px]" />
                                    <span className="inline-block relative cursor-pointer pl-[10px]">
                                        <span className="block text-[#1f2f3e] cursor-pointer text-[13px] font-semibold tracking-[0.3px]">Umesh Chauhan</span>
                                        <em className="block text-[#afafaf] text-[10px] font-semibold not-italic tracking-[0.6px]">cumesh5432@gmail.com</em>
                                    </span>
                                </button>
                                <ul className="bg-white shadow-[0_0_20px_#59667a1a] list-none m-0 min-w-[190px] opacity-0 p-[5px_10px] absolute right-0 top-full translate-y-[30px] transition-all duration-300 ease-linear invisible z-[8] group-hover:opacity-100 group-hover:visible group-hover:translate-y-0">
                                    <li>
                                        <button className="bg-transparent border-b border-[#eee] text-[#1f2f3e] cursor-pointer block outline-none p-[10px] text-left w-full text[14px] leading-[1]"><FontAwesomeIcon icon={faUser} className="text-gray-700 text-[14px]" /><span className="pl-2">Account</span></button>
                                    </li>
                                    <li>
                                        <button className="bg-transparent border-b border-[#eee] text-[#1f2f3e] cursor-pointer block outline-none p-[10px] text-left w-full text[14px] leading-[1]"><FontAwesomeIcon icon={faCog} className="text-gray-700 text-[14px]" /><span className="pl-2">Settings</span></button>
                                    </li>
                                    <li>
                                        <button onClick={handleLogout} className="bg-transparent border-none text-[#1f2f3e] cursor-pointer block outline-none p-[10px] text-left w-full text[14px] leading-[1]"><FontAwesomeIcon icon={faSignOutAlt} className="text-gray-700 text-[14px]" /><span className="pl-2">Log Out</span></button>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </Div>
                </Div>
            </Div>
        </header>
    );
}
