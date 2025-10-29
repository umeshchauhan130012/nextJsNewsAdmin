"use client";
import React, { useEffect, useMemo, useState } from 'react';
import Toast from '../components/toast';
import Div from '../components/division';
import { useForm } from 'react-hook-form';
import { getCopyright, getFooterLogo, getHeaderLogo, getSocialmedia, putCopyright, putFooterLogo, putHeaderLogo, updateSocialmedia } from '@/app/services/authService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faTrash } from '@fortawesome/free-solid-svg-icons';

const SiteSettings = () => {
    const [toast, setToast] = useState({ message: '', type: '', visible: false });

    const [showPopupHLogo, setShowPopupHLogo] = useState(false); 
    const [hLogodata, setHLogodata] = useState([]);
    const [logohead, setLogoHead] = useState(null);
    const [categoryFileName, setCategoryFileName] = useState('');
    const [getHLogoId, setGetHLogoId] = useState(null);
    const [borderRedCat, setBorderRedCat] = useState(false);
    const [loading, setLoading] = useState(false);
    const [dataRefresh, setDataRefresh] = useState(false);
    const memoizedGetHLogoId = useMemo(() => getHLogoId, [getHLogoId]);
    const { register: registerForm1, handleSubmit: handleSubmitForm1, formState: { errors: errorsForm1 }, setValue: setValueForm1 } = useForm();

    const [showPopupFLogo, setShowPopupFLogo] = useState(false); 
    const [fLogodata, setFLogodata] = useState([]);
    const [logoFoot, setLogoFoot] = useState(null);
    const [categoryFileNameFoot, setCategoryFileNameFoot] = useState('');
    const [getFLogoId, setGetFLogoId] = useState(null);
    const [loadingFlogo, setLoadingFlogo] = useState(false);
    const [dataFRefresh, setDataFRefresh] = useState(false);
    const memoizedGetFLogoId = useMemo(() => getFLogoId, [getFLogoId]);
    const { register: registerForm2, handleSubmit: handleSubmitForm2, formState: { errors: errorsForm2 }, setValue: setValueForm2 } = useForm();

    const [copyrightData, setCopyrightData] = useState([]);
    const [copyrightId, setCopyrightId] = useState(null);
    const [copyrightPopup, setCopyrightPopup] = useState(false);
    const [copyLoading, setCopyLoading] = useState(false);
    const [copyDataRefresh, setCopyDataRefresh] = useState(false);
    const memoizedGetCopyId = useMemo(() => copyrightId, [copyrightId]);
    const { register: registerForm3, handleSubmit: handleSubmitForm3, setValue: setValueForm3 } = useForm();


    //   const searchParams = useSearchParams();
    //   const menuId = propMenuId || searchParams.get("id");
      const [socialMedia, setSocialMedia] = useState([]);
      const [socialId, setSocialId] = useState(null);
      const [socialPopup, setSocialPopup] = useState(false);
      const [menu, setMenu] = useState(null);
      const [socialLoading, setSocialLoading] = useState(false);
      const [saving, setSaving] = useState(false);
      const memoizedGetSocialId = useMemo(() => socialId, [socialId]);
     


    const handleEditHLogo = async (idget) => {
        setGetHLogoId(idget)
        setShowPopupHLogo(true);
    }
    const handleCloseHLogo = async () => {
        setShowPopupHLogo(false);
    }

    const handleCategoryFileChange=(e)=>{
        if (e.target.files.length > 0) {
            let fileFull = e.target.files[0];
             if (fileFull instanceof File) {
                const filePath = URL.createObjectURL(fileFull);
                setLogoHead(fileFull);
                setCategoryFileName(filePath);
                setBorderRedCat(false);
            }
        }
    }
    useEffect(() => {
        const fetchHLogoData = async () => {
            try {
                const response = await getHeaderLogo('/header-logo');
                setHLogodata(response.headerlogo);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };
        fetchHLogoData();
    }, []);
    useEffect(() => {
        if (!memoizedGetHLogoId) return;
        const fetchDataById = async () => {
            try {
            const response = await getHeaderLogo(`/header-logo/${getHLogoId}`);
            setValueForm1("title", response?.headlogo?.title || '');
            setValueForm1("logolink", response?.headlogo?.logolink || '');
            const imageUrl1 = `${response?.headlogo?.filefirst?.path}`;
            setCategoryFileName(imageUrl1)
            } catch (error) {
            console.error('Failed to fetch data by ID:', error);
            }
        };
        fetchDataById();
    }, [memoizedGetHLogoId, dataRefresh]);

    const onSubmitHlogo = async (data) => {
        setLoading(true);
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("logolink", data.logolink);
        if (logohead) {
            formData.append("filefirst", logohead);
        }
        try {
            await putHeaderLogo(`/header-logo/${getHLogoId}`, formData);
            setToast({ message: 'gallery Updated successfully!', type: 'success', visible: true });
            setLoading(false);
            setDataRefresh(prev => !prev);
        } catch (error) {
            console.error("Error:", error);
            setToast({ message: 'An error occurred while adding the gallery.efwefwe', type: 'error', visible: true });
        } finally {
            setLoading(false);
            setShowPopupHLogo(false)
        } 
    };

// footer logo

    const handleEditFLogo = async (idget) => {
        setGetFLogoId(idget)
        setShowPopupFLogo(true);
    }
    const handleCloseFLogo = async () => {
        setShowPopupFLogo(false);
    }

    const handleCategoryFileChange2=(e)=>{
        if (e.target.files.length > 0) {
            let fileFull = e.target.files[0];
             if (fileFull instanceof File) {
                const filePath = URL.createObjectURL(fileFull);
                setLogoFoot(fileFull);
                setCategoryFileNameFoot(filePath);
                setBorderRedCat(false);
            }
        }
    }
    useEffect(() => {
        const fetchHLogoData = async () => {
            try {
                const response = await getFooterLogo('/footer-logo');
                setFLogodata(response.footerlogo);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };
        fetchHLogoData();
    }, []);
    useEffect(() => {
        if (!memoizedGetFLogoId) return;
        const fetchDataById = async () => {
            try {
            const response = await getFooterLogo(`/footer-logo/${getFLogoId}`);
            setValueForm2("title", response?.footlogo?.title || '');
            setValueForm2("logolink", response?.footlogo?.logolink || '');
            const imageUrl1 = `${response?.footlogo?.filefirst?.path}`;
            setCategoryFileNameFoot(imageUrl1)
            } catch (error) {
            console.error('Failed to fetch data by ID:', error);
            }
        };
        fetchDataById();
    }, [memoizedGetFLogoId, dataFRefresh]);

    const onSubmitFlogo = async (data) => {
        setLoadingFlogo(true);
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("logolink", data.logolink);
        if (logoFoot) {
            formData.append("filefirst", logoFoot);
        }
        try {
            await putFooterLogo(`/footer-logo/${getFLogoId}`, formData);
            setToast({ message: 'gallery Updated successfully!', type: 'success', visible: true });
            setLoadingFlogo(false);
            setDataFRefresh(prev => !prev);
        } catch (error) {
            console.error("Error:", error);
            setToast({ message: 'An error occurred while adding the gallery.efwefwe', type: 'error', visible: true });
        } finally {
            setLoadingFlogo(false);
            setShowPopupFLogo(false)
        } 
    };

    // copyright

    const handleEditCopy = async (gtcopyId) => {
        setCopyrightId(gtcopyId);
        setCopyrightPopup(true);
    }
    const handleCloseCopyPopup = async () => {
        setCopyrightPopup(false)
    }
    useEffect(() => {
        const copyrightData = async () => {
            try {
                const apiResponse = await getCopyright('/copyright');
                setCopyrightData(apiResponse.copyrt);
            } catch(error) {
                 console.error('Copyright data not fetch', error)
            }
        };
        copyrightData();
    }, []);

    useEffect(() => {
        if (!memoizedGetCopyId) return;
        const copyrightDataId = async () => {
            try {
                const apiResponse = await getCopyright(`/copyright/${copyrightId}`);
                setValueForm3("copyright", apiResponse?.copyrt?.copyright || '');
            } catch(error) {
                 console.error('Copyright data not fetch', error)
            }
        };
        copyrightDataId();
    }, [copyrightId, copyDataRefresh]);
    
    const onSubmitCopyright = async (data) => {
        setCopyLoading(true);
        const formDataCopy = new FormData();
        formDataCopy.append("copyright", data.copyright);
        try {
            await putCopyright(`/copyright/${copyrightId}`, formDataCopy);
            setToast({ message: 'Copyright Updated successfully!', type: 'success', visible: true });
            setCopyLoading(false);
            setCopyDataRefresh(prev => !prev);
        } catch (error) {
            console.error("Error:", error);
            setToast({ message: 'An error occurred while update data', type: 'error', visible: true });
        } finally {
            setCopyLoading(false);
            setCopyrightPopup(false)
        } 
    };
 
    //  social media links

    const handleEditSocial = async (socialId) => {
        setSocialId(socialId);
        setSocialPopup(true);
    }

    const handleClosesocialPopup = async () => {
        setSocialPopup(false)
    }
    
     const fetchSocial = async () => {
        setSocialLoading(true);
        try {
          const res = await getSocialmedia("/social-media");
          setSocialMedia(res);
        } catch (err) {
          console.error(err);
           showToast('Failed to fetch Social', 'error');
        } finally {
          setSocialLoading(false);
        }
      };
    
      useEffect(() => {
        fetchSocial();
      }, []);


      useEffect(() => {
        if (!memoizedGetSocialId) return;
        const fetchMenu = async () => {
          try {
            const res = await getSocialmedia("/social-media");
            const currentMenu = res.find((m) => m._id === socialId);
            setMenu(currentMenu);
          } catch (err) {
            console.error(err);
             setToast({ message: 'Failed to load menu', type: 'error', visible: true });
          } finally {
            
          }
        };
        fetchMenu();
      }, [socialId]);
    
      const handleParentChange = (field, value) => {
        setMenu({ ...menu, [field]: value });
      };
    
      const handleChildChange = (index, field, value) => {
        const updatedChild = [...menu.childmenu];
        updatedChild[index][field] = value;
        setMenu({ ...menu, childmenu: updatedChild });
      };
    
      const addChildMenu = () => {
        setMenu({ ...menu, childmenu: [...menu.childmenu, { childitem: "", slug: "" }] });
      };
    
      const removeChildMenu = (index) => {
        const updatedChild = menu.childmenu.filter((_, i) => i !== index);
        setMenu({ ...menu, childmenu: updatedChild });
      };
    
      const handleSubmit = async (e) => {
      e.preventDefault();
      setSaving(true);
    
      try {
        const payload = {
          ...menu,
          childmenu: menu.childmenu || [],
        };
       await updateSocialmedia(`/social-media/${socialId}`, payload);
       fetchSocial();
       setToast({ message: 'Social media updated successfully!', type: 'success', visible: true });
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
                        <h4 className='font-bold leading-[1.2] mb-0 text-[20px]'>Site Logo & Copyright</h4>
                    </Div>
                </Div>
            </Div>
        </Div>
        {toast.visible && (
            <Toast 
            message={toast.message} 
            type={toast.type} 
            duration={3000} 
            onClose={() => setToast({ ...toast, visible: false })} 
            />
        )}
        <Div className="flex flex-wrap pt-[6px] px-[16px] pb-0">
            <Div className="flex flex-wrap bg-white px-[10px] py-[16px] w-1/3">
                <Div className="w-full px-[10px]">
                    <h3 className="text-[18px] font-bold text-[#294662] border-b-[5px] border-b-[rgba(151,151,151,0.07)] mt-0 mb-[20px] pb-[7px]">Header logo</h3>
                </Div>
                <Div className="w-full flex flex-wrap items-start">
                    { hLogodata && hLogodata?.map((item, ind) => (
                    <Div className="w-full px-[10px]" key={ind}>
                        <Div className="mb-[15px]">
                            <Div className='block relative min-h-[150px]' onClick={() => handleEditHLogo(item._id)} >
                                <label className='m-0 px-[17px] py-[25px] flex flex-col items-center justify-center border-[3px] border-dotted border-[#a3a3a3] rounded-[5px] cursor-pointer text-[15px]'>
                                    <span className="text-[19px] font-medium text-[#2e2e2e] text-center">If you can change the logo</span>
                                    <span className="text-[12px] text-[#a3a3a3] pt-[14px] pb-[18px] block"></span>
                                    <span className="no-underline bg-[#4b7bd2] text-white px-[20px] py-[10px] border-0 outline-none inline-block leading-[1] rounded-[2px] transition duration-300">Click here</span>
                                </label>
                            </Div>
                        </Div>
                    </Div>
                    ))}
                </Div>
                { showPopupHLogo && (
                <Div style={popupStylefull}>
                    <Div style={popupStylefullinner}>
                        <form onSubmit={handleSubmitForm1(onSubmitHlogo)} className="w-full flex flex-wrap items-start">
                            <Div className="w-full px-[10px]">
                                <Div className="mb-[15px]">
                                    <label className='block text-[15px] font-medium mb-[5px]'>Logo image<em>*</em></label>
                                    <Div className='block relative min-h-[150px]'>
                                        <label htmlFor="categoryfile" className='m-0 p-[25px] px-[17px] flex items-center justify-center flex-col border-[3px] border-dotted border-[#a3a3a3] rounded-md cursor-pointer' style={borderRedCat && borderRedCat ? { borderColor: 'red',backgroundColor: '#fff2f2'} : {}} >
                                            <span className="text-[19px] font-medium text-[#2e2e2e] text-center">{categoryFileName && categoryFileName ? <img src={categoryFileName} alt="thumb" width={100} height={47} /> : <FontAwesomeIcon icon={faSpinner} spin className="text-3xl" /> }</span>
                                            <span className="text-[12px] text-[#a3a3a3] pt-[14px] pb-[18px] block">Files Supported: jpeg, jpg, png, pdf, doc, docx</span>
                                            <span className="no-underline bg-[#4b7bd2] text-white px-5 py-[10px] border-0 outline-none transition duration-300 inline-block leading-none rounded-sm">Browse</span>
                                        </label>
                                        <input type="file" name="categoryfile" id="categoryfile" className='opacity-0 absolute inset-0 w-full h-full cursor-pointer' onChange={handleCategoryFileChange} />
                                    </Div>
                                </Div>
                            </Div>
                            <Div className="w-1/2 px-[10px]">
                                <Div className="mb-[15px]">
                                    <label className='block text-[15px] font-medium mb-[5px]'>Logo link</label>
                                    <input className="block w-full px-[10px] py-[8px] text-[14px] font-normal leading-[1.4] border border-[#ddd] rounded-[3px] outline-none font-inherit" type="text" {...registerForm1("logolink")} />
                                </Div>
                            </Div>
                            <Div className="w-1/2 px-[10px]">
                                <Div className="mb-[15px]">
                                    <label className='block text-[15px] font-medium mb-[5px]'>Logo alt <em>*</em></label>
                                    <input className="block w-full px-[10px] py-[8px] text-[14px] font-normal leading-[1.4] border border-[#ddd] rounded-[3px] outline-none font-inherit" type="text" {...registerForm1("title", { required: 'This field is required' })} />
                                    {errorsForm1.title && <span className="error-message">{errorsForm1.title.message}</span>}
                                </Div>
                            </Div>
                            <Div className="w-full px-[10px]">
                                <button type="submit" className='inline-block leading-[1] px-[20px] py-[12px] min-w-[100px] text-center border border-[#294662] font-inherit font-medium text-[15px] text-white bg-[#294662] outline-none cursor-pointer hover:opacity-90 hover:text-white' disabled={loading}>{loading && loading ? 'Loading...' : 'Submit Now'}</button>
                                <button type="button" className='inline-block leading-[1] px-[20px] py-[12px] min-w-[100px] text-center border border-[#f90707] font-inherit font-medium text-[15px] text-white bg-[#f90707] outline-none cursor-pointer mx-[10px] hover:opacity-90 hover:text-white' onClick={() => handleCloseHLogo()}>Cancel</button>
                            </Div>
                        </form>
                    </Div>
                </Div>
                )}
            </Div>
            <Div className="flex flex-wrap bg-white px-[10px] py-[16px] w-1/3 border-l border-r border-[#ddd]">
                <Div className="w-full px-[10px]">
                    <h3 className="text-[18px] font-bold text-[#294662] border-b-[5px] border-b-[rgba(151,151,151,0.07)] mt-0 mb-[20px] pb-[7px]">Footer logo</h3>
                </Div>
                <Div className="w-full flex flex-wrap items-start">
                    { fLogodata && fLogodata?.map((item, ind) => (
                    <Div className="w-full px-[10px]" key={ind}>
                        <Div className="mb-[15px]">
                            <Div className='block relative min-h-[150px]' onClick={() => handleEditFLogo(item._id)} >
                                <label className='m-0 px-[17px] py-[25px] flex flex-col items-center justify-center border-[3px] border-dotted border-[#a3a3a3] rounded-[5px] cursor-pointer text-[15px]'>
                                    <span className="text-[19px] font-medium text-[#2e2e2e] text-center">If you can change the logo</span>
                                    <span className="text-[12px] text-[#a3a3a3] pt-[14px] pb-[18px] block"></span>
                                    <span className="no-underline bg-[#4b7bd2] text-white px-[20px] py-[10px] border-0 outline-none inline-block leading-[1] rounded-[2px] transition duration-300">Click here</span>
                                </label>
                            </Div>
                        </Div>
                    </Div>
                    ))}
                </Div>
                { showPopupFLogo && (
                <Div style={popupStylefull}>
                    <Div style={popupStylefullinner}>
                        <form onSubmit={handleSubmitForm2(onSubmitFlogo)} className="w-full flex flex-wrap items-start">
                            <Div className="w-full px-[10px]">
                                <Div className="mb-[15px]">
                                    <label className='block text-[15px] font-medium mb-[5px]'>Logo image<em>*</em></label>
                                    <Div className='block relative min-h-[150px]'>
                                        <label htmlFor="categoryfile" className='m-0 p-[25px] px-[17px] flex items-center justify-center flex-col border-[3px] border-dotted border-[#a3a3a3] rounded-md cursor-pointer' style={borderRedCat && borderRedCat ? { borderColor: 'red',backgroundColor: '#fff2f2'} : {}} >
                                            <span className="text-[19px] font-medium text-[#2e2e2e] text-center">{categoryFileNameFoot && categoryFileNameFoot ? <img src={categoryFileNameFoot} alt="thumb" width={100} height={47} /> : <FontAwesomeIcon icon={faSpinner} spin className="text-3xl" /> }</span>
                                            <span className="text-[12px] text-[#a3a3a3] pt-[14px] pb-[18px] block">Files Supported: jpeg, jpg, png, pdf, doc, docx</span>
                                            <span className="no-underline bg-[#4b7bd2] text-white px-5 py-[10px] border-0 outline-none transition duration-300 inline-block leading-none rounded-sm">Browse</span>
                                        </label>
                                        <input type="file" name="categoryfile" id="categoryfile" className='opacity-0 absolute inset-0 w-full h-full cursor-pointer' onChange={handleCategoryFileChange2} />
                                    </Div>
                                </Div>
                            </Div>
                            <Div className="w-1/2 px-[10px]">
                                <Div className="mb-[15px]">
                                    <label className='block text-[15px] font-medium mb-[5px]'>Logo link</label>
                                    <input className="block w-full px-[10px] py-[8px] text-[14px] font-normal leading-[1.4] border border-[#ddd] rounded-[3px] outline-none font-inherit" type="text" {...registerForm2("logolink")} />
                                </Div>
                            </Div>
                            <Div className="w-1/2 px-[10px]">
                                <Div className="mb-[15px]">
                                    <label className='block text-[15px] font-medium mb-[5px]'>Logo alt <em>*</em></label>
                                    <input className="block w-full px-[10px] py-[8px] text-[14px] font-normal leading-[1.4] border border-[#ddd] rounded-[3px] outline-none font-inherit" type="text" {...registerForm2("title", { required: 'This field is required' })} />
                                    {errorsForm2.title && <span className="error-message">{errorsForm2.title.message}</span>}
                                </Div>
                            </Div>
                            <Div className="w-full px-[10px]">
                                <button type="submit" className='inline-block leading-[1] px-[20px] py-[12px] min-w-[100px] text-center border border-[#294662] font-inherit font-medium text-[15px] text-white bg-[#294662] outline-none cursor-pointer hover:opacity-90 hover:text-white' disabled={loadingFlogo}>{loadingFlogo && loadingFlogo ? 'Loading...' : 'Submit Now'}</button>
                                <button type="button" className='inline-block leading-[1] px-[20px] py-[12px] min-w-[100px] text-center border border-[#f90707] font-inherit font-medium text-[15px] text-white bg-[#f90707] outline-none cursor-pointer mx-[10px] hover:opacity-90 hover:text-white' onClick={() => handleCloseFLogo()}>Cancel</button>
                            </Div>
                        </form>
                    </Div>
                </Div>
                )}
            </Div>
            <Div className="flex flex-wrap bg-white px-[10px] py-[16px] w-1/3">
                <Div className="w-full px-[10px]">
                    <h3 className="text-[18px] font-bold text-[#294662] border-b-[5px] border-b-[rgba(151,151,151,0.07)] mt-0 mb-[20px] pb-[7px]">Copyright here</h3>
                </Div>
                <Div className="w-full flex flex-wrap items-start">
                    {copyrightData && copyrightData.map((itemcopy, ind) => (
                    <Div className="w-full px-[10px]" key={ind}>
                        <Div className="mb-[15px]">
                            <Div className='block relative min-h-[150px]' onClick={() => handleEditCopy(itemcopy._id)}>
                                <label className='m-0 px-[17px] py-[25px] flex flex-col items-center justify-center border-[3px] border-dotted border-[#a3a3a3] rounded-[5px] cursor-pointer text-[15px]'>
                                    <span className="text-[19px] font-medium text-[#2e2e2e] text-center">Change here copyright</span>
                                    <span className="text-[12px] text-[#a3a3a3] pt-[14px] pb-[18px] block"></span>
                                    <span className="no-underline bg-[#4b7bd2] text-white px-[20px] py-[10px] border-0 outline-none inline-block leading-[1] rounded-[2px] transition duration-300">Click here</span>
                                </label>
                            </Div>
                        </Div>
                    </Div>
                    ))}
                </Div>
                { copyrightPopup && (
                <Div style={popupStylefull}>
                    <Div style={popupStylefullinner}>
                        <form onSubmit={handleSubmitForm3(onSubmitCopyright)} className="w-full flex flex-wrap items-start">
                            <Div className="w-full px-[10px]">
                                <Div className="mb-[15px]">
                                    <label className='block text-[15px] font-medium mb-[5px]'>Copyright Text</label>
                                    <textarea className="block w-full border border-[#dddddd] rounded-[3px] px-[10px] py-[8px] leading-[1.4] text-[14px] font-normal font-inherit outline-none resize-none" {...registerForm3("copyright")} rows="3" style={{resize:'none'}}></textarea>
                                </Div>
                            </Div>
                            <Div className="w-full px-[10px]">
                                <button type="submit" className='inline-block leading-[1] px-[20px] py-[12px] min-w-[100px] text-center border border-[#294662] font-inherit font-medium text-[15px] text-white bg-[#294662] outline-none cursor-pointer hover:opacity-90 hover:text-white' disabled={copyLoading}>{copyLoading && copyLoading ? 'Loading...' : 'Submit Now'}</button>
                                <button type="button" className='inline-block leading-[1] px-[20px] py-[12px] min-w-[100px] text-center border border-[#f90707] font-inherit font-medium text-[15px] text-white bg-[#f90707] outline-none cursor-pointer mx-[10px] hover:opacity-90 hover:text-white' onClick={() => handleCloseCopyPopup()}>Cancel</button>
                            </Div>
                        </form>
                    </Div>
                </Div>
                )}
            </Div>
            <Div className="flex flex-wrap bg-white px-[10px] py-[16px] w-1/3 border-t border-[#ddd]">
                <Div className="w-full px-[10px]">
                    <h3 className="text-[18px] font-bold text-[#294662] border-b-[5px] border-b-[rgba(151,151,151,0.07)] mt-0 mb-[20px] pb-[7px]">Social Media</h3>
                </Div>
                <Div className="w-full flex flex-wrap items-start">
                    {socialLoading && (
                        <Div className="flex w-full justify-center items-center py-4">
                            <FontAwesomeIcon icon={faSpinner} spin className="text-xl text-gray-700" />
                        </Div>
                    )}
                    {socialMedia && socialMedia.map((social, ind) => (
                    <Div className="w-full px-[10px]" key={ind}>
                        <Div className="mb-[15px]">
                            <Div className='block relative min-h-[150px]' onClick={() => handleEditSocial(social._id)}>
                                <label className='m-0 px-[17px] py-[25px] flex flex-col items-center justify-center border-[3px] border-dotted border-[#a3a3a3] rounded-[5px] cursor-pointer text-[15px]'>
                                    <span className="text-[19px] font-medium text-[#2e2e2e] text-center">Change Social media links</span>
                                    <span className="text-[12px] text-[#a3a3a3] pt-[14px] pb-[18px] block"></span>
                                    <span className="no-underline bg-[#4b7bd2] text-white px-[20px] py-[10px] border-0 outline-none inline-block leading-[1] rounded-[2px] transition duration-300">Click here</span>
                                </label>
                            </Div>
                        </Div>
                    </Div>
                    ))}
                </Div>
                { socialPopup && (
                <Div style={popupStylefull}>
                    <Div style={popupStylefullinner}>
                        <Div className="p-[6px_16px_0_16px]">
                            {!menu ? (
                            <Div className="flex justify-center items-center py-4">
                                <FontAwesomeIcon icon={faSpinner} spin className="text-xl text-gray-700" />
                            </Div>
                            ) : (
                            <form onSubmit={handleSubmit} className="bg-white w-full min-h-[calc(100vh-220px)]">
                                
                                <h3 className="flex-grow mb-[10px] pb-3 text-lg border-b-[3px] border-[#dddddd]">
                                    <input
                                        id="itemnameid"
                                        type="text"
                                        value={menu.itemname || ""}
                                        onChange={(e) => handleParentChange("itemname", e.target.value)}
                                        className="block w-full border-0 leading-0 text-[25px] font-medium text-gray-800 px-0 font-inherit outline-none"
                                        required
                                    />
                                </h3>

                                {menu.childmenu.map((child, index) => (
                                    <Div key={index} className="flex flex-wrap">
                                    <Div className="px-[5px] flex-grow mb-[7px]">
                                        <label htmlFor={`child-name-${index}`} className="block text-[15px] font-small mb-[5px]">Icon Name</label>
                                        <input
                                        id={`child-name-${index}`}
                                        type="text"
                                        placeholder="Name"
                                        value={child.title || ""}
                                        onChange={(e) => handleChildChange(index, "title", e.target.value)}
                                        className="block w-full border border-[#dddddd] rounded-[3px] px-[10px] py-[8px] leading-[1.4] text-[14px] font-normal font-inherit outline-none"
                                    />
                                    </Div>
                                    <Div className="px-[5px] flex-grow mb-[7px]">
                                        <label htmlFor={`child-uri-${index}`} className="block text-[15px] font-small mb-[5px]">Url</label>
                                        <input
                                        id={`child-uri-${index}`}
                                        type="text"
                                        placeholder="link.."
                                        value={child.link || ""}
                                        onChange={(e) => handleChildChange(index, "link", e.target.value)}
                                        className="block w-full border border-[#dddddd] rounded-[3px] px-[10px] py-[8px] leading-[1.4] text-[14px] font-normal font-inherit outline-none"
                                    />
                                    </Div>
                                    <Div className="px-[5px] flex-grow mb-[7px]">
                                        <label htmlFor={`child-ind-${index}`} className="block text-[15px] font-small mb-[5px]">Index No.</label>
                                        <input
                                        id={`child-ind-${index}`}
                                        type="text"
                                        placeholder="1,2,3"
                                        value={child.indexNum || ""}
                                        onChange={(e) => handleChildChange(index, "indexNum", e.target.value)}
                                        className="block border border-[#dddddd] rounded-[3px] px-[10px] py-[8px] leading-[1.4] text-[14px] font-normal font-inherit outline-none w-[70px]"
                                        />
                                    </Div>
                                    <Div className="px-[5px] mb-[7px]">
                                        <span className="block text-[15px] font-small mb-[5px]">Active</span>
                                        <label htmlFor={`child-active-${index}`} className="chkboxbtn block w-max px-[10px] py-[7px] bg-[#dedede] leading-[1] cursor-pointer">
                                        <input
                                        id={`child-active-${index}`}
                                        type="checkbox"
                                        checked={child.isActive || false}
                                        onChange={(e) =>
                                            handleChildChange(index, "isActive", e.target.checked)
                                        }
                                        className="appearance-none relative block w-[3rem] h-[1.5rem] bg-white overflow-hidden m-0 cursor-pointer"
                                        />
                                        </label>
                                    </Div>
                                    <Div className="px-[5px] mb-[7px]">
                                        <span className="block text-[15px] font-small mb-[5px]">External</span>
                                        <label htmlFor={`child-link-${index}`} className="chkboxbtn block w-max px-[10px] py-[7px] bg-[#dedede] leading-[1] cursor-pointer">
                                        <input
                                        id={`child-link-${index}`}
                                        type="checkbox"
                                        checked={child.linkType || false}
                                        onChange={(e) =>
                                            handleChildChange(index, "linkType", e.target.checked)
                                        }
                                        className="appearance-none relative block w-[3rem] h-[1.5rem] bg-white overflow-hidden m-0 cursor-pointer"
                                        />
                                        </label>
                                    </Div>
                                    <Div className="px-[5px] mb-[7px]">
                                        <span className="block text-[15px] font-small mb-[5px]">Trash</span>
                                        <button type="button" onClick={() => removeChildMenu(index)} className="bg-[#f90707] rounded-[3px] text-white cursor-pointer outline-none px-2 h-[38px]">
                                            <FontAwesomeIcon icon={faTrash} className="text-white cursor-pointer" />
                                        </button>
                                    </Div>
                                    </Div>
                                ))}
                                <Div className="text-right px-4">
                                    <button type="button" onClick={addChildMenu} className="cursor-pointer text-blue-600 text-sm hover:underline mt-1">+ Add Social Media</button>
                                </Div>
                                <Div className="w-full bg-white border-t border-[#dddddd] pt-[14px] pb-[20px] text-right">
                                <button type="submit" disabled={saving} className="inline-block leading-[1] px-[20px] py-[12px] min-w-[100px] text-center border border-[#294662] font-inherit font-medium text-[15px] text-white bg-[#294662] outline-none cursor-pointer">
                                    {saving ? "Saving..." : "Update Menu"}
                                </button>
                                <button type="button" className='inline-block leading-[1] px-[20px] py-[12px] min-w-[100px] text-center border border-[#f90707] font-inherit font-medium text-[15px] text-white bg-[#f90707] outline-none cursor-pointer ml-[10px] hover:opacity-90 hover:text-white' onClick={() => handleClosesocialPopup()}>Cancel</button>
                                </Div>
                            </form>
                            )}
                        </Div>
                    </Div>
                </Div>
                )}
            </Div>
        </Div>
        </>
    );
}

  const popupStylefull = {
    position: 'fixed',
    backgroundColor: 'rgb(0 0 0 / 64%)',
    padding: '20px',
    zIndex: '9999',
    left: '0',
    right: '0',
    top: '0',
    bottom: '0',
    overflowY: 'auto',
    display: 'flex',
  };
  const popupStylefullinner = {
    maxWidth: '767px',
    margin: 'auto auto',
    backgroundColor: '#ffffff',
    padding: '20px',
    width: '100%',
    minHeight: '200px',
  }

export default SiteSettings;
