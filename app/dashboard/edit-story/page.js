"use client";
import React, { useState, useRef, useMemo, useEffect, forwardRef } from 'react';
import JoditEditor from 'jodit-react';
import { useForm } from "react-hook-form";
import { getCategory, getStory, getTags, putStory, } from '@/app/services/authService';
import Toast from '../components/toast';
import Div from '../components/division';
import { useSearchParams } from "next/navigation";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const EditStory = () => {
  const searchParams = useSearchParams();
  const storyId = searchParams.get("id"); // e.g., /dashboard/editstory?id=123
  const editor = useRef(null);
  const [filefirst, setFilefirst] = useState(null);
  const [categoryFileName, setCategoryFileName] = useState("");
  const [borderRedCat, setBorderRedCat] = useState(false);
  const [inputSlugValue, setInputSlugValue] = useState("");
  const [inputSlugText, setInputSlugText] = useState("");
  const [loading, setLoading] = useState(false);
  const [catData, setCateData] = useState([]);
  const [tagData, setTagData] = useState([]);
  const [toast, setToast] = useState({ message: "", type: "", visible: false });
  const [bodytext, setBodytext] = useState("");
  const [liveData, setLiveData] = useState("");
  const [liveupdate, setLiveUpdate] = useState([]);
  const [liveError, setLiveError] = useState("");
  const [showLive, setShowLive] = useState(false);
  const [title, setTitle] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [storyData, setStoryData] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setError,
    setValue,
  } = useForm({
    mode: "onChange",
  });

  const config = useMemo(
    () => ({
      readonly: false,
      height: 500,
      showPoweredBy: false,
      removeButtons: ["speechRecognition"],
      placeholder: "Enter your title", 
      toolbarSticky: false,
    }),
    []
  );

  const configlive = useMemo(
    () => ({
      readonly: false,
      height: 250,
      showPoweredBy: false,
      removeButtons: ["speechRecognition"],
      placeholder: "Enter your title", 
      toolbarSticky: false,
    }),
    []
  );

  // Slug Generator
  const createSlug = (text) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
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
            <option value="">Select...</option>
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
      setError("slug", { type: "manual", message: "This field is required" });
    }
  };

  const handleCategoryFileChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file instanceof File) {
        const filePath = URL.createObjectURL(file);
        setFilefirst(file);
        setCategoryFileName(filePath);
        setBorderRedCat(false);
      }
    }
  };

    // Fetch categories & tags
  useEffect(() => {
    (async () => {
      try {
        const resCat = await getCategory("/category");
        setCateData(resCat.category);
        const resTag = await getTags("/tags");
        setTagData(resTag.tags);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    })();
  }, []);

  useEffect(() => {
    if (!storyId) return;
    (async () => {
      setLoading(true);
      try {
        const response = await getStory(`/story/${storyId}`);
        setStoryData(response.story);
      } catch (error) {
        console.error("Failed to fetch story:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [storyId]);

    useEffect(() => {
      if (!storyData || catData.length === 0 || tagData.length === 0) return;
      // Other fields
      setValue("headline", storyData.headline);
      setValue("subheadline", storyData.subheadline);
      setValue("slugtext", storyData.slugtext);
      setValue("slug", storyData.slug);
      setInputSlugValue(storyData.slug);
      setInputSlugText(storyData.slugtext);
      setValue("summary", storyData.summary);
      setValue("pagetitle", storyData.pagetitle);
      setValue("metatitle", storyData.metatitle);
      setValue("metakeyword", storyData.metakeyword);
      setValue("metadescription", storyData.metadescription);
      setValue("liveblog", storyData.liveblog);
      setValue("storystatus", storyData?.storystatus || 'active');
      setBodytext(storyData.bodytext);
      setLiveUpdate(storyData.liveupdate || []);
      setShowLive(storyData.liveblog);
    
      const imageUrl = storyData?.filefirst?.path;
      if (imageUrl) {
          setCategoryFileName(imageUrl);
      } else {
          setFilefirst(null);
      }

      // 🔹 Only set category/tag if options exist
  const catExists = catData.some(c => c.categoryname === storyData.category);
  if (catExists) setValue("category", storyData.category);

  const tagExists = tagData.some(t => t.tagname === storyData.tags);
  if (tagExists) setValue("tags", storyData.tags);


  }, [storyData, catData, tagData, setValue]);

  // Add Live Update
   const addLiveUpdate = () => {
    if (!title || !liveData) {
      setLiveError("Please fill title and content!");
      return;
    }

    if (editIndex !== null) {
      // Update existing item
      const updatedList = [...liveupdate];
      updatedList[editIndex] = { title, content: liveData };
      setLiveUpdate(updatedList);
      setEditIndex(null);
    } else {
      // Add new item
      setLiveUpdate([...liveupdate, { title, content: liveData }]);
    }
      setTitle("");
      setLiveData("");
  }

  // Update story
  const onSubmit = async (data) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("headline", data.headline);
    formData.append("subheadline", data.subheadline);
    formData.append("slugtext", data.slugtext);
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
    if (filefirst) formData.append("filefirst", filefirst);

    try {
      const response = await putStory(`/story/${storyId}`, formData);
      if (response.success) {
        setToast({
          message: "Story updated successfully!",
          type: "success",
          visible: true,
        });
      } else {
        setToast({
          message: "Failed to update story. Please try again.",
          type: "error",
          visible: true,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setToast({
        message: "An error occurred while updating the story.",
        type: "error",
        visible: true,
      });
    } finally {
      setLoading(false);
    }
  };

 const handleEdit = (index) => {
    const item = liveupdate[index];
    setTitle(item.title);
    setLiveData(item.content);
    setEditIndex(index);
  };

    const handleDelete = (index) => {
    setLiveUpdate(liveupdate.filter((_, i) => i !== index));
  };


    return (
        <>
        <Div className='mx-auto w-full max-w-full px-[15px]'>
            <Div className="flex flex-wrap -mx-[10px]">
                <Div className="flex-none w-full p-[7px_10px]">
                    <Div className="flex flex-wrap items-center justify-between bg-white border-l-[4px] border-l-[#294662] rounded-[5px] shadow-[0_0_50px_#00000008] p-[15px]">
                        <h4 className='font-bold leading-[1.2] mb-0 text-[20px]'>Edit Story</h4>
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
                        {loading ? (<Skeleton className='h-[35px] top-[-3px]' />) : (<input className="block w-full border border-[#dddddd] rounded-[3px] px-[10px] py-[8px] leading-[1.4] text-[14px] font-normal font-inherit outline-none" type="text" {...register("headline", { required: 'This field is required' })} />)}
                        {errors.headline && <span className="text-red-500 font-medium text-[13px]">{errors.headline.message}</span>}
                    </Div>
                </Div>
                <Div className="w-1/2 px-[10px]">
                    <Div className="mb-[15px]">
                        <label className="block text-[15px] font-medium mb-[5px]">Sub Headline</label>
                        {loading ? (<Skeleton className='h-[35px] top-[-3px]' />) : (<input className="block w-full border border-[#dddddd] rounded-[3px] px-[10px] py-[8px] leading-[1.4] text-[14px] font-normal font-inherit outline-none" type="text" {...register("subheadline")} />)}
                    </Div>
                </Div>
                <Div className="w-1/2 px-[10px]">
                    <Div className="mb-[15px]">
                        <label className="block text-[15px] font-medium mb-[5px]">Slug Text<em>*</em></label>
                        {loading ? (<Skeleton className='h-[35px] top-[-3px]' />) : (<input className="block w-full border border-[#dddddd] rounded-[3px] px-[10px] py-[8px] leading-[1.4] text-[14px] font-normal font-inherit outline-none" type="text" {...register("slugtext", { required: 'This field is required1' })} onChange={handleSlugChange} />)}
                        {errors.slug && <span className="text-red-500 font-medium text-[13px]">{errors.slug.message}</span>}
                    </Div>
                </Div>
                <Div className="w-1/2 px-[10px]">
                    <Div className="mb-[15px]">
                        <label className="block text-[15px] font-medium mb-[5px]">Slug View</label>
                        {loading ? (<Skeleton className='h-[35px] top-[-3px]' />) : (<input className="block w-full border border-[#dddddd] rounded-[3px] px-[10px] py-[8px] leading-[1.4] text-[14px] font-normal font-inherit outline-none cursor-not-allowed bg-gray-50/90" value={inputSlugValue ? inputSlugValue : inputSlugText } readOnly />)}
                    </Div>
                </Div>
                <Div className="w-1/2 px-[10px]">
                    <Div className="mb-[15px]">
                    <label className="block text-[15px] font-medium mb-[5px]">Category<em>*</em></label>
                    {loading ? (<Skeleton className='h-[35px] top-[-3px]' />) : (<Selectcat
                          {...register("category")}
                          options={catData?.map(cate => ({ value: cate.categoryname, label: cate.categoryname })) || []}
                      />)}
                    {errors.category && <span className="text-red-500 font-medium text-[13px]">{errors.category.message}</span>}
                    </Div>
                </Div>
                <Div className="w-1/2 px-[10px]">
                    <Div className="mb-[15px]">
                    <label className="block text-[15px] font-medium mb-[5px]">Tag</label>
                      {loading ? (<Skeleton className='h-[35px] top-[-3px]' />) : (<Selectcat
                          {...register("tags")}
                          options={tagData?.map(tags => ({ value: tags.tagname, label: tags.tagname })) || []}
                      />)}
                  </Div>
                </Div>
                <Div className="w-full px-[10px]">
                    <Div className="mb-[15px]">
                        <label className="block text-[15px] font-medium mb-[5px]">Summary</label>
                        {loading ? (<Skeleton className='h-[76px] top-[-3px]' />) : (<textarea className="block w-full border border-[#dddddd] rounded-[3px] px-[10px] py-[8px] leading-[1.4] text-[14px] font-normal font-inherit outline-none resize-none" rows="3" cols="50" {...register("summary")}></textarea>)}
                    </Div>
                </Div>
                <Div className="w-full px-[10px]">
                    <Div className="mb-[15px]">
                        <label className="block text-[15px] font-medium mb-[5px]">Body Text</label>
                        {loading ? (<Skeleton className='h-[500px] top-[-3px]' />) : (<JoditEditor
                            ref={editor}
                            value={bodytext || ""}
                            config={{
                                ...config,
                                placeholder: "Enter your title",
                            }}
                            tabIndex={1}
                            onBlur={(newContenttype) => { setBodytext(newContenttype) }}
                        />)}
                    </Div>
                </Div> 
                <Div className="w-full px-[10px]">
                  <Div className="mb-[15px]">
                    <span className="block text-[15px] font-medium mb-[5px]">
                      Live Update
                    </span>
                    <label
                      htmlFor="chkboxbtn"
                      className="chkboxbtn block w-max px-[10px] py-[7px] bg-[#dedede] leading-[1] cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        id="chkboxbtn"
                        className="appearance-none relative block w-[3rem] h-[1.5rem] bg-white overflow-hidden m-0 cursor-pointer"
                        {...register("liveblog")}
                        onChange={(e) => setShowLive(e.target.checked)}
                      />
                    </label>
                  </Div>
                </Div>

      {/* Live Updates Section */}
      {showLive && (
        <Div className="w-full p-[15px] mb-[15px] bg-[#dddddd]">
          {liveError && (
            <p className="text-red-500 font-medium text-[13px]">{liveError}</p>
          )}

          <input
            type="text"
            placeholder="Live update title"
            className="block w-full border border-[#dddddd] bg-[#ffffff] rounded-[3px] px-[10px] py-[8px] mb-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <JoditEditor
            ref={editor}
            value={liveData || ""}
            config={{
                ...configlive,
                placeholder: "Enter your title",
            }}
            tabIndex={1}
            onBlur={(newContent) => setLiveData(newContent)}
          />

          <button
            type="button"
            className={`mt-2 px-4 py-2 rounded text-white ${
              editIndex !== null ? "bg-green-500" : "bg-blue-500"
            }`}
            onClick={addLiveUpdate}
          >
            {editIndex !== null ? "Update Live Item" : "Add Live Update"}
          </button>

          {liveupdate.length > 0 && (
            <ul className="mt-3 list-disc pl-5 space-y-2">
              {liveupdate.map((item, idx) => (
                <li key={idx}>
                  <strong>{item.title}</strong>:{" "}
                  <span
                    dangerouslySetInnerHTML={{
                      __html: item.content.slice(0, 80) + "...",
                    }}
                  ></span>
                  <div className="mt-1 space-x-2">
                    <button
                      type="button"
                      onClick={() => handleEdit(idx)}
                      className="text-blue-600 underline text-sm"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(idx)}
                      className="text-red-600 underline text-sm"
                    >
                      Delete
                    </button>
                  </div>
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
                    {loading ? (<Skeleton className='h-[150px] top-[-3px]' />) : (<Div className='block relative min-h-[150px]'>
                        <label htmlFor="categoryfile" className='m-0 p-[25px] px-[17px] flex items-center justify-center flex-col border-[3px] border-dotted border-[#a3a3a3] rounded-md cursor-pointer' style={borderRedCat && borderRedCat ? { borderColor: 'red',backgroundColor: '#fff2f2'} : {}}>
                            <span className="text-[19px] font-medium text-[#2e2e2e] text-center">{categoryFileName && categoryFileName ? <img src={categoryFileName} alt="thumb" width={100} height={47} /> : <FontAwesomeIcon icon={faSpinner} spin className="text-3xl" /> }</span>
                            <span className="text-[12px] text-[#a3a3a3] pt-[14px] pb-[18px] block">Files Supported: jpeg, jpg, png, pdf, doc, docx</span>
                            <span className="no-underline bg-[#4b7bd2] text-white px-5 py-[10px] border-0 outline-none transition duration-300 inline-block leading-none rounded-sm">Browse</span>
                        </label>
                        <input type="file" name="categoryfile" className='opacity-0 absolute inset-0 w-full h-full cursor-pointer' id="categoryfile" onChange={handleCategoryFileChange} />
                    </Div> )}
                </Div>
                <Div className="w-full px-[4px]">
                    <Div className="mb-[15px]">
                        <label className="block text-[15px] font-medium mb-[5px]">Page title</label>
                        {loading ? (<Skeleton className='h-[35px] top-[-3px]' />) : (<input className="block w-full border border-[#dddddd] rounded-[3px] px-[10px] py-[8px] leading-[1.4] text-[14px] font-normal font-inherit outline-none" {...register("pagetitle")} />)}
                    </Div>
                </Div>
                <Div className="w-full px-[4px]">
                    <Div className="mb-[15px]">
                        <label className="block text-[15px] font-medium mb-[5px]">Meta title</label>
                        {loading ? (<Skeleton className='h-[35px] top-[-3px]' />) : (<input className="block w-full border border-[#dddddd] rounded-[3px] px-[10px] py-[8px] leading-[1.4] text-[14px] font-normal font-inherit outline-none" {...register("metatitle")} />)}
                    </Div>
                </Div>
                <Div className="w-full px-[4px]">
                    <Div className="mb-[15px]">
                        <label className="block text-[15px] font-medium mb-[5px]">Meta keyword</label>
                        {loading ? (<Skeleton className='h-[56px] top-[-3px]' />) : (<textarea className="block w-full border border-[#dddddd] rounded-[3px] px-[10px] py-[8px] leading-[1.4] text-[14px] font-normal font-inherit outline-none resize-none" rows="2" cols="50" {...register("metakeyword")}></textarea>)}
                    </Div>
                </Div>
                <Div className="w-full px-[4px]">
                    <Div className="mb-[15px]">
                        <label className="block text-[15px] font-medium mb-[5px]">Meta Description</label>
                        {loading ? (<Skeleton className='h-[76px] top-[-3px]' />) : (<textarea className="block w-full border border-[#dddddd] rounded-[3px] px-[10px] py-[8px] leading-[1.4] text-[14px] font-normal font-inherit outline-none resize-none" rows="3" cols="50" {...register("metadescription")}></textarea>)}
                    </Div>
                </Div>
                <Div className="w-full px-[4px]">
                    <Div className="mb-[15px]">
                        <label className='block text-[15px] font-medium mb-[5px]'>Status</label>
                        {loading ? (<Skeleton className='h-[35px] top-[-3px]' />) : (<Selectcm
                            {...register("storystatus")}
                            options={[
                                { value: "active", label: "Active" },
                                { value: "deactive", label: "Deactive" },
                                { value: "delete", label: "Delete" },
                            ]}
                        />)}
                    </Div>
                </Div>
            </Div>
            <Div className="w-full bg-white border-t border-gray-300 pt-[14px] px-5 pb-5 text-right">
               <button type="submit" className='inline-block leading-[1] px-[20px] py-[12px] min-w-[100px] text-center border border-[#294662] font-inherit font-medium text-[15px] text-white bg-[#294662] outline-none cursor-pointer' disabled={loading}>Submit Now</button>
            </Div>
        </form>
        </>
    );
}

export default EditStory;
