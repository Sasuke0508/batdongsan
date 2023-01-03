import React, { useRef } from "react";
import { Col, Row } from "reactstrap";
import DragToScroll from "../core/DragToScroll";

function RecommendedByLocation(props) {
    const data = [
        {
            id: 0,
            title: "Cầu Giấy",
            post_count: 53915,
            url: "https://batdongsan.com.vn/nha-dat-ban-ha-noi",
            image_url: "https://file4.batdongsan.com.vn/images/newhome/cities1/HN-web-1.jpg",
        },
        {
            id: 1,
            title: "Thanh Xuân",
            post_count: 55928,
            url: "https://batdongsan.com.vn/nha-dat-ban-tp-hcm",
            image_url: "https://file4.batdongsan.com.vn/images/newhome/cities1/HCM-web-1.jpg",
        },
        {
            id: 2,
            title: "Hai Bà Trưng",
            post_count: 4030,
            url: "https://batdongsan.com.vn/nha-dat-ban-da-nang",
            image_url: "https://file4.batdongsan.com.vn/images/newhome/cities1/DDN-web-1.jpg",
        },
        {
            id: 3,
            title: "Đống Đa",
            post_count: 5629,
            url: "https://batdongsan.com.vn/nha-dat-ban-binh-duong",
            image_url: "https://file4.batdongsan.com.vn/images/newhome/cities1/BD-web-1.jpg",
        },
        {
            id: 4,
            title: "Bắc Từ Liêm",
            post_count: 3323,
            url: "https://batdongsan.com.vn/nha-dat-ban-dong-nai",
            image_url: "https://file4.batdongsan.com.vn/images/newhome/cities1/DNA-web-2.jpg",
        },
    ];

    const dataTags = [
        "Phòng trọ sinh viên",
        "Trọ Bách Kinh Xây",
        "Cho thuê nhà nguyên căn",
        "Cho thuê chung cư",
        "Trọ khu vực cầu giấy",
        "Trọ 2-3 triệu",
        "Phòng trọ Hà Đông",
        "Cho thuê phòng trọ",
    ];
    const handleClickCard = (url) => {
        window.open(url, "_blank", "noopener,noreferrer");
    };

    const tagContainerRef = useRef();
    return (
        <div className="location-recommended my-4 mt-5 page-container-xl">
            <h3>Tin đăng theo địa điểm</h3>
            <Row>
                <Col md={6}>
                    <div className="mt-3 position-relative" onClick={() => handleClickCard(data[0].url)}>
                        <img src={data[0].image_url} alt="location-recommended" className="w-100" />
                        <div className="card__title position-absolute">
                            <h5>{data[0].title}</h5>
                            <h6>{data[0].post_count} Tin đăng</h6>
                        </div>
                    </div>
                </Col>
                <Col md={6}>
                    <Row>
                        {data.map(
                            (item, index) =>
                                index > 0 && (
                                    <Col md={6} key={index}>
                                        <div className="mt-3 position-relative" onClick={() => handleClickCard(item.url)}>
                                            <img src={item.image_url} alt="location-recommended" className="w-100" />
                                            <div className="card__title position-absolute">
                                                <h5>{item.title}</h5>
                                                <h6>{item.post_count} Tin đăng</h6>
                                            </div>
                                        </div>
                                    </Col>
                                )
                        )}
                    </Row>
                </Col>
            </Row>
            <div ref={tagContainerRef} className="recommended__tags">
                <DragToScroll active={true} childrenClassName={"tags__item"}>
                    <div className="d-flex mt-3">
                        {dataTags.map((item, index) => (
                            <div className="tags__item cursor-pointer mx-2 p-2 px-3" key={index}>
                                {item}
                            </div>
                        ))}
                    </div>
                </DragToScroll>
            </div>
        </div>
    );
}

export default RecommendedByLocation;
