"use client";
import React, { useEffect, useRef, useState } from 'react';
import DataTable from "react-data-table-component";
import moment from 'moment';
// import { useNavigate } from 'react-router-dom';
import Toast from '../components/toast';
import Div from '../components/division';
import { deleteTags, getTags } from '@/app/services/authService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from "next/navigation";

const TagList = () => {
  const hasFetched = useRef(false);
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false); 
  const [selectedRow, setSelectedRow] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dataRefresh, setDataRefresh] = useState(false);
  const [data, setData] = useState([]);
  const [toast, setToast] = useState({ message: '', type: '', visible: false });
  const [error, setError] = useState(null);


    const confirmDelete = () => {
      if (!selectedRow) return;
    deleteApiCall(selectedRow);
    setShowPopup(false); 
    setSelectedRow(null); 
    };

    const cancelDelete = () => {
    setShowPopup(false);
    setSelectedRow(null);
    };

    const handleEdit = (row) => {
      if (row && row) {
          router.push(`/dashboard/edit-tags?id=${row}`)
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
        selector: (row) => row.tagname,
        sortable: true,
        reorder: true,
        },
        {
        id: 2,
        name: "Tag Slug",
        selector: (row) => row.tagurl,
        reorder: true,
        },
        {
        id: 3,
        name: "Visible At home",
        selector: (row) => row.tagsathome ? 'true' : 'false',
        reorder: true,
        },
        {
        id: 4,
        name: "Status",
        selector: (row) => row.tagstatus,
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
    
    const fetchTags = async () => {
    setLoading(true);
    try {
      const response = await getTags("/tags");
      setData(response.tags);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
      hasFetched.current = true; // mark API as called
    }
  };

  useEffect(() => {
    if (!hasFetched.current || dataRefresh) {
      fetchTags();
    }
  }, [dataRefresh]);

    const deleteApiCall = async (id) => {
        setLoading(true);
        try {
            console.log("Deleting tag:", id);
            await deleteTags(`/tags/${id}`); 
            setToast({ message: 'Tag deleted successfully done!', type: 'success', visible: true });
            setDataRefresh(prev => !prev);
        } catch (err) {
            setError(err.response?.data?.error || err.error); 
        } finally {
            setLoading(false);  
            setShowPopup(false);  
            setSelectedRow(null);  
        }  
    };

    //console.log(data);

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
            {error && <Div className="text-[13px] text-[#ff3c3c] mt-[10px] leading-none">{error}</Div>}
            <Div className="mx-auto w-full max-w-full px-[15px]">
              <Div className="flex flex-wrap -mx-[10px]">
                <Div className="flex-none w-full p-[7px_10px]">
                  <Div className={'customtable-style'}>
                    <DataTable
                        title={'All Tags'}
                        columns={columns}
                        data={Array.isArray(data) ? data.slice().reverse() : []}
                        defaultSortFieldId={1}
                        pagination
                    />
                    {showPopup && (
                        <Div style={popupStyle}>
                        <p className='text-[19px]'>Are you sure you want to delete?</p>
                        <button className='bg-[#11a211] mr-1.5 rounded-[3px] text-white cursor-pointer outline-none px-4 py-1' onClick={confirmDelete} disabled={loading}>Yes</button>
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

export default TagList;
