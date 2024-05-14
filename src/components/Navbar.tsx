import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const Navbar = () => {
  return (
    <header className="backdrop-blur-md bg-white/10 fixed w-full z-20 top-0 start-0">
      <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between border-b-2 border-gray-100">
        <Link
          to={"/"}
          className=" md:flex md:text-xl md:justify-center md:font-semibold text-white md:rounded md:py-1 md:px-2 hidden sm:block" 
          style={{ fontFamily: "Dancing Script, cursive" }}
        >
          Inter Study
        </Link>
        <div className="sm:hidden">
          <FlyoutMenu />
        </div>
        <div className="hidden sm:flex sm:flex-row sm:justify-start">
          <RegularMenu />
        </div>
      </nav>
    </header>
  );
};

const RegularMenu = () => {
  return (
    <>
      <Link
        to={""}
        className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-white hover:bg-white/10 "
      >
        Главная
      </Link>
      <Link
        to={""}
        className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-white hover:bg-white/10 "
      >
        Редакционная коллегия
      </Link>
      <Link
        to={""}
        className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-white hover:bg-white/10 "
      >
        Условия
      </Link>
      <Link
        to={""}
        className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-white hover:bg-white/10 "
      >
        Архив
      </Link>
      <Link
        to={""}
        className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-white hover:bg-white/10 "
      >
        О нас
      </Link>
    </>
  );
};

const FlyoutMenu = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative f">
      <button
        onClick={() => setOpen(!open)}
        className=" py-2 px-2 mt-1 mb-1 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-white bg-blue-100/10"
      >
        Меню
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
              <FlyoutMenuItem to={"/"}>Главная</FlyoutMenuItem>
              <FlyoutMenuItem to={"/colleagues"}>
                Редакционная коллегия
              </FlyoutMenuItem>
              <FlyoutMenuItem to={"rules"}>Условия</FlyoutMenuItem>
              <FlyoutMenuItem to={"archive"}>Архив</FlyoutMenuItem>
              <FlyoutMenuItem to={"about"}>О нас</FlyoutMenuItem>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FlyoutMenuItem = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
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
