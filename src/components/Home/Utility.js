import React from "react";
import { Col, Row } from "reactstrap";

function Utility(props) {
    const data = [
        {
            title: "Xem tuổi xây nhà",
            image_url: "https://staticfile.batdongsan.com.vn/images/icons/color/ic-ying-yang.svg",
        },
        {
            title: "Chi phí làm nhà",
            image_url: "https://staticfile.batdongsan.com.vn/images/icons/color/ic-house.svg",
        },
        {
            title: "Tính lãi suất",
            image_url: "https://staticfile.batdongsan.com.vn/images/home/calculator.svg",
        },
        {
            title: "Tư vấn phong thủy",
            image_url: "https://staticfile.batdongsan.com.vn/images/icons/color/ic-feng-shui.svg",
        },
    ];
    return (
        <div className="utility page-container-xl my-5">
            <h3>Hỗ trợ tiện ích</h3>
            <Row className="mt-3 page-container-lg">
                {data.map((item, index) => (
                    <Col key={index} md={3} className="">
                        <div className="utility__item d-flex align-items-center p-2 px-3">
                            <div>
                                <img className="item__image" alt="utility" src={item.image_url} />
                            </div>
                            <div className="ms-2">{item.title}</div>
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default Utility;
