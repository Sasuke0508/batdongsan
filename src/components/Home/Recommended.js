import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Collapse } from "reactstrap";
import { postService } from "../../services";
import NewsCard from "../core/NewsCard";

function Recommended(props) {

    const user = useSelector(store => store.tokenSlice.user);

    const search = () => {
        postService.findAll({page: 1, limit: 16}, {
            sort: '-created',
            status: 'ACTIVE',
        })
        .then(res => res?.data)
        .then(data => data?.content)
        .then(content => {
            if (!content) return;
            setListPost1(content.slice(0, 8));
            setListPost2(content.slice(8, 16));
        })
    }

    useEffect(() => {
        search();
    }, [user]);

    const [listPost1, setListPost1] = useState([]);
    const [listPost2, setListPost2] = useState([]);
    const [expandNews, setExpandNews] = useState(false);
    const navigate = useNavigate();

    const handleClickExpand = () => {
        if (!expandNews) {
            setExpandNews(true);
            return;
        }
        navigate("/post");
    };

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

            <NewsCard data={listPost1} wrapItem={false} searchFunc={search}/>
            <Collapse isOpen={expandNews}>
                <NewsCard data={listPost2} wrapItem={false} searchFunc={search} />
            </Collapse>
            <div className="w-100 mt-4 d-flex justify-content-center">
                <Button outline onClick={handleClickExpand} className="d-flex align-items-center">
                    {!expandNews ? "Xem thêm" : "Tất Cả"}
                </Button>
            </div>
            
        </div>
    );
}

export default Recommended;
