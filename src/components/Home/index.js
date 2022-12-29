import React from "react";
import SearchBox from "../SearchBox";
import Footer from "./Footer";
import HotNews from "./HotNews";
import News from "./News";
import Recommended from "./Recommended";
import RecommendedByLocation from "./RecommendedByLocation";
import TypicalEnterprise from "./TypicalEnterprise";
import Utility from "./Utility";

function Home(props) {
    return (
        <div className="home-page position-relative">
            <img id="home-page-background" src={require("../../assets/img/home_background.webp")} alt="background" />
            <div className="" style={{height : '670px'}}>
                <SearchBox />
            </div>
            {/* <News /> */}
            <Recommended />
            <RecommendedByLocation />
            <HotNews />
            <Utility />
            {/* <TypicalEnterprise /> */}
            {/* <Footer /> */}
        </div>
    );
}

export default Home;
