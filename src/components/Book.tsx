import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { COVER } from "../utils/urls";

export default function Book() {
  const { t } = useTranslation();
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const response = await axios.get(COVER, {
          responseType: "blob",
        });
        const url = URL.createObjectURL(response.data);
        setImageUrl(url);
        setLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
        setLoading(false);
      }
    };

    fetchFile();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="mt-5 lg:mt-10 overflow-hidden flex flex-col lg:flex-row items-center">
      <div className="lg:w-1/3 lg:ml-24 xl:ml-[100px] flex items-center justify-around">
        {imageUrl && (
          <img
            className="shadow-lg rounded-lg lg:ml-1 lg:mr-0 lg:shadow-lg hover:shadow-2xl duration-200 w-[70%] md:w-4/6 lg:w-full xl:w-2/3"
            src={imageUrl}
            alt="Cover"
          />
        )}
      </div>
      <div className="w-full mt-5 lg:w-2/3 xl:w-1/2 md:mt-0 lg:mt-0 lg:ml-20 lg:mr-6">
        <div className="flex md:justify-center md:ml-12 lg:text-gray-500">
          <p className="flex ml-2 mr-2 font-Montserrat text-justify">
            {t("book")} <br />
            <br />
            {t("book-two")}
          </p>
        </div>
      </div>
    </div>
  );
}
