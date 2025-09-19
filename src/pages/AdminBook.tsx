// import React, { useState, ChangeEvent, FormEvent } from "react";
// import axios from "axios";
// import Sidebar from "../components/Sidebar";
// import Button from "../components/ui/Button";
// import { COVER } from "../utils/urls";

// interface BookItem {
//   id: number;
//   file: string;
// }

// const AdminBook: React.FC = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [error, setError] = useState<string>("");
//   const [imageList, setImageList] = useState<BookItem[]>([]);

//   const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
//     const selectedFile = e.target.files ? e.target.files[0] : null;
//     setFile(selectedFile);
//     setError("");
//   };

//   const addBook = async (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     if (!file) {
//       setError("Пожалуйста, загрузите фото.");
//       return;
//     }

//     try {
//       const token = localStorage.getItem("access_token");
//       if (!token) {
//         throw new Error("Token is missing");
//       }

//       const formData = new FormData();
//       formData.append("file", file);

//       const response = await axios.post(COVER, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       console.log("file added successfully:", response.data);

//       const bookItem: BookItem = {
//         id: response.data.id,
//         file: URL.createObjectURL(file),
//       };

//       setImageList([...imageList, bookItem]);
//       setFile(null);
//       setError("");
//     } catch (error: any) {
//       console.error("Error adding book:", error);
//       setError(`Error adding book: ${error.message}`);
//     }
//   };

//   const deleteBook = (id: number) => {
//     setImageList(imageList.filter((item) => item.id !== id));
//   };

//   return (
//     <div className="flex h-screen">
//       <Sidebar />
//       <div className="flex-1 p-0 flex flex-col items-start">
//         <div className="bg-white p-6 rounded-lg w-full mb-4">
//           <h1 className="text-2xl font-semibold mb-4 font-Arimo text-blue-500">
//             ОБЛОЖКА
//           </h1>
//           <form onSubmit={addBook}>
//             <div className="mb-4">
//               <label
//                 htmlFor="file"
//                 className="block text-gray-700 font-bold mb-2"
//               >
//                 Загрузить изображение
//               </label>
//               <input
//                 type="file"
//                 id="file"
//                 className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
//                 accept="image/*"
//                 onChange={handleImageUpload}
//               />
//             </div>
//             {error && <p className="text-red-500 mb-4">{error}</p>}
//             <Button type="submit">Добавить обложку</Button>
//           </form>
//         </div>
//         <h3 className="text-xl font-semibold pl-6">История действий</h3>
//         <div className="max-w-lg w-full pl-3">
//           {imageList.map((bookItem) => (
//             <div
//               key={bookItem.id}
//               className="bg-white p-4 mb-4 rounded-lg shadow-md w-full flex items-center"
//             >
//               {bookItem.file && (
//                 <img
//                   src={bookItem.file}
//                   alt="Book Cover"
//                   className="w-[20%] h-auto rounded-md mr-4"
//                 />
//               )}
//               <div>
//                 <div className="flex items-end justify-items-end">
//                   <button
//                     className="text-red-500 hover:text-red-700 font-semibold mr-2"
//                     onClick={() => deleteBook(bookItem.id)}
//                   >
//                     Удалить
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminBook;
