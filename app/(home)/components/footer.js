"use client";
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'
import Div from './division';
import { getCopyright, getFMenu, getFooterCat, getFooterLogo } from '@/app/services/authService';
import Skeleton from 'react-loading-skeleton';
import SocialLinks from './socialmedia';

const Footer = () => {
    const [formData, setFormData] = useState({type: 'newsletter', email: '' });
    const [errors, setErrors] = useState({});
    const [footerMenu, setFooterMenu] = useState([]);
    const [footerLogo, setFooterLogo] = useState([]);
    const [copyright, setCopyright] = useState([]);
    const [footerCategory, setFooterCategory] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [logoLoading, setLogoLoading] = useState(false);
    const [menuLoading, setMenuLoading] = useState(false);
    const [copyLoading, setCopyLoading] = useState(false);
    const [footCatLoading, setFootCatLoading] = useState(false);
    const hasFetched = useRef(false);

    const logoData = footerLogo?.footerlogo?.[0];
    const copyrightData = copyright?.copyrt?.[0];

    const handleChangenews = (e) => {
      const { name } = e.target;
      setFormData({ ...formData, [e.target.name]: e.target.value });
      if (errors[name]) {
      const updatedErrors = { ...errors };
      delete updatedErrors[name];
      setErrors(updatedErrors);
    }
    };
  
    const validatenews = () => {
      const newErrors = {}
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required'
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid'
      }

      setErrors(newErrors)
      return Object.keys(newErrors).length === 0
    }
  
    const handleSubmitnews = async (e) => {
      e.preventDefault();
      setSuccessMessage('');
      setErrorMessage('');
      if (!validatenews()) return;
      setLoading(true);
      try {
          const res = await fetch('/api/utility/emailar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
          });
          const data = await res.json();
          if (data.success) {
            setSuccessMessage('✅ Email sent successfully!');
            setFormData({ type: 'newsletter', email: ''});
            setTimeout(() => setSuccessMessage(''), 3000);
          } else {
            setErrorMessage('❌ Failed to send email');
            setTimeout(() => setErrorMessage(''), 3000);
          }
        } catch (error) {
          setErrorMessage('⚠️ Something went wrong!');
          setTimeout(() => setErrorMessage(''), 3000);
        } finally {
          setLoading(false);
        }
    };

  useEffect(() => {
  if (hasFetched.current) return;
  hasFetched.current = true;

  setLogoLoading(true);
  setFootCatLoading(true);
  setMenuLoading(true);
  setCopyLoading(true);

  // Start both requests immediately
  const logoPromise = getFooterLogo("/footer-logo");
  const footerCatPromise = getFooterCat("/footercategory");
  const menuPromise = getFMenu("/footermenu");
  const copyrightPromise = getCopyright("/copyright");

  logoPromise
    .then((res) => setFooterLogo(res))
    .catch((err) => console.error("Logo error:", err))
    .finally(() => setLogoLoading(false));

  footerCatPromise
    .then((res) => setFooterCategory(res))
    .catch((err) => console.error("Footer Category error:", err))
    .finally(() => setFootCatLoading(false));

  menuPromise
    .then((res) => setFooterMenu(res))
    .catch((err) => console.error("Footer Menu error:", err))
    .finally(() => setMenuLoading(false));

  copyrightPromise
    .then((res) => setCopyright(res))
    .catch((err) => console.error("Copyright error:", err))
    .finally(() => setCopyLoading(false));

}, []);


  return (
    <footer className="bg-white text-gray-200 pt-10">
        <Div className="bg-[#052438] pt-7 pb-1.5">
            <Div className="max-w-7xl mx-auto px-3 flex flex-wrap">
                <Div className="w-[220px] pt-1.5">
                    <Div className="block mb-5 h-[54px]">
                        {logoLoading && (
                            <Skeleton className='h-[54px] opacity-10 w-[100px]' />
                        )}
                        {logoData && (
                            <Link href={logoData.logolink} className='inline-block'>
                                <Image src={logoData.filefirst.path} alt={logoData.title} width="117" height="54" className='filtered' loading="lazy" />
                            </Link>
                        )}
                    </Div>
                    <Div className="md:block pb-3">
                      <h3 className="text-white text-[18px] mb-2 sm:mb-2 md:mb-2 lg:mb-3">Newsletter SignUp!</h3>
                      <form onSubmit={handleSubmitnews} className="relative" style={{ opacity: loading ? '.5' : '1'}}>
                        <input type="email" name="email" placeholder="Your E-mail Address..." autoComplete="off" className="px-3 py-2 text-[14px] w-full sm:w-[100%] border border-[#dddddd] bg-transparent text-[#ffffff] placeholder-[#dddddd] rounded-[6px] focus:outline-none focus:ring-none mb-4" onChange={handleChangenews} value={formData.email} />
                        <button type="submit" disabled={loading} className="w-full border-2 border-[#4c81a2] rounded-[6px] bg-[#4c81a2] text-[15px] py-[8px] px-[10px] leading-[1.4]">{loading ? 'Sending...' : 'subscribe'}</button>
                        {errors.email && <p className='text-red-500 absolute left-0 top-full right-0 p-[6px]'>{errors.email}</p>}
                        {successMessage && <p className='text-green-500 absolute left-0 top-full right-0 p-[6px]'>{successMessage}</p>}
                        {errorMessage && <p className='text-red-500 absolute left-0 top-full right-0 p-[6px]'>{errorMessage}</p>}
                      </form>
                    </Div>
                    <SocialLinks height="36px" width="36px" top="3.5" bottom="3.5" />
                </Div>
                <Div className="w-[calc(100%-220px)] pl-7.5">
                    <Div className="pb-3.5">
                      {footCatLoading && (
                        <Skeleton className='h-[20px] opacity-10 w-[100px]' />
                      )}
                        {footerCategory && (
                        <ul className='m-0 -ml-[9px] p-0 list-none flex flex-wrap footermenu'>
                            {footerCategory.filter((item) => item.isActive).map((item, index) => (
                            <li key={index} className='p-[3px_5px] relative'>
                                <Link title={item.itemname} href={item.slug} target={item.isExternal ? `_blank` : `_self`} className='block no-underline text-[#f0f0f0] hover:text-[#dddddd] px-[5px] py-[2px] leading-[1.2] text-[15px] font-light'>{item.itemname}</Link>
                            </li>
                            ))}
                        </ul>
                        )}
                    </Div>
                    <Div className="pb-3.5 pt-3.5 border-t border-[#57646c]">
                      {menuLoading && (
                        <Skeleton className='h-[20px] opacity-10 w-[100px]' />
                      )}
                    {footerMenu && (
                      <ul className='m-0 -ml-[9px] p-0 list-none flex flex-wrap footermenu'>
                          {footerMenu.filter((item) => item.isActive).map((item, index) => (
                          <li key={index} className={`p-[3px_5px] relative order-${item.orderNum}`}>
                              <Link title={item.itemname} href={item.slug} target={item.isExternal ? `_blank` : `_self`} className='block no-underline text-[#f0f0f0] hover:text-[#dddddd] px-[5px] py-[2px] leading-[1.2] text-[15px] font-light'>{item.itemname}</Link>
                          </li>
                          ))}
                      </ul>
                      )}
                    </Div>
                    <Div className="w-full pt-3.5 pb-2.5 border-t border-[#57646c]">
                      {copyLoading && (
                        <Skeleton className='h-[20px] opacity-10 w-[100px]' />
                      )}
                      {copyrightData && (
                        <p className='!mb-0 text-[#f0f0f0] text-[15px] leading-[1.2] font-light'>{copyrightData.copyright}</p>
                      )}
                    </Div>
                </Div>
            </Div>
        </Div>
      </footer>
  )
}

export default Footer;