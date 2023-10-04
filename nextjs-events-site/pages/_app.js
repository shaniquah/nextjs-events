import Layout from "@/components/layout/layout";
import "@/styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>Niquáh's Events</title>
        <meta name="description" content="My NextJS Events" />
        <meta name="viewport" content="initial-scale-1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}
