"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Div from "../components/division";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Toast from "../components/toast";
import { getNetworkMenu, updateNetworkMenu } from "@/app/services/authService";

export default function UpdateNetworkMenu({ menuId: propMenuId }) {
  const searchParams = useSearchParams();
  const menuId = propMenuId || searchParams.get("id");

  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ message: '', type: '', visible: false });

  // Fetch menu by ID
  useEffect(() => {
    if (!menuId) return;
    const fetchMenu = async () => {
      try {
        const res = await getNetworkMenu("/network-menu");
        const currentMenu = res.find((m) => m._id === menuId);
        setMenu(currentMenu);
      } catch (err) {
        console.error(err);
         setToast({ message: 'Failed to load network menu', type: 'error', visible: true });
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, [menuId]);

  const handleParentChange = (field, value) => {
    setMenu({ ...menu, [field]: value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setSaving(true);

  try {
   const payload = {...menu};
   await updateNetworkMenu(`/network-menu/${menuId}`, payload);
   setToast({ message: 'Network Menu updated successfully!', type: 'success', visible: true });
  } catch (err) {
    console.error(err);
    setToast({ message: 'Network or server error', type: 'error', visible: true });
  } finally {
    setSaving(false);
  }
};

  return (
    <>
    <Div className='mx-auto w-full max-w-full px-[15px]'>
        <Div className="flex flex-wrap -mx-[10px]">
            <Div className="flex-none w-full p-[7px_10px]">
                <Div className="flex flex-wrap items-center justify-between bg-white border-l-[4px] border-l-[#294662] rounded-[5px] shadow-[0_0_50px_#00000008] p-[15px]">
                    <h4 className='font-bold leading-[1.2] mb-0 text-[20px]'>Update Network Menu</h4>
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
        {loading && (
          <Div className="flex justify-center items-center py-4">
            <FontAwesomeIcon icon={faSpinner} spin className="text-xl text-gray-700" />
          </Div>
        )}
        {!menu ? (
          <p className="text-center text-gray-500 py-4">Network Menu not found</p>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white w-full min-h-[calc(100vh-220px)]">
              <Div className="flex flex-wrap w-full pb-[16px] pt-[16px] px-[10px] border-b-[5px] border-[#f8f8f8]">
                <Div className="px-[10px] flex-grow mb-[7px]">
                  <label htmlFor="itemnameid" className="block text-[15px] font-medium mb-[5px]">
                    Menu Item Name <em className="text-[red]">*</em>
                  </label>
                  <input
                    id="itemnameid"
                    type="text"
                    value={menu.itemname || ""}
                    onChange={(e) => handleParentChange("itemname", e.target.value)}
                    className="block w-full border border-[#dddddd] rounded-[3px] px-[10px] py-[8px] leading-[1.4] text-[14px] font-normal font-inherit outline-none"
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
                    value={menu.slug || ""}
                    onChange={(e) => handleParentChange("slug", e.target.value)}
                    className="block w-full border border-[#dddddd] rounded-[3px] px-[10px] py-[8px] leading-[1.4] text-[14px] font-normal font-inherit outline-none"
                    required
                  />
                </Div>
                <Div className="px-[10px] flex-grow mb-[7px]">
                  <label htmlFor="itemnameindex" className="block text-[15px] font-medium mb-[5px]">
                    Index No.
                  </label>
                  <input
                    id="itemnameindex"
                    type="text"
                    value={menu.orderNum || ""}
                    onChange={(e) => handleParentChange("orderNum", e.target.value)}
                    className="block w-full border border-[#dddddd] rounded-[3px] px-[10px] py-[8px] leading-[1.4] text-[14px] font-normal font-inherit outline-none"
                  />
                </Div>
                <Div className="px-[10px] mb-[7px]">
                  <span className="block text-[15px] font-medium mb-[5px]">At Home</span>
                  <label htmlFor="menuathome" className="chkboxbtn block w-max px-[10px] py-[7px] bg-[#dedede] leading-[1] cursor-pointer">
                    <input
                      id="menuathome"
                      type="checkbox"
                      checked={menu.isActive || false} // use menu state
                      onChange={(e) =>
                        handleParentChange("isActive", e.target.checked) // update menu state
                      }
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
                      checked={menu.isExternal || false} // use menu state
                      onChange={(e) =>
                        handleParentChange("isExternal", e.target.checked) // update menu state
                      }
                      className="appearance-none relative block w-[3rem] h-[1.5rem] bg-white overflow-hidden m-0 cursor-pointer"
                    />
                  </label>
                </Div>
              </Div>
          
            <Div className="w-full bg-white border-t border-[#dddddd] pt-[14px] pr-[20px] pb-[20px] text-right">
              <button type="submit" disabled={saving} className="inline-block leading-[1] px-[20px] py-[12px] min-w-[100px] text-center border border-[#294662] font-inherit font-medium text-[15px] text-white bg-[#294662] outline-none cursor-pointer">
                {saving ? "Saving..." : "Update Menu"}
              </button>
            </Div>
          </form>
        )}
    </Div>
    </>
  );
}
