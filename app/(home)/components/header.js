"use client";
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { memo, useEffect, useRef, useState } from 'react'
import Div from './division'
import { getHeaderLogo, getHMenu, getSocialmedia } from '@/app/services/authService';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import SocialLinks from './socialmedia';

const Header = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [headerMenu, setHeaderMenu] = useState([]);
  const [headerLogo, setHeaderLogo] = useState([]);
  const [loading, setLoading] = useState(true);
  const hasFetched = useRef(false);

  const logoData = headerLogo?.headerlogo?.[0];

   useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [logoRes, menuRes] = await Promise.all([
          getHeaderLogo("/header-logo"),
          getHMenu("/headermenu"),
        ]);
        setHeaderLogo(logoRes);
        setHeaderMenu(menuRes);
      } catch (err) {
        console.error("Error fetching header data:", err);
      } finally {
        setLoading(false);
      }
    };
    if (!hasFetched.current) {
      fetchData();
      hasFetched.current = true;
    }
  }, []);

  const MenuItem = memo(({ item, activeMenu, setActiveMenu }) => {
  const isActive = usePathname() === item.slug;
  return (
    <li className={`${item.childmenu ? "group relative" : ""}`} onMouseEnter={() => setActiveMenu(item.itemname)} onMouseLeave={() => setActiveMenu(null)}>
      {item.childmenu?.length > 0 ? (
        <Link className={`px-2 py-2 pr-5 block hover:text-gray-300 cursor-pointer relative whitespace-nowrap ${isActive ? "text-gray-300" : "text-white"}`} onClick={() => setActiveMenu(null)} href={item.slug}
        >
          {item.itemname}
          <svg className={`absolute right-0 top-[30%] w-4 h-4 group-hover:text-gray-300 transition-transform duration-300 group-hover:rotate-180 ${isActive ? "text-gray-300" : "text-white"}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </Link>
      ) : (
      <Link className={`block px-2 py-2 hover:text-gray-300  ${isActive ? "text-gray-300" : "text-white"}`} href={item.slug}>
        {item.itemname}
      </Link>
      )}

      {item.childmenu?.length > 0 && (
        <ul className={`absolute top-full left-0 bg-white shadow-md rounded-[2px] z-10 py-2 w-[160px] ${activeMenu === item.itemname ? "block" : "hidden"}`}>
          {item.childmenu.map((child, ind) => (
            <li key={ind}>
              <Link href={child.link} className="block px-2 py-1 text-[#333333] leading-[1.3] text-[15px] hover:text-[#052438]">{child.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
});
 
  return (
    <>
    <Div className="bg-white border-t border-b border-[#eaeaea] relative z-[99]">
        <Div className="max-w-7xl mx-auto px-3 sm:px-4 py-1">
            <Div className='flex relative items-center justify-between min-h-[20px]'>
                <ul className="m-0 p-0 pt-1 list-none flex leading-[1] items-center space-x-4 text-[14px]">
                    <li><a title="जनभावना टाइम्स" href="https://www.thejbt.com/" target="_blank" className="block" >जनभावना टाइम्स</a></li>
                    <li><a title="India Daily English" href="https://topindiannews.com" target="_blank" className="block" >India Daily English</a></li>
                    <li><a title=" ਇੰਡੀਆ ਡੇਲੀ ਪੰਜਾਬੀ" href="https://punjabistoryline.com" target="_blank" className="block" > ਇੰਡੀਆ ਡੇਲੀ ਪੰਜਾਬੀ</a></li>
                </ul>
                <SocialLinks height="20px" width="20px" top="0" bottom="0" />
            </Div>
        </Div>
    </Div>
    <Div className="sticky z-9 top-0 left-0 right-0 max-w-[100%] w-[100%] bg-[#052438]">
      <Div className="max-w-7xl mx-auto px-3 sm:px-4 py-1">
        <Div className='flex relative items-center justify-between'>
          <Div className="text-2xl font-bold text-gray-800 relative z-11 md:static w-[100px] h-[46px]">
          {loading && (
              <Skeleton className='h-[39px] opacity-10 w-[100px]' />
          )}
          {logoData && (
              <Link href={logoData.logolink}>
                  <Image src={logoData.filefirst.path} alt={logoData.title} width="100" height="46" className='filtered' loading="lazy"/>
              </Link>
          )}
            {/* <Link href="/">
              <Image alt="logo" height="46" width="100" src="/logo.png" className='filtered' />
            </Link> */}
          </Div>
          <nav className="hidden lg:flex items-center">
            <ul className='md:flex md:space-x-0 lg:space-x-3 items-center'>
              {loading && (
                <li className='flex [&>span]:flex-1 [&>span]:m-2 [&>span]:w-20'><Skeleton className='h-[20px] opacity-10' /> <Skeleton className='h-[20px] opacity-10' /> <Skeleton className='h-[20px] opacity-10' /> <Skeleton className='h-[20px] opacity-10' /></li>
              )}
              {headerMenu && headerMenu.map((item, ind) => (
                <MenuItem key={ind} item={item} activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
              ))}
              
            </ul>
          </nav>
          
           <Div className={` lg:hidden triggerBtn z-99`}>
              <Div className="trigger1" >
                <span></span>
                <span></span>
                <span></span>
              </Div>
            </Div>
        </Div>
      </Div>
    </Div>
    </>
  )
}

export default Header