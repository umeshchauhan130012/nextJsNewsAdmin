"use client";
import { createFooterCat } from "@/app/services/authService";
import React, { useState } from "react";
import Div from "../components/division";
import Toast from "../components/toast";

export default function AddFooterCat() {
  const [itemname, setItemname] = useState("");
  const [slug, setSlug] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [isExternal, setIsExternal] = useState(false);
  const [orderNum, setOrderNum] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: '', type: '', visible: false });


  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      itemname,
      slug,
      isActive,
      isExternal,
      orderNum,
    };
    try {
       await createFooterCat("/footercategory", payload);
        setToast({ message: 'Menu Added successfully done!', type: 'success', visible: true });
        setItemname("");
        setSlug("");
        setIsActive(false);
        setIsExternal(false);
        setOrderNum("");
      
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
                    <h4 className='font-bold leading-[1.2] mb-0 text-[20px]'>Add Footer Category</h4>
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

        <Div className="w-full bg-white border-t border-[#dddddd] pt-[14px] pr-[20px] pb-[20px] text-right">
          <button
            type="submit"
            disabled={loading}
            className="inline-block leading-[1] px-[20px] py-[12px] min-w-[100px] text-center border border-[#294662] font-inherit font-medium text-[15px] text-white bg-[#294662] outline-none cursor-pointer"
          >
            {loading ? "Saving..." : "Save Footer Category"}
          </button>
        </Div>
      </form>
    </Div>
    </>
  );
}
