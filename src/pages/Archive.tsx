import Layout from "../components/Layout";
import Archived from "../components/Archived";
export default function Archive() {

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
