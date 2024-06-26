import React from "react";
import Layout from "../components/Layout";
import Colleagues from "../components/Colleagues";
import Counter from "../components/Counter";

export default function Home() {
  return (
    <Layout>
      <Colleagues />
      <Counter/>
    </Layout>
  );
}
