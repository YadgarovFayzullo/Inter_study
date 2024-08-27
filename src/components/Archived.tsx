import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { ARCHIVE, ROUTE } from "../utils/urls";

interface FileItem {
  year: string;
  filename: string;
}

interface PdfFiles {
  [year: string]: string[];
}

export default function Archived() {
  const { t } = useTranslation();
  const [pdfFiles, setPdfFiles] = useState<PdfFiles>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchByYear = async () => {
      try {
        const response = await axios.get<FileItem[]>(ARCHIVE);
        console.log("API Response:", response);

        if (response.status === 200 && response.data) {
          const files = response.data;

          const groupedFiles = files.reduce((acc: PdfFiles, file: FileItem) => {
            const year = file.year;
            if (!acc[year]) {
              acc[year] = [];
            }
            const decodedFilename = decodeURIComponent(file.filename);
            acc[year].push(decodedFilename);
            return acc;
          }, {});

          setPdfFiles(groupedFiles);
        } else {
          throw new Error("No data found");
        }
      } catch (error) {
        console.error("Error fetching data", error);
        setError("Error loading files");
      } finally {
        setLoading(false);
      }
    };

    fetchByYear();
  }, []);

  const formatFilename = (filename: string) => {
    return filename
      .replace(/\/files\/archive\?name=/gi, "")
      .replace(/\.pdf/gi, "");
  };

  if (loading) {
    return <div>{t("loading")}</div>;
  }

  if (error) {
    return (
      <div>
        {t("error_loading_files")}: {error}
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-center">
        <h1 className="mt-24 text-2xl font-Montserrat lg:text-3xl">
          {t("archived")}
        </h1>
      </div>
      <div className="grid grid-row-col auto-cols-max items-center justify-center md:justify-normal md:items-baseline md:ml-7 gap-5 mt-10 mb-96 md:flex">
        {Object.keys(pdfFiles).map((releaseYear) => (
          <div key={releaseYear}>
            <h1 className="bg-blue-500 rounded-md py-1 px-28 text-white">
              {releaseYear}
            </h1>
            <ul className="ml-[90px] mt-4">
              {pdfFiles[releaseYear].map((filename, index) => (
                <li key={index}>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#f0582f] transition-colors duration-300 text-xl"
                    href={`${ROUTE}${filename}`}
                  >
                    {formatFilename(filename)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
