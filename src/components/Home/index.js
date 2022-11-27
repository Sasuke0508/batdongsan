import React from "react";
import SearchBox from "../SearchBox";
import News from "./News";

function Home(props) {
  return (
    <div className="home-page">
      <SearchBox />
      <News />
    </div>
  );
}

export default Home;
