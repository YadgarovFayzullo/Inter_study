import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import axios, { AxiosResponse } from "axios";
import Button from "../components/ui/Button";
import { ROUTE, NEWS } from "../utils/urls";

interface NewsItem {
  id: number;
  title: string;
  subtitle: string;
  date?: string;
  image?: string;
}

export default function AdminNews() {
  const [title, setTitle] = useState<string>("");
  const [subtitle, setSubtitle] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [errors, setErrors] = useState({
    title: "",
    subtitle: "",
    image: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response: AxiosResponse<NewsItem[]> = await axios.get(NEWS);
        if (Array.isArray(response.data)) {
          setNewsList(response.data);
        } else {
          console.error("Unexpected response data format:", response.data);
          setNewsList([]);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const titleErrorText = title ? "" : "Введите заголовок";
    const subtitleErrorText = subtitle ? "" : "Введите описание";
    const imageErrorText = image || editMode ? "" : "Загрузите изображение";

    setErrors({
      title: titleErrorText,
      subtitle: subtitleErrorText,
      image: imageErrorText,
    });

    if (!titleErrorText && !subtitleErrorText && !imageErrorText) {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("subtitle", subtitle);
      if (image) formData.append("image", image);

      try {
        setLoading(true);
        const token = localStorage.getItem("access_token");

        let response: AxiosResponse<NewsItem>;
        if (editMode && editId !== null) {
          response = await axios.patch(`${NEWS}?id=${editId}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.data && response.data.id) {
            setNewsList((prevList) =>
              prevList.map((item) =>
                item.id === editId ? response.data : item
              )
            );
          }
          setEditMode(false);
          setEditId(null);
        } else {
          response = await axios.post(NEWS, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.data && response.data.id) {
            setNewsList((prevList) => [...prevList, response.data]);
          }
        }

        setTitle("");
        setSubtitle("");
        setImage(null);
        setImagePreview(null);
      } catch (error) {
        console.log("Error adding news", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const deleteNews = async (id: number) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("access_token");
      await axios.delete(`${NEWS}?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNewsList((prevNewsList) =>
        prevNewsList.filter((item) => item.id !== id)
      );
    } catch (error) {
      console.error("Error deleting news:", error);
    } finally {
      setLoading(false);
    }
  };

  const editNews = (newsItem: NewsItem) => {
    setTitle(newsItem.title);
    setSubtitle(newsItem.subtitle);
    setImagePreview(newsItem.image || null);
    setEditMode(true);
    setEditId(newsItem.id);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-0 flex flex-col items-start">
        <div className="bg-white p-6 rounded-lg w-full mb-4">
          <h1 className="text-2xl font-semibold mb-4 font-Arimo text-blue-500">
            НОВОСТИ
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-gray-700 font-bold mb-2"
              >
                Заголовок
              </label>
              <input
                type="text"
                name="title"
                id="title"
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                placeholder="Введите заголовок"
                value={title}
                spellCheck="true"
                onChange={(e) => {
                  setTitle(e.target.value);
                  setErrors({ ...errors, title: "" });
                }}
              />
              {errors.title && <p className="text-red-500">{errors.title}</p>}
            </div>
            <div className="mb-4">
              <label
                htmlFor="subtitle"
                className="block text-gray-700 font-bold mb-2"
              >
                Описание
              </label>
              <textarea
                id="subtitle"
                name="subtitle"
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                placeholder="Введите описание"
                rows={4}
                value={subtitle}
                spellCheck="true"
                onChange={(e) => {
                  setSubtitle(e.target.value);
                  setErrors({ ...errors, subtitle: "" });
                }}
              ></textarea>
              {errors.subtitle && (
                <p className="text-red-500">{errors.subtitle}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="image"
                className="block text-gray-700 font-bold mb-2"
              >
                Загрузить изображение
              </label>
              <input
                type="file"
                name="file"
                id="image"
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                accept="image/*"
                onChange={(e) => {
                  handleImageUpload(e);
                  setErrors({ ...errors, image: "" });
                }}
              />
              {errors.image && <p className="text-red-500">{errors.image}</p>}
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-2 w-[15%] h-auto"
                />
              )}
            </div>
            <Button type="submit" disabled={loading}>
              {loading
                ? "Loading..."
                : editMode
                ? "Обновить новость"
                : "Добавить новость"}
            </Button>
          </form>
        </div>
        <h3 className="text-xl font-semibold pl-6">История действий</h3>
        <div className="">
          <div className="max-w-lg w-full">
            {Array.isArray(newsList) &&
              newsList.map((newsItem) => (
                <div
                  key={newsItem.id}
                  className="border-b border-t mt-3 p-4 mb-4 w-full flex items-center"
                >
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      {newsItem.title}
                    </h3>
                    <p className="text-gray-700 mb-2">{newsItem.subtitle}</p>
                    {newsItem.date && (
                      <p className="text-gray-600 mb-2">
                        Дата:{" "}
                        {new Date(newsItem.date).toLocaleDateString("ru-RU", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "2-digit",
                        })}
                      </p>
                    )}
                    {newsItem.image && (
                      <>
                        <img
                          src={`${ROUTE}${newsItem.image}`}
                          alt="Preview"
                          className="mt-2 w-[15%] h-auto"
                        />
                      </>
                    )}
                    <div className="mt-2">
                      <button
                        className="text-red-500 hover:text-red-700 font-semibold mr-2"
                        onClick={() => deleteNews(newsItem.id)}
                      >
                        Удалить
                      </button>
                      <button
                        className="text-blue-500 hover:text-blue-700 font-semibold"
                        onClick={() => editNews(newsItem)}
                      >
                        Редактировать
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
