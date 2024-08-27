import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import i18n from "../localization/i18n";

interface NavbarProps {
  changeLang: (newLang: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ changeLang }) => {
  const { t } = useTranslation();

  return (
    <header className="backdrop-blur-md bg-blue-600 fixed w-full z-20 top-0 start-0">
      <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between border-b-2 border-gray-100">
        <Link
          to={"/"}
          className="md:flex md:text-xl md:justify-center md:font-semibold text-white md:rounded md:py-1 md:px-2 hidden sm:block"
          style={{ fontFamily: "Dancing Script, cursive" }}
        >
          InterStudy
        </Link>
        <div className="sm:hidden">
          <FlyoutMenu changeLang={changeLang} />
        </div>
        <div className="hidden sm:flex sm:flex-row sm:justify-start">
          <RegularMenu changeLang={changeLang} />
        </div>
      </nav>
    </header>
  );
};

const RegularMenu: React.FC<{ changeLang: (newLang: string) => void }> = ({
  changeLang,
}) => {
  const { t } = useTranslation();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    changeLang(newLang);
  };

  return (
    <>
      <Link
        to={"/"}
        className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-white hover:bg-white/10"
      >
        {t("main")}
      </Link>
      <Link
        to={"/redaction"}
        className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-white hover:bg-white/10"
      >
        {t("redaction")}
      </Link>
      <Link
        to={"/rules"}
        className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-white hover:bg-white/10"
      >
        {t("conditions")}
      </Link>
      <Link
        to={"/archive"}
        className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-white hover:bg-white/10"
      >
        {t("archive")}
      </Link>
      <Link
        to={"/about"}
        className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-white hover:bg-white/10"
      >
        {t("about")}
      </Link>
      <select
        id="languages"
        className="bg-blue-600 mt-2 md:mt-0 text-white text-sm rounded-lg focus:ring-[#f0582f] focus:border-blue-500 p-2 lg:ml-3 font-Montserrat -ml-3"
        onChange={handleLanguageChange}
        value={i18n.language}
      >
        <option value="ru">Русский</option>
        <option value="uz">O'zbek</option>
      </select>
      <Link
        to={"/login"}
        className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-white hover:bg-white/10"
      >
        {t("login")}
      </Link>
    </>
  );
};

const FlyoutMenu: React.FC<{ changeLang: (newLang: string) => void }> = ({
  changeLang,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const { t } = useTranslation();

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="py-2 px-2 mt-1 mb-1 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-white bg-blue-100/10"
      >
        {t("menu")}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="absolute left-0 mt-2 w-full bg-white shadow-md rounded-md z-10"
          >
            <div className="py-1">
              <FlyoutMenuItem to={"/"}>{t("main")}</FlyoutMenuItem>
              <FlyoutMenuItem to={"/redaction"}>
                {t("redaction")}
              </FlyoutMenuItem>
              <FlyoutMenuItem to={"/archive"}>{t("archive")}</FlyoutMenuItem>
              <FlyoutMenuItem to={"/about"}>{t("about")}</FlyoutMenuItem>
              <FlyoutMenuItem to={"/login"}>{t("login")}</FlyoutMenuItem>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FlyoutMenuItem: React.FC<{ to: string; children: React.ReactNode }> = ({
  to,
  children,
}) => {
  return (
    <Link
      to={to}
      className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition duration-150"
    >
      {children}
    </Link>
  );
};

export default Navbar;
