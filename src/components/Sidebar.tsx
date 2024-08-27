import { useState } from "react";
import { LuNewspaper } from "react-icons/lu";
import { IoArchiveOutline } from "react-icons/io5";
import { FiBook } from "react-icons/fi";
import { Link } from "react-router-dom";
import { IoIosStats } from "react-icons/io";

const App = () => {
  const [open, setOpen] = useState(true);

  const Menus = [
    { title: "Новости", icon: <LuNewspaper />, path: "/adminNews" },
    { title: "Архив", icon: <IoArchiveOutline />, path: "/adminArchive" },
    { title: "Обложка", icon: <FiBook />, gap: true, path: "/adminBook" },
    {
      title: "Статистика",
      icon: <IoIosStats />,
      gap: true,
      path: "/adminStatistics",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-300">
      {/* Sidebar */}
      <div
        className={`${
          open ? "w-48" : "w-20"
        } bg-dark-purple h-screen p-5 pt-8 relative duration-300`}
      >
        <img
          src="/control.png"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-black
           border-2 rounded-full ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src="/is-logo.jpg"
            className={`cursor-pointer duration-500 rounded-full w-[50px] ${
              open ? "rotate-[360deg] w-[50px]" : ""
            }`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            INTER STUDY
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((menu, index) => (
            <Link
              to={menu.path}
              key={index}
              className={`flex items-center gap-x-4 p-2 rounded-md cursor-pointer hover:bg-light-white text-sm ${
                menu.gap ? "mt-9" : "mt-2"
              } ${index === 0 ? "" : ""}`}
            >
              {menu.icon}
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {menu.title}
              </span>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
