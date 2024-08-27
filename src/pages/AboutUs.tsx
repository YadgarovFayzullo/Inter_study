import React from "react";
import Layout from "../components/Layout";
import About from "../components/About";
import { useTranslation } from "react-i18next";
export default function AboutUs() {
  const { t } = useTranslation();

  return (
    <div>
      {/* <Helmet>
        <title> {t("about")}</title>
      </Helmet> */}
      <Layout>
        <About />
      </Layout>
    </div>
  );
}
