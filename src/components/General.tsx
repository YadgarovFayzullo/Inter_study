import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function General() {
  const location = useLocation();
  const [currentRoute, setCurrentRoute] = useState("");

 
  useEffect(() => {
    if (location.pathname === "/") {
      setCurrentRoute("Главная");
    } else if (location.pathname === "/redaction") {
      setCurrentRoute("Редакционная коллегия");
    } else if (location.pathname === "/rules") {
      setCurrentRoute("Условия");
    } else if (location.pathname === "/archive") {
      setCurrentRoute("Архив");
    } else if (location.pathname === "/about") {
      setCurrentRoute("О нас");
    }
  }, [location.pathname]);
  return (
    <div
      className="w-full h-96 mt-4 bg-fixed bg-cover bg-center"
      style={{ backgroundImage: 'url("/inter_library.jpg")' }}
    >
      <div className="flex items-center justify-center w-full h-full bg-black/50 text-white">
        <div className="flex flex-col justify-center w-[80%] mx-auto items-center">
          <h1 className="text-7xl mt-10 font-serif font-semibold">
            INTER STUDY
          </h1>
          <h3 className="flex mt-3 font-sans">{currentRoute}</h3>
        </div>
      </div>
    </div>
  );
}
