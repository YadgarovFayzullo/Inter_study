import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import Button from "../components/ui/Button";
import { ARCHIVE, ROUTE } from "../utils/urls";

interface Archive {
  id: number;
  filename: string;
  createdAt: number;
}

export default function AdminArchive() {
  const [archive, setArchive] = useState<File | null>(null);
  const [year, setYear] = useState<string>("");
  const [yearError, setYearError] = useState<string>("");
  const [fileError, setFileError] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [fileInputKey, setFileInputKey] = useState<number>(Date.now());
  const [archives, setArchives] = useState<Archive[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = archives
    .sort((a, b) => b.id - a.id)
    .filter((item) =>
      decodeURIComponent(item.filename)
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    )
    .slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(
    archives.filter((item) =>
      decodeURIComponent(item.filename)
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    ).length / itemsPerPage
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const fetchArchives = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        setError("Token is missing");
        return;
      }
      
      const response = await axios.get<Archive[]>(ARCHIVE, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200 && Array.isArray(response.data)) {
        setArchives(response.data);
      } else {
        throw new Error("No data found");
      }
    } catch (error) {
      console.error("Error fetching archives:", error);
      setError("Error loading files");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArchives();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setArchive(file);
      setFileError("");
    }
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(event.target.value);
    setYearError("");
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let yearErrorText = "";
    let fileErrorText = "";

    if (!year) {
      yearErrorText = "Пожалуйста, выберите год";
    }

    if (!archive) {
      fileErrorText = "Пожалуйста, выберите файл";
    }
    setYearError(yearErrorText);
    setFileError(fileErrorText);

    if (year && archive) {
      const formData = new FormData();
      formData.append("year", year);
      formData.append("archive", archive);

      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          console.error("Token is missing");
          return;
        }

        await axios.post(ARCHIVE, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });

        fetchArchives();
        setYear("");
        setArchive(null);
        setFileInputKey(Date.now());
        setYearError("");
        setFileError("");
      } catch (error) {
        console.error("Error adding archive:", error);
      }
    }
  };

  const deleteBook = async (id: number) => {
    const confirmDelete = window.confirm("Вы действительно хотите удалить?");

    if (!confirmDelete) {
      return;
    }

    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        console.error("Token is missing");
        return;
      }

      await axios.delete(`${ARCHIVE}?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchArchives();
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const formatFilename = (filename: string) => {
    return filename
      .replace(/\/files\/archive\?name=/gi, "")
      .replace(/\.pdf/gi, "");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-0 flex flex-col">
        <div className="bg-white p-6 rounded-lg w-full mb-8 flex flex-col flex-1">
          <h1 className="text-2xl font-semibold mb-4 font-Arimo text-blue-500">
            АРХИВ
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col mb-4">
              <select
                id="year"
                name="year"
                value={year}
                onChange={handleYearChange}
                className="w-32 border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
              >
                <option value="">Год</option>
                 {/* <option value="2023">2023</option> */}
                <option value="2024">2024</option> 
                <option value="2025">2025</option>
              </select>
              {yearError && <p className="text-red-500">{yearError}</p>}
            </div>
            <input
              type="file"
              id="file"
              name="file"
              onChange={handleFileChange}
              accept=".pdf"
              className="mb-4"
              key={fileInputKey}
            />
            {fileError && <p className="text-red-500">{fileError}</p>}
            <div className="flex">
              <Button type="submit">Добавить</Button>
            </div>
          </form>
          <h3 className="text-xl font-semibold pt-5">История действий</h3>
          <input
            type="text"
            placeholder="Поиск..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="mb-4 p-2 border rounded"
          />
          <div className="flex-1">
            {currentItems.map((item) => (
              <div key={item.id} className="mb-2 cursor-pointer">
                <div className="text-blue-600 font-semibold">
                  <div>{formatFilename(item.filename)}</div>
                </div>
                <div className="flex gap-5">
                  <a
                    href={`${ROUTE}${decodeURIComponent(item.filename)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 font-semibold hover:text-blue-800"
                  >
                    Читать
                  </a>
                  <button
                    className="text-red-500 hover:text-red-700 font-semibold mr-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteBook(item.id);
                    }}
                  >
                    Удалить
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
