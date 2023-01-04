import React from "react";
import SearchBox from "../SearchBox";
import HotNews from "./HotNews";
import Recommended from "./Recommended";
import RecommendedByLocation from "./RecommendedByLocation";
import logo from "../../assets/img/home_background.webp";

function Home(props) {
    return (
        <div className="home-page position-relative">
            <img id="home-page-background" src={logo} alt="background" />
            <div className="" style={{ height: "670px" }}>
                <SearchBox />
            </div>
            <Recommended />
            <RecommendedByLocation />
            <HotNews />
        </div>
    );
}

export default Home;
