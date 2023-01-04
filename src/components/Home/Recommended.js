import React from "react";
import useSearchPost from "../../hooks/useSearchPost";
import NewsCard from "../core/NewsCard";

function Recommended(props) {

    const { listPost, totalPage, searchFunc } = useSearchPost('findAll');

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
            <NewsCard data={listPost} wrapItem={false} isShowMore={totalPage == 1} searchFunc={searchFunc}/>
        </div>
    );
}

export default Recommended;
