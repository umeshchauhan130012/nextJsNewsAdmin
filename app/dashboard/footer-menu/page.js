"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Toast from "../components/toast";
import Div from "../components/division";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { deleteFMenu, getFMenu, updateFMenu } from "@/app/services/authService";

export default function MenuList() {
  const router = useRouter();
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ message: '', type: '', visible: false });
  const [showPopup, setShowPopup] = useState(false); 
  const [selectedRow, setSelectedRow] = useState(null);

  const showToast = (message, type) => {
    setToast((prev) => {
      if (prev.visible && prev.message === message && prev.type === type) {
        return prev; 
      }
      return { message, type, visible: true };
    });
  };

  const confirmDelete = () => {
    if (!selectedRow) return;
    if (selectedRow.type === "parent") {
      deleteMenuApiCall(selectedRow.id);
    } else if (selectedRow.type === "child") {
      const { parentId, childIndex } = selectedRow;
      deleteApiCall(parentId, childIndex);
    }
    setSelectedRow(null);
  };

  const cancelDelete = () => {
    setShowPopup(false);
    setSelectedRow(null);
  };

  const handleChildDelete = (parentId, childIndex) => {
    setSelectedRow({ type: "child", parentId, childIndex });
    setShowPopup(true);
  };

  const handleParentDelete = (id) => {
    setSelectedRow({ type: "parent", id });
    setShowPopup(true);
  };

  // Fetch all menus
  const fetchMenus = async () => {
    setLoading(true);
    try {
      const res = await getFMenu("/footermenu");
      setMenus(res);
    } catch (err) {
      console.error(err);
      // setToast({ message: 'Failed to fetch menus', type: 'error', visible: true });
       showToast('Failed to fetch menus', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

    const handleEdit = (id) => {
    if (id) {
      router.push(`/dashboard/edit-footermenu?id=${id}`);
    } else {
      // setToast({ message: 'Invalid menu ID', type: 'error', visible: true });
      showToast('Invalid menu ID', 'error');
    }
  };

  // Delete parent menu
  const deleteMenuApiCall = async (id) => {
    setLoading(true);
    try {
      await deleteFMenu(`/footermenu/${id}`); 
      await fetchMenus();
      // setToast({ message: 'Menu deleted successfully', type: 'success', visible: true });
      showToast('Menu deleted successfully', 'success');
    } catch (err) {
      console.error(err);
      // setToast({ message: 'Network error', type: 'error', visible: true });
      showToast('Network error', 'error');
    } finally {
        setLoading(false);  
        setShowPopup(false);  
        setSelectedRow(null);  
    }  
  };

  // Delete child menu
  const deleteApiCall = async (parentId, childIndex) => {
    setLoading(true);
    try {
      const parentMenu = menus.find((m) => m._id === parentId);
      if (!parentMenu) return;
      const updatedChild = parentMenu.childmenu.filter((_, i) => i !== childIndex);
      await updateFMenu(`/footermenu/${parentId}`, { childmenu: updatedChild });
      await fetchMenus();
      // setToast({ message: 'Child menu deleted', type: 'success', visible: true });
      showToast('Child menu deleted', 'success');
    } catch (err) {
      console.error(err);
      // setToast({ message: 'Network error', type: 'error', visible: true });
      showToast('Network error', 'error');
    } finally {
        setLoading(false);  
        setShowPopup(false);  
        setSelectedRow(null);  
    } 
  };

  return (
    <>
    <Div className='mx-auto w-full max-w-full px-[15px]'>
        <Div className="flex flex-wrap -mx-[10px]">
            <Div className="flex-none w-full p-[7px_10px]">
                <Div className="flex flex-wrap items-center justify-between bg-white border-l-[4px] border-l-[#294662] rounded-[5px] shadow-[0_0_50px_#00000008] p-[15px]">
                    <h4 className='font-bold leading-[1.2] mb-0 text-[20px]'>Footer Menu List</h4>
                </Div>
            </Div>
        </Div>
    </Div>
    <Div className="p-[6px_16px_0_16px]">
      {toast.visible && (
          <Toast 
          key={toast.message}
          message={toast.message} 
          type={toast.type} 
          duration={3000} 
          onClose={() => setToast({ ...toast, visible: false })} 
          />
      )}
      <Div className="bg-white w-full p-[10px] min-h-[calc(100vh-220px)] relative">
      {loading && (
        <Div className="flex justify-center items-center py-4 absolute top-[10px] left-1/2 transform -translate-x-1/2">
          <FontAwesomeIcon icon={faSpinner} spin className="text-xl text-gray-700" />
        </Div>
      )}
      {menus.map((menu) => (
        <Div key={menu._id} className="bg-[#f0f0f0] mb-[5px] p-[5px_7px] text-[14px] flex w-full flex-wrap">
          
            <Div>{menu.itemname} <b>-- Slug:</b> {menu.slug} <b>-- Active:</b> {menu.isActive ? 'Active' : 'Inactive'} <b>-- Internal link:</b> {menu.isExternal ? 'Yes' : 'No'} <b>-- Order:</b> {menu.orderNum}
            </Div>

            <Div className="ml-auto pr-[7px]">
              <button className="bg-[#11a211] mr-1.5 rounded-[3px] text-white cursor-pointer outline-none px-1 py-1 leading-none" onClick={() => handleEdit(menu._id)}>
                <FontAwesomeIcon icon={faEdit} className="text-white cursor-pointer text-[12px]" />
              </button>
              <button className="bg-[#f90707] rounded-[3px] text-white cursor-pointer outline-none px-1 py-1 leading-none" onClick={() => handleParentDelete(menu._id)}>
                <FontAwesomeIcon icon={faTrash} className="text-white cursor-pointer text-[12px]" />
              </button>
            </Div>

          {/* Child menus */}
          <Div className="block w-full">
            {menu.childmenu.map((child, idx) => (
              <Div
                key={idx}
                className="flex w-full flex-wrap mb-[5px] px-[7px] py-[5px] text-[14px] bg-[rgba(152,152,152,0.09)] mt-[5px]"
              >
                <Div>
                 {child.title} <b>-- Url:</b> {child.link} <b>-- Status:</b> {child.isActive ? 'Active' : 'Inactive'} <b>-- Internal link:</b> {child.linkType ? 'Yes' : 'No'} <b>-- Order:</b> {child.indexNum}
                </Div>
                <Div className="ml-auto">
                  <button
                    className="bg-[#f90707] rounded-[3px] text-white cursor-pointer outline-none px-1 py-1 leading-none"
                    onClick={() => handleChildDelete(menu._id, idx)}
                  >
                    <FontAwesomeIcon icon={faTrash} className="text-white text-[12px] cursor-pointer" />
                  </button> 
                </Div>
              </Div>
            ))}
          </Div>
        </Div>
      ))}
      {showPopup && (
          <Div style={popupStyle}>
          <p className='text-[19px]'>Are you sure you want to delete?</p>
          <button className='bg-[#11a211] mr-1.5 rounded-[3px] text-white cursor-pointer outline-none px-4 py-1' onClick={confirmDelete} disabled={loading}>{loading ? <FontAwesomeIcon icon={faSpinner} spin /> : "Yes"}</button>
          <button className='bg-[#f90707] rounded-[3px] text-white cursor-pointer outline-none px-4 py-1' onClick={cancelDelete} disabled={loading}>No</button>
          </Div>
      )}
       </Div>
    </Div>
    </>
  );
}

const popupStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#ffffff',
    padding: '20px',
    boxShadow: '0px 0px 11px -3px rgb(127 127 127)',
    zIndex: '1000',
    textAlign: 'center',
    borderRadius: '10px'
  };

