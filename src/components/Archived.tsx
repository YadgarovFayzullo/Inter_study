import { useState } from "react";
import { useTranslation } from "react-i18next";

interface PdfFiles {
  [year: string]: string[];
}

const staticPdfFiles: PdfFiles = {
  "2024": [
    "/files/archive?name=Issue-5.pdf",
    "/files/archive?name=Issue-4.pdf",
  ]
};

export default function Archived() {
  const { t } = useTranslation();
  const [pdfFiles] = useState<PdfFiles>(staticPdfFiles);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [loading] = useState(false);
  const [error] = useState<string | null>(null);

  const formatFilename = (filename: string) => {
    return filename
      .replace(/\/files\/archive\?name=/gi, "")
      .replace(/\.pdf/gi, "");
  };

  const getFileIcon = () => (
    <svg
      className="w-5 h-5 text-red-500"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
        clipRule="evenodd"
      />
    </svg>
  );

  const getDownloadIcon = () => (
    <svg
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">{t("loading")}</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-500 text-lg">
          {t("error_loading_files")}: {error}
        </div>
      </div>
    );
  }

  const years = Object.keys(pdfFiles).sort((a, b) => parseInt(a) - parseInt(b));

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 font-Montserrat mb-2">
            {t("archived")}
          </h1>
          <p className="text-gray-600">Архивные выпуски журнала</p>
        </div>

        {/* Year Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          <button
            onClick={() => setSelectedYear(null)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedYear === null
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Все
          </button>
          {years.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedYear === year
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {year}
            </button>
          ))}
        </div>

        {/* Files List */}
        <div className="space-y-6">
          {years
            .filter((year) => selectedYear === null || year === selectedYear)
            .map((releaseYear) => (
              <div
                key={releaseYear}
                className="bg-white rounded-lg shadow-sm border border-gray-200"
              >
                {/* Year Header */}
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {releaseYear} год 
                  </h2>
                </div>

                {/* Files */}
                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {pdfFiles[releaseYear].map((filename, index) => (
                      <a
                        key={index}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors group"
                        href={filename}
                      >
                        <div className="flex items-center space-x-3">
                          {getFileIcon()}
                          <span className="text-sm font-medium text-gray-900 group-hover:text-blue-600">
                            {formatFilename(filename)}
                          </span>
                        </div>
                        <div className="ml-auto text-gray-400 group-hover:text-blue-600">
                          {getDownloadIcon()}
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
