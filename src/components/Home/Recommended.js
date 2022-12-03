import React from "react";
import { recommendedData } from "../../constants";
import NewsCard from "../core/NewsCard";

function Recommended(props) {
    return (
        <div className="recommended page-container-xl mt-4">
            <div className="d-flex align-items-center justify-content-between">
                <h3>Bất động sản dành cho bạn</h3>
                <div className="d-flex">
                    <span>
                        <a href="#">Tin nhà đất bán mới nhất</a>
                    </span>
                    <span className="mx-2">|</span>
                    <span>
                        <a href="#">Tin nhà đất cho thuê mới nhất</a>
                    </span>
                </div>
            </div>
            <NewsCard data={recommendedData} wrapItem={false}></NewsCard>
        </div>
    );
}

export default Recommended;
