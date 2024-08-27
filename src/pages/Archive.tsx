import React from "react";
import Layout from "../components/Layout";
import Archived from "../components/Archived";

import { useTranslation } from "react-i18next";
export default function Archive() {
  const { t } = useTranslation();

  return (
    <div>
      {/* <Helmet>
        <title>{t("archive")}</title>
      </Helmet> */}
      <Layout>
        <Archived />
      </Layout>
    </div>
  );
}
