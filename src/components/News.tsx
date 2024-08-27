import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { NEWS, ROUTE } from "../utils/urls";

interface NewsItem {
  id: number;
  link: string;
  image?: string;
  title: string;
  subtitle: string;
}

interface NewsState {
  newsItems: NewsItem[];
  loading: boolean;
}

export default function News() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 2;
  const [newsState, setNewsState] = useState<NewsState>({
    newsItems: [],
    loading: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<NewsItem[]>(NEWS);
        console.log("Fetched data:", response.data);

        if (Array.isArray(response.data)) {
          setNewsState({
            newsItems: response.data,
            loading: false,
          });
        } else {
          console.error("Fetched data is not an array:", response.data);
          setNewsState({
            newsItems: [],
            loading: false,
          });
        }
      } catch (error) {
        console.error("Error fetching news data:", error);
        setNewsState({
          newsItems: [],
          loading: false,
        });
      }
    };

    fetchData();
  }, []);

  const handleClick = (page: number) => {
    setCurrentPage(page);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = newsState.newsItems.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <section className="py-10 mb-5 flex flex-col justify-around font-Montserrat">
      <div className="text-center">
        <h1 className="text-5xl">{t("news")}</h1>
      </div>
      {newsState.loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="flex justify-around">
          <div className="flex flex-row gap-10 md:gap-28 md:justify-around flex-wrap mt-12 max-w-[70%] md:max-w-full">
            {currentItems.length > 0 ? (
              currentItems.map((item) => (
                <a
                  key={item.id}
                  href={item.link}
                  className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl lg:justify-around lg:shadow-lg hover:shadow-xl duration-200"
                >
                  {item.image && (
                    <img
                      className="object-cover w-full rounded-t-lg h-full md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                      src={`${ROUTE}${item.image}`}
                      alt={item.title}
                    />
                  )}
                  <div className="flex flex-col justify-between p-2 leading-normal">
                    <h2 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900">
                      {item.title}
                    </h2>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      {item.subtitle}
                    </p>
                  </div>
                </a>
              ))
            ) : (
              <div className="text-center">No news items available.</div>
            )}
          </div>
        </div>
      )}
      <div className="flex justify-center mt-5">
        {Array.from({
          length: Math.ceil(newsState.newsItems.length / itemsPerPage),
        }).map((_, index) => (
          <button
            key={index}
            className={`mx-2 px-4 py-2 border border-gray-200 rounded-full ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-white text-blue-500"
            } transition-colors duration-300 hover:bg-blue-500 hover:text-white`}
            onClick={() => handleClick(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </section>
  );
}
