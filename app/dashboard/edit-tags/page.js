"use client";
import { forwardRef, useEffect, useState } from 'react';
import Div from '../components/division';
import Toast from '../components/toast';
import { useForm } from 'react-hook-form';
import { getTags, putTags } from '@/app/services/authService';
import { useSearchParams } from "next/navigation";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const EditTags = () => {  
    const { register, handleSubmit, formState: { errors }, reset, setError, setValue } = useForm();
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState({ message: '', type: '', visible: false });
     const [dataRefresh, setDataRefresh] = useState(false);
     const searchParams = useSearchParams();
     const selectId = searchParams.get("id");

    // const Selectcm = forwardRef(({ onChange, name }, ref) => (
    //     <>
    //         <label className='block text-[15px] font-medium mb-[5px]'>Status</label>
    //         {loading ? (<Skeleton className='h-[35px] top-[-3px]' />) : (<select className="block w-full border border-[#dddddd] rounded-[3px] pt-[6px] pb-[10px] px-[10px] leading-[1.4] text-[14px] font-normal font-inherit outline-none" name={name} ref={ref} onChange={onChange} >
    //             <option value="active">Active</option>
    //             <option value="deactive">Deactive</option>
    //             <option value="delete">Delete</option>
    //         </select>)}
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
            {options.map((opt, i) => (
                <option key={i} value={opt.value}>
                {opt.label}
                </option>
            ))}
            </select>
        );
    });

    useEffect(() => {
        const fetchDataById = async () => {
            setLoading(true);
            try {
            const response = await getTags(`/tags/${selectId}`);
            const tag = response?.tag; 
            if (tag) {
                setValue("tagname", tag?.tagname || '');
                setValue("taghindiname", tag?.taghindiname || '');
                setValue("tagstatus", tag?.tagstatus || 'active');
                setValue("tagurl", tag?.tagurl || '');
                setValue("tagsathome", tag?.tagsathome || false);
                setValue("metatitle", tag?.metatitle || '');
                setValue("metakeywords", tag?.metakeywords || '');
                setValue("metadescription", tag?.metadescription || '');
                }
            } catch (error) {
            console.error('Failed to fetch data by ID:', error);
            } finally {
                setLoading(false); 
            }
        };
        fetchDataById();
    }, [selectId, dataRefresh]);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            await putTags(`/tags/${selectId}`, data); 
            setToast({ message: 'Tag Updated successfully done!', type: 'success', visible: true });
            setDataRefresh(prev => !prev);
            reset();
        } catch (err) {
            setError(err.response?.data?.message || err.message); 
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
                            <h4 className='font-bold leading-[1.2] mb-0 text-[20px]'>Edit Tag</h4>
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
                                <label className='block text-[15px] font-medium mb-[5px]'>Tag Name<em>*</em></label>
                                {loading ? (<Skeleton className='h-[35px] top-[-3px]' />) : (<input className="block w-full border border-[#dddddd] rounded-[3px] px-[10px] py-[8px] leading-[1.4] text-[14px] font-normal font-inherit outline-none" type="text" {...register("tagname", { required: 'This field is required' })} />)}
                                {errors.tagname && <span className="error-message">{errors.tagname.message}</span>}
                            </Div>
                        </Div>
                        <Div className="w-1/2 px-[10px]">
                            <Div className="mb-[15px]">
                                <label className='block text-[15px] font-medium mb-[5px]'>Tag Hindi Name<em>*</em></label>
                                {loading ? (<Skeleton className='h-[35px] top-[-3px]' />) : (<input className="block w-full border border-[#dddddd] rounded-[3px] px-[10px] py-[8px] leading-[1.4] text-[14px] font-normal font-inherit outline-none" type="text" {...register("taghindiname")} />)}
                            </Div>
                        </Div>
                        <Div className="w-1/2 px-[10px]">
                            <Div className="mb-[15px]">
                                {/* <Selectcm {...register("tagstatus")} /> */}
                                <label className='block text-[15px] font-medium mb-[5px]'>Status</label>
                                <Selectcm
                                    {...register("tagstatus")}
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
                                {loading ? (<Skeleton className='h-[35px] top-[-3px]' />) : (<input className="block w-full border border-[#dddddd] rounded-[3px] px-[10px] py-[8px] leading-[1.4] text-[14px] font-normal font-inherit outline-none" type="text" {...register("tagurl", { required: 'This field is required1' })} />)}
                                {errors.tagurl && <span className="error-message">{errors.tagurl.message}</span>}
                            </Div>
                        </Div>
                        <Div className="w-1/2 px-[10px]">
                            <Div className="mb-[15px]">
                                <label className='block text-[15px] font-medium mb-[5px]'>Meta Title</label>
                                {loading ? (<Skeleton className='h-[35px] top-[-3px]' />) : (<input className="block w-full border border-[#dddddd] rounded-[3px] px-[10px] py-[8px] leading-[1.4] text-[14px] font-normal font-inherit outline-none" type="text" {...register("metatitle")} />)}
                            </Div>
                        </Div>
                        <Div className="w-1/2 px-[10px]">
                            <Div className="mb-[15px]">
                                <label className='block text-[15px] font-medium mb-[5px]'>Meta Keywords</label>
                                {loading ? (<Skeleton className='h-[35px] top-[-3px]' />) : (<input className="block w-full border border-[#dddddd] rounded-[3px] px-[10px] py-[8px] leading-[1.4] text-[14px] font-normal font-inherit outline-none" type="text" {...register("metakeywords")} />)}
                            </Div>
                        </Div>
                        <Div className="w-1/2 px-[10px]">
                            <Div className="mb-[15px]">
                                <label className='block text-[15px] font-medium mb-[5px]'>Meta Description</label>
                                {loading ? (<Skeleton className='h-[35px] top-[-3px]' />) : (<input className="block w-full border border-[#dddddd] rounded-[3px] px-[10px] py-[8px] leading-[1.4] text-[14px] font-normal font-inherit outline-none" type="text" {...register("metadescription")} />)}
                            </Div>
                        </Div>
                        <Div className="w-1/2 px-[10px]">
                            <Div className='mb-[15px]'>
                                <span className='block text-[15px] font-medium mb-[5px]'>Show At Home</span>
                                {loading ? (<Skeleton className='h-[35px] top-[-3px]' />) : (<label htmlFor="chkboxbtn" className="chkboxbtn block w-max px-[10px] py-[7px] bg-[#dedede] leading-[1] cursor-pointer" >
                                    <input type="checkbox" className='appearance-none relative block w-[3rem] h-[1.5rem] bg-white overflow-hidden m-0 cursor-pointer' id="chkboxbtn" {...register("tagsathome")} />
                                </label>)}
                            </Div>
                        </Div>
                    </Div>
                        
                    <Div className="w-full bg-white border-t border-[#dddddd] pt-[14px] pr-[20px] pb-[20px] text-right">
                        <button type="submit" className='inline-block leading-[1] px-[20px] py-[12px] min-w-[100px] text-center border border-[#294662] font-inherit font-medium text-[15px] text-white bg-[#294662] outline-none cursor-pointer' disabled={loading}>Update Now</button>
                    </Div>
                </form>
            </Div>
        </>
    );
}

export default EditTags;
