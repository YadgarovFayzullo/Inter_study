import React from "react";
import Layout from "../components/Layout";
import Counter from "../components/Counter";
import Book from "../components/Book";
import News from "../components/News";
export default function Home() {
  return (
    <Layout>
      <Book />
      <Counter />
      <News />
    </Layout>
  );
}
