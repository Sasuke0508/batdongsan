import React from "react";
import { Col, Row } from "reactstrap";

function HotNews(props) {
    const data = [
        {
            id: 1,
            title: "7 Câu Hỏi Thường Gặp Khi Thuê Nhà Trọ Nguyên Căn",
            image_url:
                "https://file4.batdongsan.com.vn/crop/610x342/2022/11/27/JGcIp0rf/20221127133230-5aa0.jpg",
        },
        {
            id: 2,
            title: "Sale Bất Động Sản Là Gì? Kỹ Năng Chốt Sale Cho Người Mới",
            image_url:
                "https://file4.batdongsan.com.vn/crop/610x342/2022/11/26/JGcIp0rf/20221126214637-f6d1.jpg",
        },
        {
            id: 3,
            title: "Quy Hoạch Nhà Đất cho thuê 1/2000 Là Gì Và 4 Câu Hỏi Cần Làm Rõ",
            image_url:
                "https://file4.batdongsan.com.vn/crop/610x342/2022/11/25/JGcIp0rf/20221125134518-8551.jpg",
        },
    ];
    return (
        <div className="mt-3 hot-news page-container-xl">
            <h3>Tin tức tiêu điểm</h3>
            <Row>
                {data.map((item, index) => (
                    <Col className="hot-news__item" md={4} key={index}>
                        <div>
                            <img
                                className="item__image"
                                src={item.image_url}
                                alt="hot-news"
                            />
                            <div className="d-flex mt-3">
                                <div>
                                    <h2>0{item.id}</h2>
                                </div>
                                <div className="ms-3">
                                    <h6>{item.title}</h6>
                                </div>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default HotNews;
