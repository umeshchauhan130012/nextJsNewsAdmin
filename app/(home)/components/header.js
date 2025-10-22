"use client";
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Div from './division'

const MenuItem = [
    {
        SubMenu:false,
        MenuItemName:"Home",
        MenuItemLink:"/",
        ChildMenu:[],
    },
    {
        SubMenu:false,
        MenuItemName:"Services",
        MenuItemLink:"/services",
        MenuColCount:"2",
        MenuItemNameDetails: "Services is Best<br/> when it Brings<br/> People together.",
        MenuItemNameImg: "/menuitem.png",
        ChildMenu:[
            {
                SubMenu:true,
                MenuItemName:"Software Development",
                MenuItemLink:"/",
                ChildMenuInner:[
                    {
                        SubMenu:false,
                        MenuItemName:"Web Application Development",
                        MenuItemLink:"/services/web-application-development",
                    },
                    {
                        SubMenu:false,
                        MenuItemName:"Mobile App Development (iOS & Android)",
                        MenuItemLink:"/services/mobile-app-development-ios-and-android",
                    },
                    {
                        SubMenu:false,
                        MenuItemName:"Custom Software Development",
                        MenuItemLink:"/services/custom-software-development",
                    },
                    {
                        SubMenu:false,
                        MenuItemName:"SaaS Product Development",
                        MenuItemLink:"/services/saas-product-development",
                    },
                ],
            },
            {
                SubMenu:true,
                MenuItemName:"UI/UX Design & Product Experience",
                MenuItemLink:"/",
                ChildMenuInner:[
                    {
                        SubMenu:false,
                        MenuItemName:"Wireframing & Interactive Prototyping",
                        MenuItemLink:"/services/wireframing-and-interactive-prototyping",
                    },
                    {
                        SubMenu:false,
                        MenuItemName:"UI Design Systems & Visual Branding",
                        MenuItemLink:"/services/ui-design-systems-and-visual-branding",
                    },
                    {
                        SubMenu:false,
                        MenuItemName:"UX Research & Usability Testing",
                        MenuItemLink:"/services/ux-research-and-usability-testing",
                    },
                    {
                        SubMenu:false,
                        MenuItemName:"Cross-Platform Design (Web, iOS, Android)",
                        MenuItemLink:"/services/cross-platform-design-web-ios-android",
                    },
                    {
                        SubMenu:false,
                        MenuItemName:"Design-to-Development Handoff",
                        MenuItemLink:"/services/design-to-development-handoff",
                    },
                ],
            },
            {
                SubMenu:true,
                MenuItemName:"Quality Assurance & Testing",
                MenuItemLink:"/",
                ChildMenuInner:[
                    {
                        SubMenu:false,
                        MenuItemName:"Manual & Automated Testing",
                        MenuItemLink:"/services/manual-and-automated-testing",
                    },
                    {
                        SubMenu:false,
                        MenuItemName:"Functional & Performance Testing",
                        MenuItemLink:"/services/functional-and-performance-testing",
                    },
                    {
                        SubMenu:false,
                        MenuItemName:"Mobile & Web App Testing",
                        MenuItemLink:"/services/mobile-and-web-app-testing",
                    },
                    {
                        SubMenu:false,
                        MenuItemName:"QA Consulting",
                        MenuItemLink:"/services/qa-consulting",
                    },
                ],
            },
            {
                SubMenu:true,
                MenuItemName:"eCommerce Development",
                MenuItemLink:"/",
                ChildMenuInner:[
                    {
                        SubMenu:false,
                        MenuItemName:"Shopify / WooCommerce / Magento Development",
                        MenuItemLink:"/services/shopify-woocommerce-magento-development",
                    },
                    {
                        SubMenu:false,
                        MenuItemName:"Custom eCommerce Web Development",
                        MenuItemLink:"/services/custom-ecommerce-web-development",
                    },
                    {
                        SubMenu:false,
                        MenuItemName:"Marketplace Integration & Payment Gateway",
                        MenuItemLink:"/services/marketplace-integration-and-payment-gateway",
                    },
                    {
                        SubMenu:false,
                        MenuItemName:"Mobile Commerce (mCommerce) Solutions",
                        MenuItemLink:"/services/mobile-commerce-mcommerce-solutions",
                    },
                ],
            },
            {
                SubMenu:true,
                MenuItemName:"Low-Code / No-Code Development",
                MenuItemLink:"/",
                ChildMenuInner:[
                    {
                        SubMenu:false,
                        MenuItemName:"Web & Mobile App Development using Bubble / OutSystems",
                        MenuItemLink:"/services/web-and-mobile-app-development-using-bubble-outsystems",
                    },
                    {
                        SubMenu:false,
                        MenuItemName:"Airtable / Glide / Zapier Integrations",
                        MenuItemLink:"/services/airtable-glide-zapier-integrations",
                    },
                    {
                        SubMenu:false,
                        MenuItemName:"MVP Prototyping and Deployment",
                        MenuItemLink:"/services/mvp-prototyping-and-deployment",
                    },
                ],
            },
            {
                SubMenu:true,
                MenuItemName:"Application Support & Maintenance",
                MenuItemLink:"/",
                ChildMenuInner:[
                    {
                        SubMenu:false,
                        MenuItemName:"24/7 Monitoring & Incident Management",
                        MenuItemLink:"/services/24-7-monitoring-and-incident-management",
                    },
                    {
                        SubMenu:false,
                        MenuItemName:"Bug Fixes & Performance Optimization",
                        MenuItemLink:"/services/bug-fixes-and-performance-optimization",
                    },
                    {
                        SubMenu:false,
                        MenuItemName:"Software Upgrades & Security Patching",
                        MenuItemLink:"/services/software-upgrades-and-security-patching",
                    },
                ],
            },
        ],
    },
    {
        SubMenu:false,
        MenuItemName:"Technologies",
        MenuItemLink:"/technology",
        MenuColCount:"4",
        MenuItemNameDetails: "Technology is Best when <br/> it Brings People <br/> together.",
        MenuItemNameImg: "/menuitem.png",
        ChildMenu:[
            {
                SubMenu:true,
                MenuItemName:"Mobile App",
                MenuItemLink:"/",
                ChildMenuInner:[
                    {
                        SubMenu:false,
                        MenuItemName:"Android",
                        MenuItemLink:"/technology/android",
                    },
                    {
                        SubMenu:false,
                        MenuItemName:"Ios",
                        MenuItemLink:"/technology/ios",
                    },
                    {
                        SubMenu:false,
                        MenuItemName:"Flutter",
                        MenuItemLink:"/technology/flutter-app",
                    },
                    {
                        SubMenu:false,
                        MenuItemName:"React Native",
                        MenuItemLink:"/technology/react-native",
                    },
                ],
            },
            {
                SubMenu:true,
                MenuItemName:"Frontend",
                MenuItemLink:"/",
                ChildMenuInner:[
                    {
                        SubMenu:false,
                        MenuItemName:"React.js",
                        MenuItemLink:"/technology/react-js",
                    },
                    {
                        SubMenu:false,
                        MenuItemName:"Angular",
                        MenuItemLink:"/technology/angular-js",
                    },
                    {
                    SubMenu:false,
                    MenuItemName:"Vue.js",
                    MenuItemLink:"/technology/vue-js",
                    },
                    {
                        SubMenu:false,
                        MenuItemName:"Next.js",
                        MenuItemLink:"/technology/next-js",
                    },
                ],
            },
            {
                SubMenu:true,
                MenuItemName:"Backend",
                MenuItemLink:"/",
                ChildMenuInner:[
                    {
                        SubMenu:false,
                        MenuItemName:"Node.js",
                        MenuItemLink:"/technology/node-js",
                    },
                    {
                        SubMenu:false,
                        MenuItemName:".Net",
                        MenuItemLink:"/technology/dot-net",
                    },
                    {
                        SubMenu:false,
                        MenuItemName:"PHP",
                        MenuItemLink:"/technology/php",
                    },
                    {
                        SubMenu:false,
                        MenuItemName:"Java",
                        MenuItemLink:"/technology/java",
                    },
                    {
                        SubMenu:false,
                        MenuItemName:"Python",
                        MenuItemLink:"/technology/python",
                    },
                    {
                        SubMenu:false,
                        MenuItemName:"GoLang",
                        MenuItemLink:"/technology/golang",
                    },
                ],
            },
            {
                SubMenu:true,
                MenuItemName:"Full Stack",
                MenuItemLink:"/",
                ChildMenuInner:[
                    {
                        SubMenu:false,
                        MenuItemName:"MERN Stack",
                        MenuItemLink:"/technology/mern-stack",
                    },
                    {
                        SubMenu:false,
                        MenuItemName:"MEAN Stack",
                        MenuItemLink:"/technology/mean-stack",
                    },
                    {
                        SubMenu:false,
                        MenuItemName:"Java Full Stack",
                        MenuItemLink:"/technology/java-full-stack",
                    },
                    {
                        SubMenu:false,
                        MenuItemName:"Python Full Stack",
                        MenuItemLink:"/technology/python-full-stack",
                    },
                    {
                        SubMenu:false,
                        MenuItemName:"Next.js + NestJS",
                        MenuItemLink:"/technology/nextjs-nestjs",
                    },
                    {
                        SubMenu:false,
                        MenuItemName:"Flutter + Firebase",
                        MenuItemLink:"/technology/flutter-firebase",
                    },
                ],
            },
            {
                SubMenu:true,
                MenuItemName:"Cloud & DevOps",
                MenuItemLink:"/",
                ChildMenuInner:[
                    {
                        SubMenu:false,
                        MenuItemName:"AWS",
                        MenuItemLink:"/technology/aws",
                    },
                    {
                        SubMenu:false,
                        MenuItemName:"Azure",
                        MenuItemLink:"/technology/azure",
                    },
                    {
                        SubMenu:false,
                        MenuItemName:"GCP",
                        MenuItemLink:"/technology/gcp",
                    },
                    {
                        SubMenu:false,
                        MenuItemName:"Docker",
                        MenuItemLink:"/technology/docker",
                    },
                    {
                        SubMenu:false,
                        MenuItemName:"Kubernetes",
                        MenuItemLink:"/technology/kubernetes",
                    },
                    {
                        SubMenu:false,
                        MenuItemName:"CI/CD",
                        MenuItemLink:"/technology/ci-cd",
                    },
                ],
            },
            {
                SubMenu:true,
                MenuItemName:"AI, Data & Innovation",
                MenuItemLink:"/",
                ChildMenuInner:[
                    {
                        SubMenu:false,
                        MenuItemName:"AI & ML",
                        MenuItemLink:"/technology/ai-ml",
                    },
                    {
                        SubMenu:false,
                        MenuItemName:"Chatbots & NLP",
                        MenuItemLink:"/technology/chatbots-nlp",
                    },
                    {
                        SubMenu:false,
                        MenuItemName:"BlockChain",
                        MenuItemLink:"/technology/blockchain",
                    },
                    {
                        SubMenu:false,
                        MenuItemName:"Data Analytics",
                        MenuItemLink:"/technology/data-analytics",
                    },
                    {
                        SubMenu:false,
                        MenuItemName:"AR/VR",
                        MenuItemLink:"/technology/ar-vr",
                    },
                ],
            },
            {
                SubMenu:true,
                MenuItemName:"CMS & E-Commerce",
                MenuItemLink:"/",
                ChildMenuInner:[
                    {
                        SubMenu:false,
                        MenuItemName:"Wordpress",
                        MenuItemLink:"/technology/wordpress",
                    },
                    {
                        SubMenu:false,
                        MenuItemName:"Shopify",
                        MenuItemLink:"/technology/shopify",
                    },
                    {
                        SubMenu:false,
                        MenuItemName:"Drupal",
                        MenuItemLink:"/technology/drupal",
                    },
                    {
                        SubMenu:false,
                        MenuItemName:"Sitecore",
                        MenuItemLink:"/technology/sitecore",
                    },
                    {
                        SubMenu:false,
                        MenuItemName:"Magento",
                        MenuItemLink:"/technology/magento",
                    },
                    {
                        SubMenu:false,
                        MenuItemName:"WooCommerce",
                        MenuItemLink:"/technology/woocommerce",
                    },
                ],
            },
        ],
    },
    {
        SubMenu: false,
        MenuItemName:"Hire Developers",
        MenuItemLink:"/hire-developer",
        ChildMenu:[],
    },
    {
        SubMenu:false,
        MenuItemName:"Blogs",
        MenuItemLink:"/blog",
        ChildMenu:[],
    },
    {
        SubMenu:false,
        MenuItemName:"About Us",
        MenuItemLink:"/about",
        ChildMenu:[],
    },
    {
        SubMenu:false,
        MenuItemName:"Lets’Talk",
        MenuItemLink:"/contact",
        MenuItemButton: false,
        ChildMenu:[],
    }
];

const Header = () => {

  const [isOpen, setIsopen] = useState(false);
  const [isActive, setisActive] = useState(false);
  const [addActive, setaddActive] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  const pathname = usePathname();

  const ToggleSidebar = () => {
      isOpen === true ? setIsopen(false) : setIsopen(true);
      setisActive(false);
      setaddActive(false);
  };

  useEffect(() => {
  if (isOpen) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
  }
}, [isOpen]);

  const handleMenuClose = () => {
  setIsopen(false);
};


  const OpenMenuActive = (ind) => {
    if (isActive === ind) {
      return setisActive(null);
    }
    setisActive(ind);
  };

 
  const OpenAddActive = (childInd) => {
    if (addActive === childInd) {
      return setaddActive(null);
    }
    setaddActive(childInd);
  };

  return (
    <>
    <Div className="bg-white border-t border-b border-[#eaeaea] relative z-[99]">
        <Div className="max-w-7xl mx-auto px-3 sm:px-4 py-2">
            <Div className='flex relative items-center justify-between'>
                <ul className="m-0 p-0 list-none flex leading-[1] items-center space-x-4">
                    <li><a title="जनभावना टाइम्स" href="https://www.thejbt.com/" target="_blank">जनभावना टाइम्स</a></li>
                    <li><a title="India Daily English" href="https://topindiannews.com" target="_blank">India Daily English</a></li>
                    <li><a title=" ਇੰਡੀਆ ਡੇਲੀ ਪੰਜਾਬੀ" href="https://punjabistoryline.com" target="_blank"> ਇੰਡੀਆ ਡੇਲੀ ਪੰਜਾਬੀ</a></li>
                </ul>
                <ul className="m-0 p-0 list-none flex ml-auto leading-[1] space-x-4">
                    <li><a title="whatsapp" rel="nofollow" href="/" target="_blank" data-discover="true">WH</a></li>
                    <li><a title="facebook" rel="nofollow" href="/" target="_blank" data-discover="true">FB</a></li>
                    <li><a title="twitter" rel="nofollow" href="/" target="_blank" data-discover="true">TW</a></li>
                    <li><a title="instagram" rel="nofollow" href="/" target="_blank" data-discover="true">IN</a></li>
                    <li><a title="youtube" rel="nofollow" href="/" target="_blank" data-discover="true">YO</a></li>
                </ul>
                <button className="bg-transparent border-0 h-[25px] w-[25px] p-0 ml-[20px] cursor-pointer" aria-label="Theme mode">TH</button>
            </Div>
        </Div>
    </Div>
    <Div className="sticky z-9 top-0 left-0 right-0 max-w-[100%] w-[100%] bg-[#052438]">
      <Div className="max-w-7xl mx-auto px-3 sm:px-4 py-2">
        <Div className='flex relative items-center justify-between'>
          <Div className="text-2xl font-bold text-gray-800 relative z-11 md:static">
            <Link href="/">
              <Image alt="logo" height="46" width="100" src="/logo.png" className='filtered' />
            </Link>
          </Div>
          <nav className="hidden lg:flex items-center">
            <ul className='md:flex md:space-x-0 lg:space-x-3 items-center'>
              {MenuItem && MenuItem.length > 0 ? (
                MenuItem.map((menuVal, Ind) => {
                  const isActive = pathname === menuVal.MenuItemLink;
                  return (
                    <li className={`${menuVal.SubMenu ? "group" : ""}`} onMouseEnter={() => setActiveMenu(menuVal.MenuItemName)} onMouseLeave={() => setActiveMenu(null)} key={Ind}>

                      {menuVal.SubMenu && menuVal.SubMenu ? (
                        <Link className={`px-2 md:py-2 lg:py-3 px-1 md:px-2 lg:px-3 lg:pr-5 md:pr-4 md:text-[15px] lg:text-[16px] block hover:text-[#dddddd] cursor-pointer relative whitespace-nowrap ${isActive ? "text-[#dddddd]" : "text-[#ffffff]"}`} onClick={() => setActiveMenu(null)} href={menuVal.MenuItemLink}
                        >
                          {menuVal.MenuItemName}
                          <svg className={`absolute right-0 top-[42%] w-4 h-4 group-hover:text-[#dddddd] transition-transform duration-300 group-hover:rotate-180 ${isActive ? "text-[#dddddd]" : "text-[#ffffff]"}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </Link>
                      ) : (
                      <Link className={menuVal.MenuItemButton === true ? "px-3 md:px-3 lg:px-5 py-2 block rounded-[5px] md:text-[15px] lg:text-[16px] bg-[#dddddd] whitespace-nowrap text-white hover:text-[#ffffff] hover:bg-[#30a766]" : `px-1 md:px-2 lg:px-3 md:py-2 lg:py-3 md:text-[15px] lg:text-[16px] block hover:text-[#dddddd] whitespace-nowrap ${isActive ? "text-[#dddddd]" : "text-[#ffffff]"}`} href={menuVal.MenuItemLink}>{menuVal.MenuItemName}</Link>
                    )}
                    
                    {menuVal.SubMenu && (
                      <Div className={`absolute top-full left-0 right-0 bg-white shadow-md rounded-[15px] z-10 ${activeMenu === menuVal.MenuItemName ? "block" : "hidden"}`}>
                        <Div className='flex justify-between'>
                          <Div className='w-[20%] bg-[#dddddd] relative rounded-[15px] p-4 md:pt-[13%] lg:pt-[10%]'>
                            <span className='absolute z-0 top-0 rounded-bl-[15px] right-0 md:w-[70px] lg:w-[90px] md:h-[80px] lg:h-[120px] border border-t-0 border-r-0 left-[auto] border-white z-1'></span>
                            <h4 className='text-white text-[20px] mb-7 font-semibold'>{menuVal.MenuItemName}</h4>
                            <p className='text-white text-[17px]'><span dangerouslySetInnerHTML={{ __html: menuVal.MenuItemNameDetails }} /></p>
                            <span className='absolute z-0 top-[auto] bottom-0 rounded-tr-[15px] right-[auto] w-[95px] h-[130px] border border-l-0 border-b-0 left-0 border-white z-1'></span>
                          </Div>
                          <Div className='w-[60%] bg-[var(--light-bg)] py-5 px-2'>
                            <Div className='flex flex-wrap h-[100%]'>
                          {menuVal.ChildMenu && menuVal.ChildMenu.map((childVal, childInd) => {
                            return (
                              <Div className={ menuVal.MenuColCount === '2' ? "md:w-[50%] px-4 py-2" : menuVal.MenuColCount === '4' ? "md:w-[33.333%] lg:w-[25%] px-4 py-4" : "" } key={childInd}>
                              <h5 className='mb-3 text-[18px] font-semibold text-[var(--theme-color)]'>{childVal.MenuItemName}</h5>
                              
                              { childVal.ChildMenuInner && childVal.ChildMenuInner &&
                              <ul className="[&>*]:text-[15px] space-y-2">
                                {childVal.ChildMenuInner && childVal.ChildMenuInner.map((cInnerVal, cInnerInd) => {
                                  return (
                                    <li key={cInnerInd}>
                                      <Link href={cInnerVal.MenuItemLink} onClick={() => setActiveMenu(null)} >{cInnerVal.MenuItemName}</Link>
                                    </li>
                                  );
                                })}
                              </ul>
                            }
                              </Div>
                            );
                          })}
                          </Div>
                          </Div>
                          <Div className='w-[20%] relative z-0'>
                            <Image src="/menuitem.png" alt="menu" height="300" width="316" className='h-[100%] object-cover rounded-[15px]' />
                          </Div>
                        </Div>
                        </Div>
                      )}
                    
                      </li>
                  );
                })
              ) : (
                <li>No menu items available</li>
              )}
          </ul>
          </nav>
          
           <Div onClick={ToggleSidebar} className={` lg:hidden triggerBtn z-99 ${isOpen == true ? 'mobile-open' : ''} `}>
              <Div className="trigger1" >
                <span></span>
                <span></span>
                <span></span>
              </Div>
            </Div>
        </Div>
      </Div>
      <Div className={`custom-3d-menuactive ${isOpen == true ? 'custom-3d-menuplay' : ''}`} >
        <ul className={`custom-3d-effect ${isOpen == true ? 'custom-3d-play' : '' }`}>
          {MenuItem && MenuItem.length > 0 ? (
            MenuItem.map((menuVal, Ind) => {
              return (
                <li
                  className={`menu-item ${menuVal.SubMenu ? "has-submenu" : ""}`}
                  key={Ind}
                >
                  {menuVal.SubMenu && menuVal.SubMenu ? (
                    <span
                      className={`flex py-3 px-2 text-[15px] sm:text-[17px] text-white relative leading-tight ${isActive === Ind ? "active" : ""}`}
                      onClick={() => OpenMenuActive(Ind)}
                    >
                      {menuVal.MenuItemName}
                      <svg className={`relative top-1 left-1 w-4 h-4 text-white ${isActive === Ind ? "rotate-180" : ""} `} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  ) : (
                    <Link href={menuVal.MenuItemLink} onClick={handleMenuClose} className='block py-3 px-2 text-[15px] sm:text-[17px] text-white leading-tight'>{menuVal.MenuItemName}</Link>
                  )}

                  {menuVal.SubMenu && (
                    <ul className={`bg-[rgba(221,221,221,0.2)] pl-2 ${isActive === Ind ? "block" : "hidden"}`}>
                      {menuVal.ChildMenu && menuVal.ChildMenu.map((childVal, childInd) => {
                        return (
                          <li
                            className={`menu-item ${childVal.SubMenu ? "has-submenu" : ""}`}
                            key={childInd}
                          >
                            {childVal.SubMenu ? (
                              <span
                                className={`flex py-3 px-2 text-[15px] sm:text-[17px] text-white relative leading-tight ${addActive === childInd ? "active" : ""}`}
                                onClick={() => OpenAddActive(childInd)}
                              >
                                {childVal.MenuItemName}
                                <svg className={`relative top-1 left-1 w-4 h-4 text-white ${addActive === childInd ? "rotate-180" : ""} `} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                              </span>
                            ) : (
                              <Link href={menuVal.MenuItemLink} onClick={handleMenuClose} className='block py-3 px-2 text-[15px] sm:text-[17px] text-white leading-tight'>{childVal.MenuItemName}</Link>
                            )}
                          { childVal.ChildMenuInner && childVal.ChildMenuInner &&
                           <ul className={`bg-[rgba(221,221,221,0.1)] pl-2 ${addActive === childInd ? "block" : "hidden"}`}>
                            {childVal.ChildMenuInner && childVal.ChildMenuInner.map((cInnerVal, cInnerInd) => {
                              return (
                                <li className="menu-item" key={cInnerInd}>
                                  <Link href={cInnerVal.MenuItemLink} onClick={handleMenuClose} className='block py-3 px-2 text-[15px] sm:text-[17px] text-white leading-tight'>{cInnerVal.MenuItemName}</Link>
                                </li>
                              );
                            })}
                          </ul>
                         }
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })
          ) : (
            <li>No menu items available</li>
          )}
        </ul>
      </Div>
    </Div>
    </>
  )
}

export default Header