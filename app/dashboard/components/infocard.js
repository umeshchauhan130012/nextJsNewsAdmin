// import React, { useEffect, useState } from 'react';

import Link from "next/link";

const Infocard = (props) => {

    // const [data, setData] = useState([]);
    // useEffect(() => {
    //   const fetchData = async () => {
    //     try {
    //       const response = await getAllCategory('/category');
    //        setData(response);
    //     } catch (error) {
    //       console.error('Failed to fetch data:', error);
    //     }
    //   };
    //   fetchData();
    // }, []);    

    return (
        <div className="bg-white bg-[length:cover] bg-[position:100%_100%] rounded-[10px] shadow-[0_0_50px_#00000008] p-[15px] transition-all duration-300 ease-linear">
            <div className="flex items-center justify-between mb-5">
                <div className="pr-[10px]">
                    <p className="text-[#3b3b3b] text-[15px] font-bold !mb-0">Title</p>
                </div>
                <div className="text-[#6ada7d] text-[11px] font-semibold whitespace-nowrap">
                    <i className="fa fa-level-up" aria-hidden="true"></i> +16.24 %
                </div>
            </div>
            <div className="flex items-end justify-between">
                <div>
                    <h4 className="text-[#878a99] text-[16px] font-semibold leading-[1.4] mb-[10px]"><span className="text-[#294662] text-[18px]" data-target="40">100</span> - Category</h4>
                    <Link href="/dashboard/category-list" className='text-[#878a99] inline-block text-[12px] font-normal'>View all Articles</Link>
                </div>
                <div>
                    <span className="relative block">
                        <svg className="circle-progress" width="50" height="50" viewBox="0 0 160 160">
                            <circle r="70" cx="80" cy="80" fill="transparent" stroke="#e0e0e0" strokeWidth="6px"></circle>
                            <circle r="70" cx="80" cy="80" fill="transparent" stroke="#60e6a8" strokeWidth="12px" strokeDasharray="439.6px" strokeDashoffset="calc(440 - (440 * 90) / 100)"></circle>
                            <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#60e6a8" fontWeight="bold" fontSize="3em">90<tspan>%</tspan></text>
                        </svg>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Infocard;

