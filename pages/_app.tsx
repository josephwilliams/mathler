import type { AppProps } from "next/app";
import Head from "next/head";

import "../styles/globals.css";
import { GameHistoryProvider } from "@/contexts/GameHistoryContext";
import { BoardProvider } from "@/contexts/BoardContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Mathler: for Dynamic, by Joseph</title>
        <meta name="description" content="Like Wordle, but with numbers." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GameHistoryProvider>
        <BoardProvider>
          <Component {...pageProps} />
        </BoardProvider>
      </GameHistoryProvider>
    </>
  );
}

export default MyApp;
