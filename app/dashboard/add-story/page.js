"use client";
import React, { useState, useRef, useMemo, useEffect, forwardRef } from 'react';
import JoditEditor from 'jodit-react';
import { useForm } from "react-hook-form";
import { createStory, getCategory, getTags } from '@/app/services/authService';
import Toast from '../components/toast';
import Div from '../components/division';

const AddStory = () => {
    const [filefirst, setFilefirst] = useState(null);
    const [categoryFileName, setCategoryFileName] = useState('');
    const [borderRedCat, setBorderRedCat] = useState(false);
    const [inputSlugValue, setInputSlugValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [catData, setCateData] = useState([]);
    const [tagData, setTagData] = useState([]);
    const [toast, setToast] = useState({ message: '', type: '', visible: false });
	const [bodytext, setBodytext] = useState('');
    const [liveData, setLiveData] = useState('');
    const [liveupdate, setLiveupdate] = useState([]);
    const [liveError, setLiveError] = useState('');
    const [showLive, setShowLive] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset, clearErrors, setError, resetField, getValues, } = useForm({
        mode: 'onChange', 
        defaultValues: {
            headline: "",
            subheadline: "",
            inputSlugValue: "",
            category: "",
            tags: "",
            summary: "",
            bodytext: "",
            pagetitle: "",
            metatitle: "",
            metakeyword: "",
            metadescription: "",
            liveblog: false,
            liveupdate: "",
            filefirst: "",
          },
    });
    const editor = useRef(null);
    const config = useMemo(
        () => ({
            readonly: false,
            height: 500,
            showPoweredBy: false,
            removeButtons: ['speechRecognition'], 
            toolbarSticky: false,
        })
    );
    const configlive = useMemo(
        () => ({
            readonly: false,
            height: 250,
            showPoweredBy: false,
            removeButtons: ['speechRecognition'], 
            toolbarSticky: false,
        })
    );
    
    const createSlug = (text) => {
        return text
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
    };

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

    const Selectcat = forwardRef(({ name, options = [], ...rest }, ref) => {
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

    const handleSlugChange = (event) => {
        const value = event.target.value;
        setInputSlugValue(createSlug(value));
        if (inputSlugValue.length > 2) {
            clearErrors("slug");
          } else {
            setError("slug", { type: "manual", message: "This field is required1" });
          }
    };
    const handleCategoryFileChange=(e)=>{
        if (e.target.files.length > 0) {
            let filename = e.target.files[0].name;
            let fileFull = e.target.files[0];
            setFilefirst(fileFull);
            setCategoryFileName(filename);
            setBorderRedCat(false);
        }
    } 


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
    }, []); 

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await getTags('/tags');
             setTagData(response.tags);
          } catch (error) {
            console.error('Failed to fetch data:', error);
          }
        };
        fetchData();
    }, []); 

      // Add live update item
  const addLiveUpdate = () => {
    const title = getValues("title");
    if (!title || !liveData) {
      setLiveError('Title and content both field cannot be empty');
      return;
    }

    setLiveupdate([...liveupdate, { title, content: liveData }]);
    resetField("title");
    setLiveData("");
  };


    const onSubmit = async (data) => {
        setLoading(true);
        if (!filefirst) {
            setBorderRedCat(true);
            setLoading(false);
            return;
            }
            const formData = new FormData();
            formData.append("headline", data.headline);
            formData.append("subheadline", data.subheadline);
            formData.append("slugtext", data.slug);
            formData.append("slug", inputSlugValue);
            formData.append("category", data.category);
            formData.append("tags", data.tags);
            formData.append("summary", data.summary);
            formData.append("bodytext", bodytext);
            formData.append("pagetitle", data.pagetitle);
            formData.append("metatitle", data.metatitle);
            formData.append("metakeyword", data.metakeyword);
            formData.append("metadescription", data.metadescription);
            formData.append("liveblog", data.liveblog);
            formData.append("storystatus", data.storystatus);
            formData.append("liveupdate", JSON.stringify(liveupdate));
            formData.append("filefirst", filefirst);
        try {
            const response = await createStory('/story', formData);
            if (response.message) {
                setToast({ message: 'Story added successfully!', type: 'success', visible: true });
                setLoading(false);
                reset(); 
            } else {
                setToast({ message: 'Failed to add story. Please try again.', type: 'error', visible: true });
            }
        } catch (error) {
            setToast({ message: 'An error occurred while adding the story.', type: 'error', visible: true });
        } finally {
            setLoading(false);
            setBodytext('');
            setInputSlugValue('');
            setCategoryFileName('');
        } 
    };

    return (
        <>
        <Div className='mx-auto w-full max-w-full px-[15px]'>
            <Div className="flex flex-wrap -mx-[10px]">
                <Div className="flex-none w-full p-[7px_10px]">
                    <Div className="flex flex-wrap items-center justify-between bg-white border-l-[4px] border-l-[#294662] rounded-[5px] shadow-[0_0_50px_#00000008] p-[15px]">
                        <h4 className='font-bold leading-[1.2] mb-0 text-[20px]'>Add Story</h4>
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
        <form onSubmit={handleSubmit(onSubmit)} className="pt-1.5 px-4 pb-0 flex flex-wrap">
            <Div className="w-[65%] p-4 px-[10px] bg-white flex flex-wrap">
                <Div className="w-1/2 px-[10px]">
                    <Div className="mb-[15px]">
                        <label className="block text-[15px] font-medium mb-[5px]">Headline<em>*</em></label>
                        <input className="block w-full border border-[#dddddd] rounded-[3px] px-[10px] py-[8px] leading-[1.4] text-[14px] font-normal font-inherit outline-none" type="text" {...register("headline", { required: 'This field is required' })} />
                        {errors.headline && <span className="text-red-500 font-medium text-[13px]">{errors.headline.message}</span>}
                    </Div>
                </Div>
                <Div className="w-1/2 px-[10px]">
                    <Div className="mb-[15px]">
                        <label className="block text-[15px] font-medium mb-[5px]">Sub Headline</label>
                        <input className="block w-full border border-[#dddddd] rounded-[3px] px-[10px] py-[8px] leading-[1.4] text-[14px] font-normal font-inherit outline-none" type="text" {...register("subheadline")} />
                    </Div>
                </Div>
                <Div className="w-1/2 px-[10px]">
                    <Div className="mb-[15px]">
                        <label className="block text-[15px] font-medium mb-[5px]">Slug Text<em>*</em></label>
                        <input className="block w-full border border-[#dddddd] rounded-[3px] px-[10px] py-[8px] leading-[1.4] text-[14px] font-normal font-inherit outline-none" type="text" {...register("slug", { required: 'This field is required1' })} onChange={handleSlugChange} />
                        {errors.slug && <span className="text-red-500 font-medium text-[13px]">{errors.slug.message}</span>}
                    </Div>
                </Div>
                <Div className="w-1/2 px-[10px]">
                    <Div className="mb-[15px]">
                        <label className="block text-[15px] font-medium mb-[5px]">Slug View</label>
                        <input className="block w-full border border-[#dddddd] rounded-[3px] px-[10px] py-[8px] leading-[1.4] text-[14px] font-normal font-inherit outline-none cursor-not-allowed bg-gray-50/90" value={inputSlugValue} readOnly />
                    </Div>
                </Div>
                <Div className="w-1/2 px-[10px]">
                    <Div className="mb-[15px]">
                    <label className="block text-[15px] font-medium mb-[5px]">Category<em>*</em></label>
                    <Selectcat
                        {...register("category")}
                        options={catData?.map(cate => ({ value: cate.categoryname, label: cate.categoryname })) || []}
                    />
                    {errors.category && <span className="text-red-500 font-medium text-[13px]">{errors.category.message}</span>}
                    </Div>
                </Div>
                <Div className="w-1/2 px-[10px]">
                    <Div className="mb-[15px]">
                    <label className="block text-[15px] font-medium mb-[5px]">Tag</label>
                    <Selectcat
                        {...register("tags")}
                        options={tagData?.map(tags => ({ value: tags.tagname, label: tags.tagname })) || []}
                    />
                    </Div>
                </Div>
                <Div className="w-full px-[10px]">
                    <Div className="mb-[15px]">
                        <label className="block text-[15px] font-medium mb-[5px]">Summary</label>
                        <textarea className="block w-full border border-[#dddddd] rounded-[3px] px-[10px] py-[8px] leading-[1.4] text-[14px] font-normal font-inherit outline-none resize-none" rows="3" cols="50" {...register("summary")}></textarea>
                    </Div>
                </Div>
                <Div className="w-full px-[10px]">
                    <Div className="mb-[15px]">
                        <label className="block text-[15px] font-medium mb-[5px]">Body Text</label>
                        <JoditEditor
                            ref={editor}
                            value={bodytext}
                            config={config}
                            tabIndex={1}
                            onBlur={(newContenttype) => { setBodytext(newContenttype) }}
                        />
                    </Div>
                </Div> 
                <Div className="w-full px-[10px]">
                    <Div className='mb-[15px]'>
                        <span className='block text-[15px] font-medium mb-[5px]'>Live Update</span>
                        <label htmlFor="chkboxbtn" className="chkboxbtn block w-max px-[10px] py-[7px] bg-[#dedede] leading-[1] cursor-pointer" >
                            <input type="checkbox" className='appearance-none relative block w-[3rem] h-[1.5rem] bg-white overflow-hidden m-0 cursor-pointer' id="chkboxbtn" {...register("liveblog")} onChange={(e) => setShowLive(e.target.checked)} />
                        </label>
                    </Div>
                </Div>
            {showLive && (
                <Div className="w-full p-[15px] mb-[15px] bg-[#dddddd]">
                    {liveError && <p className="text-red-500 font-medium text-[13px]">{liveError}</p>}
                    <input
                    type="text"
                    placeholder="Live update title"
                    className="block w-full border border-[#dddddd] bg-[#ffffff] rounded-[3px] px-[10px] py-[8px] mb-2"
                    {...register("title")}
                    />
                    <JoditEditor
                    ref={editor}
                    value={liveData}
                    config={configlive}
                    tabIndex={1}
                    onBlur={(newContent) => setLiveData(newContent)}
                    />

                    <button
                    type="button"
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={addLiveUpdate}
                    >
                    Add Live Update
                    </button>

                    {/* Display live update items */}
                    {liveupdate.length > 0 && (
                    <ul className="mt-3 list-disc pl-5">
                        {liveupdate.map((item, idx) => (
                        <li key={idx}>
                            <strong>{item.title}:</strong> {item.content.slice(0, 50)}...
                        </li>
                        ))}
                    </ul>
                    )}
                </Div>
            )}
            </Div>
            <Div className="bg-white w-[35%] border-l border-gray-300 p-4">
                <Div className="mb-[15px]">
                    <label className="block text-[15px] font-medium mb-[5px]">Category Image<em>*</em></label>
                    <Div className='block relative min-h-[150px]'>
                        <label htmlFor="categoryfile" className='m-0 p-[25px] px-[17px] flex items-center justify-center flex-col border-[3px] border-dotted border-[#a3a3a3] rounded-md cursor-pointer' style={borderRedCat && borderRedCat ? { borderColor: 'red',backgroundColor: '#fff2f2'} : {}}>
                            <span className="text-[19px] font-medium text-[#2e2e2e] text-center">{categoryFileName && categoryFileName ? categoryFileName : 'Select File here'}</span>
                            <span className="text-[12px] text-[#a3a3a3] pt-[14px] pb-[18px] block">Files Supported: jpeg, jpg, png, pdf, doc, docx</span>
                            <span className="no-underline bg-[#4b7bd2] text-white px-5 py-[10px] border-0 outline-none transition duration-300 inline-block leading-none rounded-sm">Browse</span>
                        </label>
                        <input type="file" name="categoryfile" className='opacity-0 absolute inset-0 w-full h-full cursor-pointer' id="categoryfile" onChange={handleCategoryFileChange} />
                    </Div>
                </Div>
                <Div className="w-full px-[4px]">
                    <Div className="mb-[15px]">
                        <label className="block text-[15px] font-medium mb-[5px]">Page title</label>
                        <input className="block w-full border border-[#dddddd] rounded-[3px] px-[10px] py-[8px] leading-[1.4] text-[14px] font-normal font-inherit outline-none" {...register("pagetitle")} />
                    </Div>
                </Div>
                <Div className="w-full px-[4px]">
                    <Div className="mb-[15px]">
                        <label className="block text-[15px] font-medium mb-[5px]">Meta title</label>
                        <input className="block w-full border border-[#dddddd] rounded-[3px] px-[10px] py-[8px] leading-[1.4] text-[14px] font-normal font-inherit outline-none" {...register("metatitle")} />
                    </Div>
                </Div>
                <Div className="w-full px-[4px]">
                    <Div className="mb-[15px]">
                        <label className="block text-[15px] font-medium mb-[5px]">Meta keyword</label>
                        <textarea className="block w-full border border-[#dddddd] rounded-[3px] px-[10px] py-[8px] leading-[1.4] text-[14px] font-normal font-inherit outline-none resize-none" rows="2" cols="50" {...register("metakeyword")}></textarea>
                    </Div>
                </Div>
                <Div className="w-full px-[4px]">
                    <Div className="mb-[15px]">
                        <label className="block text-[15px] font-medium mb-[5px]">Meta Description</label>
                        <textarea className="block w-full border border-[#dddddd] rounded-[3px] px-[10px] py-[8px] leading-[1.4] text-[14px] font-normal font-inherit outline-none resize-none" rows="3" cols="50" {...register("metadescription")}></textarea>
                    </Div>
                </Div>
                <Div className="w-full px-[4px]">
                    <Div className="mb-[15px]">
                        <label className='block text-[15px] font-medium mb-[5px]'>Status</label>
                        <Selectcm
                            {...register("storystatus")}
                            options={[
                                { value: "active", label: "Active" },
                                { value: "deactive", label: "Deactive" },
                                { value: "delete", label: "Delete" },
                            ]}
                        />
                    </Div>
                </Div>
            </Div>
            <Div className="w-full bg-white border-t border-gray-300 pt-[14px] px-5 pb-5 text-right">
               <button type="submit" className='inline-block leading-[1] px-[20px] py-[12px] min-w-[100px] text-center border border-[#294662] font-inherit font-medium text-[15px] text-white bg-[#294662] outline-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-50' disabled={loading}>{loading ? "Loading..." : "Submit Now"}</button>
            </Div>
        </form>
        </>
    );
}

export default AddStory;
