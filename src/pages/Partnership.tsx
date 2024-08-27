import React from "react";
import Layout from "../components/Layout";
import Partners from "../components/Partners";
import { useTranslation } from "react-i18next";

export default function Partnership() {
  const { t } = useTranslation();

  return (
    <div>
      {/* <Helmet>
        <title>{t("partners")}</title>
      </Helmet> */}
      <Layout>
        <Partners />
      </Layout>
    </div>
  );
}
