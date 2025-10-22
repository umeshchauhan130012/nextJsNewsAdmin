"use client";
import { forwardRef, useEffect, useState } from 'react';
import Div from '../components/division';
import Toast from '../components/toast';
import { useForm } from 'react-hook-form';
import { createCategory, getCategory } from '@/app/services/authService';

const AddCategory = () => {  
    const { register, handleSubmit, formState: { errors }, reset, setError } = useForm();
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState({ message: '', type: '', visible: false });
    const [catData, setCateData] = useState([]);
    const [refresh, setRefresh] = useState(false);

    // const Selectcm = forwardRef(({ onChange, name }, ref) => (
    //     <>
    //         <label className='block text-[15px] font-medium mb-[5px]'>Status</label>
    //         <select className="block w-full border border-[#dddddd] rounded-[3px] pt-[6px] pb-[10px] px-[10px] leading-[1.4] text-[14px] font-normal font-inherit outline-none" name={name} ref={ref} onChange={onChange} >
    //             <option value="active">Active</option>
    //             <option value="deactive">Deactive</option>
    //             <option value="delete">Delete</option>
    //         </select>
    //     </>
    //   ));
    const Selectcm = forwardRef(({ name, options = [], ...rest }, ref) => {
        return (
            <select
            name={name}
            ref={ref}
            className={`block w-full border border-[#dddddd] rounded-[3px] pt-[6px] pb-[10px] px-[10px] leading-[1.4] text-[14px] font-normal font-inherit outline-none`}
            {...rest}
            >
            <option>Select...</option>
            {options.map((opt, i) => (
                <option key={i} value={opt.value}>
                {opt.label}
                </option>
            ))}
            </select>
        );
    });

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await getCategory('/category');
            setCateData(response.category);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
        };
        fetchData();
    }, [refresh]); 

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            await createCategory('/category', data); 
            setToast({ message: 'Category submited successfully done!', type: 'success', visible: true });
            reset();
        } catch (err) {
            setError(err.response?.data?.message || err.message); 
        } finally {
            setLoading(false);
            setRefresh(prev => !prev);
        }  
    };
    return (
        <>
            <Div className='mx-auto w-full max-w-full px-[15px]'>
                <Div className="flex flex-wrap -mx-[10px]">
                    <Div className="flex-none w-full p-[7px_10px]">
                        <Div className="flex flex-wrap items-center justify-between bg-white border-l-[4px] border-l-[#294662] rounded-[5px] shadow-[0_0_50px_#00000008] p-[15px]">
                            <h4 className='font-bold leading-[1.2] mb-0 text-[20px]'>Add New Category</h4>
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
                <form onSubmit={handleSubmit(onSubmit)} className="bg-white w-full min-h-[calc(100vh-220px)]">
                    <Div className="flex flex-wrap w-full pb-[16px] pt-[16px] px-[10px] border-b-[14px] border-[#f8f8f8]">
                        <Div className="w-1/2 px-[10px]">
                            <Div className="mb-[15px]">
                                <label className='block text-[15px] font-medium mb-[5px]'>Category Name<em>*</em></label>
                                <input className="block w-full border border-[#dddddd] rounded-[3px] px-[10px] py-[8px] leading-[1.4] text-[14px] font-normal font-inherit outline-none" type="text" {...register("categoryname", { required: 'This field is required' })} />
                                {errors.categoryname && <span className="error-message">{errors.categoryname.message}</span>}
                            </Div>
                        </Div>
                        <Div className="w-1/2 px-[10px]">
                            <Div className="mb-[15px]">
                                <label className='block text-[15px] font-medium mb-[5px]'>Category Hindi Name<em>*</em></label>
                                <input className="block w-full border border-[#dddddd] rounded-[3px] px-[10px] py-[8px] leading-[1.4] text-[14px] font-normal font-inherit outline-none" type="text" {...register("categoryhindiname")} />
                            </Div>
                        </Div>
                        <Div className="w-1/2 px-[10px]">
                            <Div className="mb-[15px]">
                                <label className='block text-[15px] font-medium mb-[5px]'>Status</label>
                                <Selectcm
                                    {...register("categorystatus")}
                                    options={[
                                        { value: "active", label: "Active" },
                                        { value: "deactive", label: "Deactive" },
                                        { value: "delete", label: "Delete" },
                                    ]}
                                />
                            </Div>
                        </Div>
                        <Div className="w-1/2 px-[10px]">
                            <Div className="mb-[15px]">
                                <label className='block text-[15px] font-medium mb-[5px]'>URL (Use full URL with /abc )<em>*</em></label>
                                <input className="block w-full border border-[#dddddd] rounded-[3px] px-[10px] py-[8px] leading-[1.4] text-[14px] font-normal font-inherit outline-none" type="text" {...register("categoryurl", { required: 'This field is required1' })} />
                                {errors.categoryurl && <span className="error-message">{errors.categoryurl.message}</span>}
                            </Div>
                        </Div>
                        <Div className="w-1/2 px-[10px]">
                            <Div className="mb-[15px]">
                                <label className='block text-[15px] font-medium mb-[5px]'>Meta Title</label>
                                <input className="block w-full border border-[#dddddd] rounded-[3px] px-[10px] py-[8px] leading-[1.4] text-[14px] font-normal font-inherit outline-none" type="text" {...register("metatitle")} />
                            </Div>
                        </Div>
                        <Div className="w-1/2 px-[10px]">
                            <Div className="mb-[15px]">
                                <label className='block text-[15px] font-medium mb-[5px]'>Meta Keywords</label>
                                <input className="block w-full border border-[#dddddd] rounded-[3px] px-[10px] py-[8px] leading-[1.4] text-[14px] font-normal font-inherit outline-none" type="text" {...register("metakeywords")} />
                            </Div>
                        </Div>
                        <Div className="w-1/2 px-[10px]">
                            <Div className="mb-[15px]">
                                <label className='block text-[15px] font-medium mb-[5px]'>Meta Description</label>
                                <input className="block w-full border border-[#dddddd] rounded-[3px] px-[10px] py-[8px] leading-[1.4] text-[14px] font-normal font-inherit outline-none" type="text" {...register("metadescription")} />
                            </Div>
                        </Div>
                        <Div className="w-1/2 flex flex-wrap">
                            <Div className="w-1/4 px-[10px] w-[calc(100%-200px)]">
                                <Div className="mb-[15px]">
                                <label className="block text-[15px] font-medium mb-[5px]">Select Parent Category</label>
                                <Selectcm
                                    {...register("parentcategory")}
                                    options={catData?.map(cat => ({ value: cat.categoryname, label: cat.categoryname })) || []}
                                />
                                </Div>
                            </Div>
                            <Div className="w-1/5 px-[10px] w-[200px]">
                                <Div className='mb-[15px]'>
                                    <span className='block text-[15px] font-medium mb-[5px]'>Show At Home</span>
                                    <label htmlFor="chkboxbtn" className="chkboxbtn block w-max px-[10px] py-[7px] bg-[#dedede] leading-[1] cursor-pointer" >
                                        <input type="checkbox" className='appearance-none relative block w-[3rem] h-[1.5rem] bg-white overflow-hidden m-0 cursor-pointer' id="chkboxbtn" {...register("categoryathome")} />
                                    </label>
                                </Div>
                            </Div>
                        </Div>
                    </Div>
                        
                    <Div className="w-full bg-white border-t border-[#dddddd] pt-[14px] pr-[20px] pb-[20px] text-right">
                        <button type="submit" className='inline-block leading-[1] px-[20px] py-[12px] min-w-[100px] text-center border border-[#294662] font-inherit font-medium text-[15px] text-white bg-[#294662] outline-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-50' disabled={loading}>{loading ? "Loading..." : "Submit Now"}</button>
                    </Div>
                </form>
            </Div>
        </>
    );
}

export default AddCategory;
