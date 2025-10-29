"use client";
import { createHMenu } from "@/app/services/authService";
import React, { useState } from "react";
import Div from "../components/division";
import Toast from "../components/toast";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function AddHeaderMenu() {
  const [itemname, setItemname] = useState("");
  const [slug, setSlug] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [isStatus, setIsStatus] = useState(false);
  const [isExternal, setIsExternal] = useState(false);
  const [orderNum, setOrderNum] = useState("");
  const [childMenus, setChildMenus] = useState([{ title: "", link: "", isActive: false, linkType: false, indexNum: "",}, ]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: '', type: '', visible: false });

  // Add a new child menu field
  const addChildMenu = () => {
    setChildMenus([
      ...childMenus,
      {
        title: "",
        link: "",
        isActive: false,
        linkType: false,
        indexNum: "",
      },
    ]);
  };
  // Remove a specific child menu field
  const removeChildMenu = (index) => {
    setChildMenus(childMenus.filter((_, i) => i !== index));
  };

  // Handle change in child menu field
  const handleChildChange = (index, field, value) => {
    const updated = [...childMenus];
    updated[index][field] = value;
    setChildMenus(updated);
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      itemname,
      slug,
      isActive,
      isStatus,
      isExternal,
      orderNum,
      childmenu: childMenus.filter(
        (child) => child.title.trim() && child.link.trim()
      ),
    };
    try {
       await createHMenu("/headermenu", payload);
        setToast({ message: 'Menu Added successfully done!', type: 'success', visible: true });
        setItemname("");
        setSlug("");
        setIsActive(false);
        setIsStatus(false);
        setIsExternal(false);
        setOrderNum("");
        setChildMenus([{ title: "", link: "", isActive: false, linkType: false, indexNum: "",}]);
      
    } catch (err) {
      console.error(err);
      setToast({ message: 'Network or server error.', type: 'error', visible: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Div className='mx-auto w-full max-w-full px-[15px]'>
        <Div className="flex flex-wrap -mx-[10px]">
            <Div className="flex-none w-full p-[7px_10px]">
                <Div className="flex flex-wrap items-center justify-between bg-white border-l-[4px] border-l-[#294662] rounded-[5px] shadow-[0_0_50px_#00000008] p-[15px]">
                    <h4 className='font-bold leading-[1.2] mb-0 text-[20px]'>Add Header Menu</h4>
                </Div>
            </Div>
        </Div>
    </Div>
    <Div className="p-[6px_16px_0_16px]">
      {toast.visible && (
          <Toast 
          message={toast.message} 
          type={toast.type} 
          duration={3000} 
          onClose={() => setToast({ ...toast, visible: false })} 
          />
      )}
      <form onSubmit={handleSubmit} className="bg-white w-full min-h-[calc(100vh-220px)]">
        <Div className="flex flex-wrap w-full pb-[16px] pt-[16px] px-[10px] border-b-[5px] border-[#f8f8f8]">
           <Div className="px-[10px] flex-grow mb-[7px]">
            <label htmlFor="itemnameid" className="block text-[15px] font-medium mb-[5px]">
              Menu Item Name <em className="text-[red]">*</em>
            </label>
            <input
              id="itemnameid"
              type="text"
              value={itemname}
              onChange={(e) => setItemname(e.target.value)}
              className="block w-full border border-[#dddddd] rounded-[3px] px-[10px] py-[8px] leading-[1.4] text-[14px] font-normal font-inherit outline-none"
              placeholder="Menu Item Name"
              required
            />
          </Div>
          <Div className="px-[10px] flex-grow mb-[7px]">
            <label htmlFor="itemnameurl" className="block text-[15px] font-medium mb-[5px]">
              Url <em className="text-[red]">*</em>
            </label>
            <input
              id="itemnameurl"
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="block w-full border border-[#dddddd] rounded-[3px] px-[10px] py-[8px] leading-[1.4] text-[14px] font-normal font-inherit outline-none"
              placeholder="/slug.."
              required
            />
          </Div>
          <Div className="px-[10px] mb-[7px]">
            <label htmlFor="itemnameindex" className="block text-[15px] font-medium mb-[5px]">
              Index No.
            </label>
            <input
              id="itemnameindex"
              type="text"
              value={orderNum}
              onChange={(e) => setOrderNum(e.target.value)}
              className="block w-full border border-[#dddddd] rounded-[3px] px-[10px] py-[8px] leading-[1.4] text-[14px] font-normal font-inherit outline-none"
              placeholder="1,2,3..."
              required
            />
          </Div>
          <Div className="px-[10px] mb-[7px]">
            <span className="block text-[15px] font-medium mb-[5px]">At Home</span>
            <label htmlFor="menuathome" className="chkboxbtn block w-max px-[10px] py-[7px] bg-[#dedede] leading-[1] cursor-pointer">
              <input
                id="menuathome"
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="appearance-none relative block w-[3rem] h-[1.5rem] bg-white overflow-hidden m-0 cursor-pointer"
              />
            </label>
          </Div>
          <Div className="px-[10px] mb-[7px]">
            <span className="block text-[15px] font-medium mb-[5px]">Is Active</span>
            <label htmlFor="statusad" className="chkboxbtn block w-max px-[10px] py-[7px] bg-[#dedede] leading-[1] cursor-pointer">
              <input
                id="statusad"
                type="checkbox"
                checked={isStatus}
                onChange={(e) => setIsStatus(e.target.checked)}
                className="appearance-none relative block w-[3rem] h-[1.5rem] bg-white overflow-hidden m-0 cursor-pointer"
              />
            </label>
          </Div>
          <Div className="px-[10px] mb-[7px]">
            <span className="block text-[15px] font-medium mb-[5px]">Internal link</span>
            <label htmlFor="external" className="chkboxbtn block w-max px-[10px] py-[7px] bg-[#dedede] leading-[1] cursor-pointer">
              <input
                id="external"
                type="checkbox"
                checked={isExternal}
                onChange={(e) => setIsExternal(e.target.checked)}
                className="appearance-none relative block w-[3rem] h-[1.5rem] bg-white overflow-hidden m-0 cursor-pointer"
              />
            </label>
          </Div>
        </Div>

        <Div className="w-full pb-[16px] pt-[16px] px-[10px]">
          <h3 className="px-[10px] flex-grow mb-[10px] text-lg font-medium text-gray-800 border-b-[3px] border-[#dddddd]">
            Child Menus
          </h3>
          
          {childMenus.map((child, index) => (
            <Div key={index} className="flex flex-wrap">
              <Div className="px-[10px] flex-grow mb-[7px]">
                <label htmlFor={`child-name-${index}`} className="block text-[15px] font-small mb-[5px]">Item Name</label>
                <input
                  id={`child-name-${index}`}
                  type="text"
                  placeholder="Child Item Name"
                  value={child.title || ""}
                  onChange={(e) => handleChildChange(index, "title", e.target.value)}
                  className="block w-full border border-[#dddddd] rounded-[3px] px-[10px] py-[8px] leading-[1.4] text-[14px] font-normal font-inherit outline-none"
                />
              </Div>
              <Div className="px-[10px] flex-grow mb-[7px]">
                <label htmlFor={`child-uri-${index}`} className="block text-[15px] font-small mb-[5px]">Url</label>
                <input
                  id={`child-uri-${index}`}
                  type="text"
                  placeholder="/child slug.."
                  value={child.link}
                  onChange={(e) => handleChildChange(index, "link", e.target.value)}
                  className="block w-full border border-[#dddddd] rounded-[3px] px-[10px] py-[8px] leading-[1.4] text-[14px] font-normal font-inherit outline-none"
                />
              </Div>
              <Div className="px-[10px] mb-[7px]">
                <label htmlFor={`child-ind-${index}`} className="block text-[15px] font-small mb-[5px]">Index No.</label>
                <input
                  id={`child-ind-${index}`}
                  type="text"
                  placeholder="Index 1,2,3.."
                  value={child.indexNum || ""}
                  onChange={(e) => handleChildChange(index, "indexNum", e.target.value)}
                  className="block w-full border border-[#dddddd] rounded-[3px] px-[10px] py-[8px] leading-[1.4] text-[14px] font-normal font-inherit outline-none"
                />
              </Div>
              {/* isActive checkbox */}
              <Div className="px-[10px] mb-[7px]">
                <span className="block text-[15px] font-small mb-[5px]">Is Active</span>
                <label htmlFor={`child-active-${index}`} className="chkboxbtn block w-max px-[10px] py-[7px] bg-[#dedede] leading-[1] cursor-pointer">
                  <input
                    id={`child-active-${index}`}
                    type="checkbox"
                    checked={child.isActive}
                    onChange={(e) => handleChildChange(index, "isActive", e.target.checked)}
                    className="appearance-none relative block w-[3rem] h-[1.5rem] bg-white overflow-hidden m-0 cursor-pointer"
                  />
                </label>
              </Div>
              <Div className="px-[10px] mb-[7px]">
                <span className="block text-[15px] font-small mb-[5px]">Internal link</span>
                <label htmlFor={`child-link-${index}`} className="chkboxbtn block w-max px-[10px] py-[7px] bg-[#dedede] leading-[1] cursor-pointer">
                  <input
                    id={`child-link-${index}`}
                    type="checkbox"
                    checked={child.linkType}
                    onChange={(e) => handleChildChange(index, "linkType", e.target.checked)}
                    className="appearance-none relative block w-[3rem] h-[1.5rem] bg-white overflow-hidden m-0 cursor-pointer"
                  />
                </label>
              </Div>
              {childMenus.length > 1 && (
                <Div className="px-[10px] mb-[7px]">
                  <span className="block text-[15px] font-small mb-[5px]">Trash</span>
                  <button type="button" onClick={() => removeChildMenu(index)} className="bg-[#f90707] rounded-[3px] text-white cursor-pointer outline-none px-2 h-[38px]">
                    <FontAwesomeIcon icon={faTrash} className="text-white cursor-pointer" />
                  </button>
                </Div>
              )}
            </Div>
          ))}
          <Div className="text-right px-4">
             <button type="button" onClick={addChildMenu} className="cursor-pointer text-blue-600 text-sm hover:underline mt-1">+ Add another child menu</button>
          </Div>
        </Div>
        <Div className="w-full bg-white border-t border-[#dddddd] pt-[14px] pr-[20px] pb-[20px] text-right">
          <button
            type="submit"
            disabled={loading}
            className="inline-block leading-[1] px-[20px] py-[12px] min-w-[100px] text-center border border-[#294662] font-inherit font-medium text-[15px] text-white bg-[#294662] outline-none cursor-pointer"
          >
            {loading ? "Saving..." : "Save Header Menu"}
          </button>
        </Div>
      </form>
    </Div>
    </>
  );
}
