import React, { ReactNode, useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import General from "./General";
import { Analytics } from "@vercel/analytics/react";
import i18n from "../localization/i18n";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "ru"
  );

  useEffect(() => {
    if (language) {
      localStorage.setItem("language", language);
      i18n.changeLanguage(language);
    }
  }, [language]);

  return (
    <div>
      <Navbar changeLang={setLanguage} />
      <General />
      {children}
      <Analytics />
      <Footer />
    </div>
  );
};

export default Layout;
