"use client";
import React, { useEffect, useRef, useState } from 'react';
import DataTable from "react-data-table-component";
import moment from 'moment';
// import { useNavigate } from 'react-router-dom';
import Toast from '../components/toast';
import Div from '../components/division';
import { deleteStory, getStory } from '@/app/services/authService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from "next/navigation";

const StoryList = () => {
  const hasFetched = useRef(false);
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false); 
  const [selectedRow, setSelectedRow] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dataRefresh, setDataRefresh] = useState(false);
  const [data, setData] = useState([]);
  const [toast, setToast] = useState({ message: '', type: '', visible: false });


    const confirmDelete = () => {
      if (!selectedRow) return;
    deleteApiCall(selectedRow);
    setSelectedRow(null); 
    };

    const cancelDelete = () => {
    setShowPopup(false);
    setSelectedRow(null);
    };

    const handleEdit = (row) => {
      if (row && row) {
          router.push(`/dashboard/edit-story?id=${row}`)
      } else {
          console.error('Invalid row data');
      }
    };

    const handleDelete = (row) => {
    setSelectedRow(row); 
    setShowPopup(true); 
    };

    const columns = [
        {
        id: 1,
        name: "Title",
        selector: (row) => row.headline,
        sortable: true,
        reorder: true,
        },
        {
          id: 2,
          name: "Image",
          selector: (row) => (
            <img 
              src={row.filefirst && row.filefirst.path ? `${row.filefirst.path}` : '/user.png'}
              alt={row.alt} 
              style={{ width: '50px', height: '50px', borderRadius: '5px', objectFit: 'cover' }} 
            />
          ),
          reorder: true,
        },
        {
        id: 4,
        name: "News Type",
        selector: (row) => (row.liveblog ? "Live Blog" : "News"),
        reorder: true,
        },
        {
        id: 5,
        name: "Runtime (m)",
        selector: (row) => moment(row.uploadDate).format('DD-MM-YYYY'),
        sortable: true,
        reorder: true,
        },
        {
        id: 6,
        name: "Actions",
        selector: (row) => (
            <>
              <button type="button" className='bg-[#11a211] mr-1.5 rounded-[3px] text-white cursor-pointer outline-none px-2 py-1.5' onClick={() => handleEdit(row._id)}><FontAwesomeIcon icon={faPencil} /></button>
              <button type="button" className='bg-[#f90707] rounded-[3px] text-white cursor-pointer outline-none px-2 py-1.5' onClick={() => handleDelete(row._id)}><FontAwesomeIcon icon={faTrash} /></button>
            </>
          ),
          ignoreRowClick: true,
          allowoverflow: true,
        },
      ];
    
  const fetchStory = async () => {
    setLoading(true);
    try {
      const response = await getStory("/story");
      setData(response.story);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
      hasFetched.current = true; 
    }
  };

  useEffect(() => {
    if (!hasFetched.current || dataRefresh) {
      fetchStory();
    }
  }, [dataRefresh]);

    const deleteApiCall = async (id) => {
        setLoading(true);
        try {
            await deleteStory(`/story/${id}`); 
            setToast({ message: 'Story deleted successfully done!', type: 'success', visible: true });
            setDataRefresh(prev => !prev);
        } catch (err) {
             const errorMessage = err.response?.data?.error || err.message || "Something went wrong";
             setToast({ message: errorMessage, type: 'error', visible: true });
        } finally {
            setLoading(false);   
            setSelectedRow(null);  
            setShowPopup(false);
        }  
    };                                    

    console.log(data);

    return (
        <>
            {toast.visible && (
                <Toast 
                message={toast.message} 
                type={toast.type} 
                duration={3000} 
                onClose={() => setToast({ ...toast, visible: false })} 
                />
            )}
            
            <Div className="mx-auto w-full max-w-full px-[15px]">
              <Div className="flex flex-wrap -mx-[10px]">
                <Div className="flex-none w-full p-[7px_10px]">
                  <Div className={'customtable-style'}>
                    <DataTable
                        title={'All Story'}
                        columns={columns}
                        data={Array.isArray(data) ? data.slice().reverse() : []}
                        defaultSortFieldId={1}
                        pagination
                    />
                    {showPopup && (
                        <Div style={popupStyle}>
                        <p className='text-[19px]'>Are you sure you want to delete?</p>
                        <button className='bg-[#11a211] mr-1.5 rounded-[3px] text-white cursor-pointer outline-none px-4 py-1' onClick={confirmDelete} disabled={loading}>{loading ? <FontAwesomeIcon icon={faSpinner} spin /> : "Yes"}</button>
                        <button className='bg-[#f90707] rounded-[3px] text-white cursor-pointer outline-none px-4 py-1' onClick={cancelDelete} disabled={loading}>No</button>
                        </Div>
                    )}
                  </Div>
                </Div>
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

export default StoryList;
