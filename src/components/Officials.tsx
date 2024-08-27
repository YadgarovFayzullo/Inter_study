// import React from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// function Arrows(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{ ...style, display: "block" }}
//       onClick={onClick}
//     />
//   );
// }

// export default function Officials() {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     nextArrow: <Arrows />,
//     prevArrow: <Arrows />,
//     responsive: [
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 1,
//         },
//       },
//     ],
//   };

//   return (
//     <div className="mb-12 static">
//       <div className="flex justify-center">
//         <div className="w-4/5">
//           <Slider {...settings}>
//             <div className="w-1/4 px-2">
//               <a href="https://scholar.google.com/citations?user=M73-aO8AAAAJ&hl=ru">
//                 <img
//                   className="w-full mt-10"
//                   src="/google_scolar.png"
//                   alt="google_scholar"
//                 />
//               </a>
//             </div>
//             <div className="w-1/6 px-5 mt-10">
//               <a href="https://cyberleninka.ru/journal/n/inter-education-global-study?i=1132543">
//                 <img
//                   className="mt-12"
//                   src="/cyberleninka.png"
//                   alt="cyberleninka"
//                 />
//               </a>
//             </div>
//             <div className="w-1/4 px-2 mt-10 ml-10">
//               <a href="https://zenodo.org/records/11112518">
//                 <img className="w-[80%]" src="/zenodo.png" alt="zenodo" />
//               </a>
//             </div>
//             <div>
//               <a href="https://slib.uz/ru/journal/view?id=356">
//                 <img src="/slib.uz.png" alt="slib.uz" />
//               </a>
//             </div>
//             <div className="w-1/4 px-2">
//               <a>
//                 <img
//                   className="w-1/2 mt-10 ml-20"
//                   src="/DOI_logo.svg.png"
//                   alt="doi"
//                 />
//               </a>
//             </div>
//             <div className="w-1/4 px-2">
//               <a>
//                 <img className="w-[90%]" src="/anti_plag.png" alt="anti_plag" />
//               </a>
//             </div>
//           </Slider>
//         </div>
//       </div>
//     </div>
//   );
// }
