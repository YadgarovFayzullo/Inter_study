import Layout from "../components/Layout";
import Counter from "../components/Counter";
import Book from "../components/Book";
export default function Home() {
  return (
    <Layout>
      <Book />
      <Counter />
      {/* <News /> */}
    </Layout>
  );
}
