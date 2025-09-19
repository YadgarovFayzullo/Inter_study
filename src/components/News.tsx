import { useState } from "react";
import { useTranslation } from "react-i18next";

interface NewsItem {
  id: number;
  link: string;
  image?: string;
  title: string;
  subtitle: string;
}

// Статичные данные новостей
const staticNewsItems: NewsItem[] = [
  {
    id: 1,
    link: "#",
    image: "/images/news/enrollment-9.jpg",
    title: "Начался набор на 9й выпуск!",
    subtitle:
      "Открыт прием заявок на участие в девятом выпуске нашей программы. Присоединяйтесь к нашему сообществу профессионалов!",
  },
  {
    id: 2,
    link: "#",
    image: "/images/news/graduation-8.jpg",
    title: "Выпуск 8-го потока студентов",
    subtitle:
      "Поздравляем выпускников восьмого потока с успешным завершением обучения. Желаем успехов в карьере!",
  },
  {
    id: 3,
    link: "#",
    image: "/images/news/conference-2024.jpg",
    title: "Ежегодная конференция 2024",
    subtitle:
      "Приглашаем всех желающих принять участие в нашей ежегодной конференции, где будут представлены новейшие технологии и тренды.",
  },
  {
    id: 4,
    link: "#",
    image: "/images/news/partnership.jpg",
    title: "Новое партнерство с ведущими компаниями",
    subtitle:
      "Мы рады объявить о заключении партнерских соглашений с крупнейшими IT-компаниями для обеспечения трудоустройства наших выпускников.",
  },
  {
    id: 5,
    link: "#",
    image: "/images/news/scholarship.jpg",
    title: "Программа стипендий для талантливых студентов",
    subtitle:
      "Запущена новая программа стипендий для поддержки одаренных студентов. Подача заявок открыта до конца месяца.",
  },
  {
    id: 6,
    link: "#",
    image: "/images/news/online-courses.jpg",
    title: "Запуск онлайн-курсов",
    subtitle:
      "Теперь наши курсы доступны в онлайн-формате! Обучайтесь из любой точки мира в удобное для вас время.",
  },
];

export default function News() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 2;
  const [newsItems] = useState<NewsItem[]>(staticNewsItems);
  const [loading] = useState(false);

  const handleClick = (page: number) => {
    setCurrentPage(page);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = newsItems.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <section className="py-10 mb-5 flex flex-col justify-around font-Montserrat">
      <div className="text-center">
        <h1 className="text-5xl">{t("news")}</h1>
      </div>
      {loading ? (
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
                      src={`{item.image}`}
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
          length: Math.ceil(newsItems.length / itemsPerPage),
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
