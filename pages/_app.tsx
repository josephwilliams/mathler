import React from "react";
import type { AppProps } from "next/app";
import Head from "next/head";

import "../styles/globals.css";
import "react-tooltip/dist/react-tooltip.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Mathler: for Dynamic, by Joseph</title>
        <meta name="description" content="Like Wordle, but with numbers." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
