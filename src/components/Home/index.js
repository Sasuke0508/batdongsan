import React from "react";
import SearchBox from "../SearchBox";
import News from "./News";
import Recommended from "./Recommended";

function Home(props) {
    return (
        <div className="home-page">
            <SearchBox />
            <News />
            <Recommended />
        </div>
    );
}

export default Home;
