import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import HomeHero from "../sections/HomeHero";
import HomeHighlights from "../sections/HomeHighlights";
import HomeBestDeals from "../sections/HomeBestDeals";

export default function Home() {
  return (
    <>
      <Header />

      <HomeWrapper>
        <HomeHero />
        <HomeHighlights />
        <HomeBestDeals />
      </HomeWrapper>
    </>
  );
}

const HomeWrapper = styled.div`
  width: 1200px;
  margin: auto;
`;
