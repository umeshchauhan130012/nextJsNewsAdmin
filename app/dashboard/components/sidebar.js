"use client";
import Div from "./division";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDotCircle, faTachometerAlt, faPlus, faCog } from '@fortawesome/free-solid-svg-icons';

const MenuItem = [
    {
        SubMenu: false,
        MenuItemName:"Dashboards",
        MenuItemIcon: faTachometerAlt,
        MenuItemLink:"/dashboard",
        ChildMenu:[],
    },
    {
        SubMenu:true,
        MenuItemName:"Categories",
        MenuItemIcon: faPlus,
        MenuItemLink:"/",
        ChildMenu:[
            {
                SubMenu:false,
                MenuItemName:"All Category",
                MenuItemLink:"/dashboard/category-list",
                ChildMenuInner:[],
            },
            {
                SubMenu:false,
                MenuItemName:"Add New Category",
                MenuItemLink:"/dashboard/add-category",
                ChildMenuInner:[],
            },
        ],
    },
    {
        SubMenu: true,
        MenuItemName: "Tags",
        MenuItemIcon: faPlus,
        MenuItemLink: "/",
        ChildMenu:[
            {
                SubMenu:false,
                MenuItemName:"All Tags",
                MenuItemLink:"/dashboard/tagList",
                ChildMenuInner:[],
            },
            {
                SubMenu:false,
                MenuItemName:"Add New Tag",
                MenuItemLink:"/dashboard/addTags",
                ChildMenuInner:[],
            },
        ],
    },
    {
        SubMenu: true,
        MenuItemName: "Story",
        MenuItemIcon: faPlus,
        MenuItemLink: "/",
        ChildMenu:[
              {
                  SubMenu:false,
                  MenuItemName:"All Story",
                  MenuItemLink:"/dashboard/story-list",
                  ChildMenuInner:[],
              },
              {
                  SubMenu:false,
                  MenuItemName:"Add Story",
                  MenuItemLink:"/dashboard/add-story",
                  ChildMenuInner:[],
              },
          ],
    },
    {
        SubMenu: true,
        MenuItemName: "Header Menu",
        MenuItemIcon: faPlus,
        MenuItemLink: "/",
        ChildMenu:[
              {
                  SubMenu:false,
                  MenuItemName:"All Menu",
                  MenuItemLink:"/dashboard/header-menu",
                  ChildMenuInner:[],
              },
              {
                  SubMenu:false,
                  MenuItemName:"Add Menu",
                  MenuItemLink:"/dashboard/add-headermenu",
                  ChildMenuInner:[],
              },
          ],
    }, 
        {
        SubMenu: true,
        MenuItemName: "Network Menu",
        MenuItemIcon: faPlus,
        MenuItemLink: "/",
        ChildMenu:[
              {
                  SubMenu:false,
                  MenuItemName:"All Network Menu",
                  MenuItemLink:"/dashboard/network-menu",
                  ChildMenuInner:[],
              },
              {
                  SubMenu:false,
                  MenuItemName:"Add Network Menu",
                  MenuItemLink:"/dashboard/add-networkmenu",
                  ChildMenuInner:[],
              },
          ],
    }, 
    {
        SubMenu: true,
        MenuItemName: "Footer Menu",
        MenuItemIcon: faPlus,
        MenuItemLink: "/",
        ChildMenu:[
              {
                  SubMenu:false,
                  MenuItemName:"All Menu",
                  MenuItemLink:"/dashboard/footer-menu",
                  ChildMenuInner:[],
              },
              {
                  SubMenu:false,
                  MenuItemName:"Add Menu",
                  MenuItemLink:"/dashboard/add-footermenu",
                  ChildMenuInner:[],
              },
          ],
    },
    {
        SubMenu: true,
        MenuItemName: "Footer Category",
        MenuItemIcon: faPlus,
        MenuItemLink: "/",
        ChildMenu:[
              {
                  SubMenu:false,
                  MenuItemName:"All Footer Category",
                  MenuItemLink:"/dashboard/footer-category",
                  ChildMenuInner:[],
              },
              {
                  SubMenu:false,
                  MenuItemName:"Add Footer Category",
                  MenuItemLink:"/dashboard/add-footercategory",
                  ChildMenuInner:[],
              },
          ],
    },
    {
        SubMenu: false,
        MenuItemName: "Website Settings",
        MenuItemIcon: faCog,
        MenuItemLink: "/dashboard/site-settings",
        ChildMenu:[]
    }    
];

const Sidebar = () => {

  const [bodyIsToggled, setBodyIsToggled] = useState(false);
  const handleToggleBody = () => {
    setBodyIsToggled(!bodyIsToggled);
  };

  useEffect(() => {
    if (bodyIsToggled) {
      document.body.classList.add('sidebar-activate');
    } else {
      document.body.classList.remove('sidebar-activate');
    }
    return () => {
      document.body.classList.remove('sidebar-activate');
    };
  }, [bodyIsToggled]);

 // const [isOpen, setIsopen] = useState(false);
//   const ToggleSidebar = () => {
//       isOpen === true ? setIsopen(false) : setIsopen(true);
//       setisActive(false);
//       setaddActive(false);
//   };

  const [isActive, setisActive] = useState(false);
  const OpenMenuActive = (ind) => {
    if (isActive === ind) {
      return setisActive(null);
    }
    setisActive(ind);
  };

  const [addActive, setaddActive] = useState(false);
  const OpenAddActive = (childInd) => {
    if (addActive === childInd) {
      return setaddActive(null);
    }
    setaddActive(childInd);
  };
    return (
        <aside className="custom-sidebar bg-[#294662] fixed top-0 bottom-0 w-[70px] hover:w-[250px] p-0 mt-0 shadow-[0_2px_4px_#0f223a1f] transition-all duration-100 ease-out z-[1002] group">
            <Div className="bg-white h-[70px] relative">
            <Link href="" className="block w-full max-w-[200px] pt-[11px] px-[10px] pb-[7px] transition-all duration-100"><Image src="/user.webp" alt="logo" height="60" width="90" className="rounded-full h-auto max-h-[50px] max-w-full w-auto" /></Link>
            <span className="cursor-pointer text-[20px] h-[30px] leading-[30px] opacity-0 pointer-events-none absolute right-[15px] text-center top-[calc(50%-15px)] transition-all duration-150 invisible w-[30px]" onClick={handleToggleBody}><FontAwesomeIcon icon={faDotCircle} className="text-blue-500 text-xl" /></span>
            </Div>
            <Div className="max-h-[calc(100vh-70px)] py-[20px]">
                <ul className="max-h-[calc(100vh-110px)] no-scrollbar overflow-y-auto">
                    {
                    MenuItem?.map((menuVal, Ind) => {
                        return (
                        <li className={`py-[8px] ${menuVal.SubMenu ? "has-child-menu" : ""}`} key={Ind}>
                            {
                            menuVal.SubMenu ? <a className={`flex items-start min-h-[31px] pl-[23px] pr-[31px] relative py-[5px] text-center text-white cursor-pointer ${isActive === Ind ? "active" : ""}`} onClick={() => OpenMenuActive(Ind)}><FontAwesomeIcon icon={menuVal.MenuItemIcon} className="text-[20px] min-w-[25px] text-center text-white" /><span className="hidden flex-1 pl-[12px] text-left whitespace-nowrap group-hover:inline-block">{menuVal.MenuItemName}</span></a> 
                            : <Link href={ menuVal.MenuItemLink } className="flex items-start min-h-[31px] px-[23px] py-[5px] text-center text-white cursor-pointer"><FontAwesomeIcon icon={menuVal.MenuItemIcon} className="text-[20px] min-w-[25px] text-center text-white" /><span className="hidden flex-1 pl-[12px] text-left whitespace-nowrap group-hover:inline-block">{menuVal.MenuItemName}</span></Link>
                            }
                            
                            {menuVal.SubMenu ?
                            <ul className={`child-menu-wrapper pl-[47px] ${isActive === Ind ? "active" : "hidden"}`}>
                        
                                {
                                menuVal.ChildMenu?.map((childVal, childInd) => {
                                    return (
                                    <li className={`pl-[17px] ${childVal.SubMenu ? "has-child-menu" : ""}`} key={childInd}>
                                        { childVal.SubMenu ? <a className={`pr-[17px] text-white cursor-pointer flex relative ${addActive === childInd ? "active" : ""}`} onClick={() => OpenAddActive(childInd)}><span className="hidden flex-1 pl-[12px] py-[4px] relative text-left whitespace-nowrap group-hover:inline-block">{childVal.MenuItemName}</span></a>
                                        : <Link href={childVal.MenuItemLink} className="text-white cursor-pointer flex"><span className="hidden flex-1 pl-[12px] py-[4px] relative text-left whitespace-nowrap group-hover:inline-block">{childVal.MenuItemName}</span></Link>}
                                        {childVal.SubMenu ?
                                        <ul className={`child-menu-wrapper list-none m-0 p-0 ${addActive === childInd ? "active" : "hidden"}`}>
                                        {
                                            childVal.ChildMenuInner?.map((cInnerVal, cInnerInd)=>{
                                            return(
                                                <li className={`pl-[17px]`} key={cInnerInd}><Link href={cInnerVal.MenuItemLink} className="text-white cursor-pointer flex"><span className="hidden flex-1 pl-[12px] text-left whitespace-nowrap pt-[4px] pb-[4px] relative group-hover:inline-block">{cInnerVal.MenuItemName}</span></Link></li>
                                            )
                                            })
                                        }
                                        </ul>
                                        : ""}
                                    </li>
                                    )
                                })
                                }
                        
                            </ul>
                            : ""}
                        </li>
                        )
                    })
                    }
                   </ul>
            </Div>
        </aside>
    );
}

export default Sidebar;

