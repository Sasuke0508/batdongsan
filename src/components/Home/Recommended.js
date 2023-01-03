import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import { recommendedData } from "../../constants";
import NewsCard from "../core/NewsCard";

function Recommended(props) {
    const [expandNews, setExpandNews] = useState(true);
    const navigate = useNavigate();
    const handleClickExpand = () => {
        navigate("/post");
    };
    return (
        <div className="recommended page-container-xl mt-4">
            <div className="d-flex align-items-center justify-content-between">
                <h3>Tin đăng dành cho bạn</h3>
                <div className="d-flex">
                    <span>
                        <a href="#">Tin đăng mới nhất</a>
                    </span>
                </div>
            </div>
            <NewsCard data={recommendedData} wrapItem={false}></NewsCard>
            {expandNews && <NewsCard data={recommendedData} wrapItem={false}></NewsCard>}
            <div className="w-100 mt-4 d-flex justify-content-center">
                <Button outline onClick={handleClickExpand} className="d-flex align-items-center">
                    {!expandNews ? "Xem thêm" : "Tất Cả"}
                </Button>
            </div>
        </div>
    );
}

export default Recommended;
