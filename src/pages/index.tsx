import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { NextPage } from "next";
import Head from "next/head";

import { Navbar } from "@/components/navbar/navbar";

import { useAppSelector } from "@/hooks";
import { selectSearchInput } from "@/store/slices/resultsSlice";
import { Container, Typography } from "@mui/material";
import ResultsComponent from "../components/resultsComponent/resultsComponent";

export const Home: NextPage = () => {
  const search = useAppSelector(selectSearchInput);

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="find result" content="resultsPage" />
        <title>ROLI Music</title>
      </Head>

      <main>
        <Navbar />
        <Container>
          {!!search ? (
            <ResultsComponent />
          ) : (
            <Typography
              sx={{ mt: 5, mb: 2, margin: "0" }}
              fontSize="1.8rem"
              fontWeight="400"
              variant="h1"
            >
              Start by searching for some keywords, album names (try Thriller or
              The Dark Side of the Moon) or artist names (try Tool or DJ
              Shadow).
            </Typography>
          )}
        </Container>
      </main>
    </>
  );
};

export default Home;
