import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation();
  return (
    <div className="font-Montserrat text-justify">
      <h1 className="mt-10 ml-6 mb-5 mr-10">
        <span className="font-medium">{t("who")}</span>
        {t("location")}
        <br />
        {t("register")}
       
        <br />
        {t("created")}
      </h1>
      <div className="py-12 flex flex-col items-center">
        <div className="text-sm sm:text-xl lg:text-xl text-center text-white mb-1 bg-[#5d9cec] px-14 sm:px-22 md:px-22 lg:px-[64px]">
          {t("license")}
        </div>
        <a
          href="./guvohnoma.pdf"
          target="_blank"
        >
          <img
            className=" mx-auto w-[45%] sm:w-[35%] md:w-[40%] lg:w-[40%] max-w-[600px] mb-12 lg:shadow-xl lg:hover:shadow-2xl lg:duration-200"
            src="./guvohnoma.png"
          />
        </a>
      </div>
    </div>
  );
}
