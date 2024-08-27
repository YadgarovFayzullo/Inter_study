import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";export default function General() {
  const location = useLocation();
  const [currentRoute, setCurrentRoute] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    if (location.pathname === "/") {
      setCurrentRoute(t("main"));
    } else if (location.pathname === "/redaction") {
      setCurrentRoute(t("redaction"));
    } else if (location.pathname === "/rules") {
      setCurrentRoute(t("conditions"));
    } else if (location.pathname === "/archive") {
      setCurrentRoute(t("archive"));
    } else if (location.pathname === "/about") {
      setCurrentRoute(t("archive"));
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
