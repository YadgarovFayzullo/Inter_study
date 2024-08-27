import { useTranslation } from "react-i18next";

const Colleagues = () => {
  const { t } = useTranslation();
  return (
    <div className="flex justify-center mr-2 ml-3 font-Montserrat text-justify">
      <div className="mt-10 px-2">
        <h1>
          <span className="font-medium">{t("main-red")}</span> {t("name-red")}
          <br />
          <span className="font-medium">{t("main-preds")}</span>
          {t("name-preds")}
        </h1>
        <div className="flex justify-center pt-5 pb-5">
          <div className="font-medium text-lg text-center lg:text-xl">
            {t("tahrir-hayati")}
          </div>
        </div>

        <div>{t("tahrir-secondnames")}</div>
        <p className="mb-6 md:mt-[20px]">
          <span className="font-medium">{t("masul-kotib")} </span>
          {t("masul-name")}
          <br />
          {t("masul-ped")}
        </p>
      </div>
    </div>
  );
};

export default Colleagues;
