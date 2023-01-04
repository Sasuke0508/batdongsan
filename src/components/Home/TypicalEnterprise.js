import React from "react";
import { Carousel, Col, Row, UncontrolledCarousel } from "reactstrap";

function TypicalEnterprise(props) {
    const data = [
        {
            key: 1,
            image_url:
                "https://file4.batdongsan.com.vn/2022/06/20/20220620172747-7226.jpg",
        },
        {
            key: 2,
            image_url:
                "https://file4.batdongsan.com.vn/2022/08/25/20220825105336-1842_wm.jpg",
        },
        {
            key: 3,
            image_url:
                "https://file4.batdongsan.com.vn/2021/10/27/20211027081258-eb6e.jpg",
        },
        {
            key: 4,
            image_url:
                "https://file4.batdongsan.com.vn/2022/07/29/20220729164008-175e_wm.jpg",
        },
        {
            key: 5,
            image_url:
                "https://file4.batdongsan.com.vn/2022/10/04/20221004162734-2dfa_wm.jpg",
        },
        {
            key: 6,
            image_url:
                "https://file4.batdongsan.com.vn/2022/11/28/20221128162705-0930_wm.jpg",
        },
        {
            key: 7,
            image_url:
                "https://file4.batdongsan.com.vn/2021/03/31/PGsxuI1y/20210331083455-ba40.jpg",
        },
        {
            key: 8,
            image_url:
                "https://file4.batdongsan.com.vn/2022/08/30/20220830095644-3a29_wm.jpg",
        },
    ];
    return (
        <div className="typical-enterprise page-container-xl my-5">
            <h3>Doanh nghiệp tiêu biểu</h3>
            <Row className="enterprise__list mt-3">
                {data.map((item, index) => (
                    <Col  md={2} key={index}>
                        <div className="enterprise__item mx-2">
                            <img
                                className="item__image"
                                alt="enterprise"
                                src={item.image_url}
                            />
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default TypicalEnterprise;
