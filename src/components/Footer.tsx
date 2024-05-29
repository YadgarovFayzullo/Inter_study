import { FaTelegram } from "react-icons/fa6";

export default function Footer() {
  return (
    <div>
      <footer className="bg-blue-white font-sans bg-[#282828]">
        <div className="container px-6 py-12 mx-auto">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
            <div className="sm:col-span-2">
              <h1 className="max-w-lg text-xl font-semibold tracking-tight text-white xl:text-2xl">
                Есть предложения? Пишите в нашу почту
              </h1>
              <div className="flex flex-col mx-auto mt-6 space-y-3 md:space-y-0 md:flex-row">
                <a href="mailto:pedagogicalperspective2023@gmail.com" className="button">
                  <button className="backdrop-blur-md w-full px-6 py-2.5 text-sm font-medium tracking-wider text-white transition-colors duration-300 transform md:w-auto md:mx-4 focus:outline-none rounded-lg hover:bg-white/10 bg-gray-100/50 focus:ring focus:ring-gray-300 focus:ring-opacity-80">
                    Написать
                  </button>
                </a>
              </div>
            </div>
            <div>
              <p className="font-semibold text-white">Quick Link</p>
              <div className="flex flex-col items-start mt-5 space-y-2">
                <p className="text-white transition-colors duration-300 hover:underline hover:cursor-pointer hover:text-blue-500">
                  Home
                </p>
                <p className="text-white transition-colors duration-300 hover:underline hover:cursor-pointer hover:text-blue-500">
                  Who We Are
                </p>
                <p className="text-white transition-colors duration-300 hover:underline hover:cursor-pointer hover:text-blue-500">
                  Our Philosophy
                </p>
              </div>
            </div>
            <div>
              <p className="font-semibold text-white">Industries</p>
              <div className="flex flex-col items-start mt-5 space-y-2">
                <p className="text-white transition-colors duration-300 hover:underline hover:cursor-pointer hover:text-blue-500">
                  Retail & E-Commerce
                </p>
                <p className="text-white transition-colors duration-300 hover:underline hover:cursor-pointer hover:text-blue-500">
                  Information Technology
                </p>
                <p className="text-white transition-colors duration-300 hover:underline hover:cursor-pointer hover:text-blue-500">
                  Finance & Insurance
                </p>
              </div>
            </div>
          </div>
          <hr className="my-6 border-gray-200 md:my-8 h-2" />
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="flex gap-4 hover:cursor-pointer">
            <FaTelegram size={30} className="text-white hover:text-blue-500 duration-300"/>
            </div>
          </div>
          <p className="text-white font-sans p-8 text-start md:text-center md:text-lg md:p-4">
            © 2024 Inter Study. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
