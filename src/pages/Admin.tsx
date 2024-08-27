import React from "react";
import Sidebar from "../components/Sidebar";

export default function Admin() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-grow justify-center items-start mt-24">
        <h1 className="text-blue-500 font-Header text-center text-xl md:text-5xl">
          Вы вошли в страницу администратора
        </h1>
      </div>
    </div>
  );
}
