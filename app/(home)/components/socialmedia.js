import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Div from "./division";
import { getSocialmedia } from "@/app/services/authService";
import Skeleton from "react-loading-skeleton";

const SocialLinks = (props) => {

const hasFetched = useRef(false);
const [headerSocial, setHeaderSocial] = useState([]);
const [loading, setLoading] = useState(false);
useEffect(() => {
    const fetchData = async () => {
        setLoading(true);
        try {
        const [social] = await Promise.all([
            getSocialmedia("/social-media"),
        ]);
        setHeaderSocial(social);
        } catch (err) {
        console.error("Error fetching header data:", err);
        } finally {
        setLoading(false);
        }
    };
    if (!hasFetched.current) {
        fetchData();
        hasFetched.current = true;
    }
}, []);
  
  const getSVGIcon = (title) => {
    switch (title.toLowerCase()) {
      case "facebook":
        return (
          <svg enableBackground="new 0 90 612 612" width={props.width} height={props.height} version="1.1" viewBox="0 90 612 612" x="0px" y="0px"><g><circle cx="306" cy="396" fill="#3B5998" r="306"></circle><path d="M382.928,407.979h-54.602v200.036H245.6V407.979h-39.345v-70.301H245.6v-45.492c0-32.532,15.453-83.474,83.463-83.474l61.278,0.256v68.239H345.88c-7.293,0-17.548,3.644-17.548,19.163v41.374h61.823L382.928,407.979z" fill="#FFFFFF"></path></g></svg>
        );

      case "youtube":
        return (
          <svg enableBackground="new 7.098 7.098 497.804 497.804" width={props.width} height={props.height} version="1.1" viewBox="7.098 7.098 497.804 497.804" x="0px" y="0px"><rect fill="#FFFFFF" height="233.5" stroke="#000000" strokeMiterlimit="10" width="309.5" x="101" y="139"></rect><g><linearGradient gradientTransform="matrix(1 0 0 -1 0 513)" gradientUnits="userSpaceOnUse" id="SVGID_1p" x1="29.8496" x2="443.0888" y1="464.1494" y2="50.9102"><stop offset="0" ></stop><stop offset="0.5153" ></stop><stop offset="1" ></stop></linearGradient><polygon fill="url(#SVGID_1p)" points="217.949,313.148 313.196,256 217.949,198.851 	"></polygon><linearGradient gradientTransform="matrix(1 0 0 -1 0 513)" gradientUnits="userSpaceOnUse" id="SVGID_2y" x1="39.3521" x2="452.5873" y1="473.6494" y2="60.4143"><stop offset="0" ></stop><stop offset="0.5153" ></stop><stop offset="1" ></stop></linearGradient><path d="M256,7.098C118.535,7.098,7.098,118.535,7.098,256S118.535,504.902,256,504.902S504.902,393.465,504.902,256S393.465,7.098,256,7.098z M408.349,268.287c0,26.307-3.048,52.605-3.048,52.605s-2.98,22.401-12.105,32.25c-11.593,12.936-24.574,13.012-30.527,13.773C320.026,370.184,256,370.297,256,370.297s-79.227-0.771-103.601-3.268c-6.782-1.353-21.993-0.961-33.594-13.896c-9.134-9.849-12.106-32.251-12.106-32.251s-3.048-26.289-3.048-52.604v-24.65c0-26.298,3.048-52.596,3.048-52.596s2.981-22.412,12.106-32.279c11.601-12.935,24.574-13.011,30.527-13.744c42.633-3.305,106.592-3.305,106.592-3.305h0.143c0,0,63.959,0,106.601,3.305c5.953,0.733,18.936,0.81,30.527,13.744c9.134,9.868,12.105,32.279,12.105,32.279s3.048,26.298,3.048,52.604V268.287L408.349,268.287z" fill="url(#SVGID_2y)"></path></g></svg>
        );

      case "whatsapp":
        return (
          <svg id="Whatsapp" viewBox="0,0,256,256" width={props.width} height={props.height} className="jsx-2d37e243a3a00329 header_follow_us_social"><g fill="#25d366" className="jsx-2d37e243a3a00329"><g transform="scale(5.12,5.12)" className="jsx-2d37e243a3a00329"><path d="M25,2c-12.682,0 -23,10.318 -23,23c0,3.96 1.023,7.854 2.963,11.29l-2.926,10.44c-0.096,0.343 -0.003,0.711 0.245,0.966c0.191,0.197 0.451,0.304 0.718,0.304c0.08,0 0.161,-0.01 0.24,-0.029l10.896,-2.699c3.327,1.786 7.074,2.728 10.864,2.728c12.682,0 23,-10.318 23,-23c0,-12.682 -10.318,-23 -23,-23zM36.57,33.116c-0.492,1.362 -2.852,2.605 -3.986,2.772c-1.018,0.149 -2.306,0.213 -3.72,-0.231c-0.857,-0.27 -1.957,-0.628 -3.366,-1.229c-5.923,-2.526 -9.791,-8.415 -10.087,-8.804c-0.295,-0.389 -2.411,-3.161 -2.411,-6.03c0,-2.869 1.525,-4.28 2.067,-4.864c0.542,-0.584 1.181,-0.73 1.575,-0.73c0.394,0 0.787,0.005 1.132,0.021c0.363,0.018 0.85,-0.137 1.329,1.001c0.492,1.168 1.673,4.037 1.819,4.33c0.148,0.292 0.246,0.633 0.05,1.022c-0.196,0.389 -0.294,0.632 -0.59,0.973c-0.296,0.341 -0.62,0.76 -0.886,1.022c-0.296,0.291 -0.603,0.606 -0.259,1.19c0.344,0.584 1.529,2.493 3.285,4.039c2.255,1.986 4.158,2.602 4.748,2.894c0.59,0.292 0.935,0.243 1.279,-0.146c0.344,-0.39 1.476,-1.703 1.869,-2.286c0.393,-0.583 0.787,-0.487 1.329,-0.292c0.542,0.194 3.445,1.604 4.035,1.896c0.59,0.292 0.984,0.438 1.132,0.681c0.148,0.242 0.148,1.41 -0.344,2.771z" className="jsx-2d37e243a3a00329"></path></g></g></svg>
        );

      case "instagram": 
        return (
           <svg enableBackground="new 0 0 128 128" width={props.width} height={props.height} version="1.1" viewBox="0 0 128 128" ><g><linearGradient gradientTransform="matrix(1 0 0 -1 594 633)" gradientUnits="userSpaceOnUse" id="SVGID_1t" x1="-566.7114" x2="-493.2875" y1="516.5693" y2="621.4296"><stop offset="0" /><stop offset="1" /></linearGradient><circle cx="64" cy="64" fill="url(#SVGID_1t)" r="64"/></g><g><g><path d="M82.333,104H45.667C33.72,104,24,94.281,24,82.333V45.667C24,33.719,33.72,24,45.667,24h36.666    C94.281,24,104,33.719,104,45.667v36.667C104,94.281,94.281,104,82.333,104z M45.667,30.667c-8.271,0-15,6.729-15,15v36.667    c0,8.271,6.729,15,15,15h36.666c8.271,0,15-6.729,15-15V45.667c0-8.271-6.729-15-15-15H45.667z" fill="#FFFFFF"/></g><g><path d="M64,84c-11.028,0-20-8.973-20-20c0-11.029,8.972-20,20-20s20,8.971,20,20C84,75.027,75.028,84,64,84z     M64,50.667c-7.352,0-13.333,5.981-13.333,13.333c0,7.353,5.981,13.333,13.333,13.333S77.333,71.353,77.333,64    C77.333,56.648,71.353,50.667,64,50.667z" fill="#FFFFFF"/></g><g><circle cx="85.25" cy="42.75" fill="#FFFFFF" r="4.583"/></g></g></svg>
        );

      case "twitter":
        return (
             <svg viewBox="0 0 36 36" width={props.width} height={props.height} ><g transform="translate(-15 -164.999)"><circle cx="18" cy="18" r="18" transform="translate(15 164.999)"></circle><path d="M10.82,7.867,17.588,0h-1.6L10.107,6.831,5.414,0H0L7.1,10.33,0,18.58H1.6L7.81,11.366l4.957,7.214H18.18L10.819,7.867Zm-2.2,2.554L7.9,9.392,2.182,1.207H4.645L9.263,7.813l.719,1.029,6,8.586H13.521l-4.9-7.006Z" fill="#fff" transform="translate(23.91 173.709)"></path></g></svg>
        )    

      default:
        return null;
    }
  };
  if (loading) return <Div className="w-[100px] leading-[1] [&_span]:block"><Skeleton className='h-[15px] opacity-50 w-[100px]'/></Div>;
  return (
    <Div className={`flex justify-center pt-${props.top} pb-${props.bottom}`}>
      {headerSocial.map((menu) => menu.childmenu ?.filter((child) => child.isActive).map((child) => (
            <Link key={child._id} title={child.title} href={child.link} target={child.linkType ? `_blank` : `_self`} rel="nofollow" className={`block mx-[3px] order-${child.indexNum}`}>
              {getSVGIcon(child.title)}
            </Link>
          ))
      )}
    </Div>
  );
};

export default SocialLinks;

