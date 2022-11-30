import React from "react";
import { Heart, HeartFill, Image } from "react-bootstrap-icons";
import { Button, Card, Col, Row } from "reactstrap";

function Recommended(props) {
    const recommendedData = [
        {
            id: 0,
            title: "Bán tập thể tầng 3 - Quỳnh Lôi - quận Hai Bà Trưng. 1.39 tỷ",
            location: "Hai Bà Trưng, Hà nội",
            areaSize: "50m2",
            price: "1.39 tỷ",
            created_at: "4 ngày trước",
            image_count: 5,
            image_url: [
                "https://file4.batdongsan.com.vn/crop/257x147/2022/09/21/20220921124554-8f4a_wm.jpg",
            ],
            liked: true,
        },
        {
            id: 0,
            title: "Bán tập thể tầng 3 - Quỳnh Lôi - quận Hai Bà Trưng. 1.39 tỷ",
            location: "Hai Bà Trưng, Hà nội",
            areaSize: "50m2",
            price: "1.39 tỷ",
            created_at: "4 ngày trước",
            image_count: 5,
            image_url: [
                "https://file4.batdongsan.com.vn/crop/257x147/2022/09/21/20220921124554-8f4a_wm.jpg",
            ],
            liked: false,
        },
        {
            id: 0,
            title: "Bán tập thể tầng 3 - Quỳnh Lôi - quận Hai Bà Trưng. 1.39 tỷ",
            location: "Hai Bà Trưng, Hà nội",
            areaSize: "50m2",
            price: "1.39 tỷ",
            created_at: "4 ngày trước",
            image_count: 5,
            image_url: [
                "https://file4.batdongsan.com.vn/crop/257x147/2022/09/21/20220921124554-8f4a_wm.jpg",
            ],
            liked: false,
        },
        {
            id: 0,
            title: "Bán tập thể tầng 3 - Quỳnh Lôi - quận Hai Bà Trưng. 1.39 tỷ",
            location: "Hai Bà Trưng, Hà nội",
            areaSize: "50m2",
            price: "1.39 tỷ",
            created_at: "4 ngày trước",
            image_count: 5,
            image_url: [
                "https://file4.batdongsan.com.vn/crop/257x147/2022/09/21/20220921124554-8f4a_wm.jpg",
            ],
            liked: false,
        },
        {
            id: 0,
            title: "Bán tập thể tầng 3 - Quỳnh Lôi - quận Hai Bà Trưng. 1.39 tỷ",
            location: "Hai Bà Trưng, Hà nội",
            areaSize: "50m2",
            price: "1.39 tỷ",
            created_at: "4 ngày trước",
            image_count: 5,
            image_url: [
                "https://file4.batdongsan.com.vn/crop/257x147/2022/09/21/20220921124554-8f4a_wm.jpg",
            ],
            liked: false,
        },
        {
            id: 0,
            title: "Bán tập thể tầng 3 - Quỳnh Lôi - quận Hai Bà Trưng. 1.39 tỷ",
            location: "Hai Bà Trưng, Hà nội",
            areaSize: "50m2",
            price: "1.39 tỷ",
            created_at: "4 ngày trước",
            image_count: 5,
            image_url: [
                "https://file4.batdongsan.com.vn/crop/257x147/2022/09/21/20220921124554-8f4a_wm.jpg",
            ],
            liked: false,
        },
        {
            id: 0,
            title: "Bán tập thể tầng 3 - Quỳnh Lôi - quận Hai Bà Trưng. 1.39 tỷ",
            location: "Hai Bà Trưng, Hà nội",
            areaSize: "50m2",
            price: "1.39 tỷ",
            created_at: "4 ngày trước",
            image_count: 5,
            image_url: [
                "https://file4.batdongsan.com.vn/crop/257x147/2022/09/21/20220921124554-8f4a_wm.jpg",
            ],
            liked: false,
        },
        {
            id: 0,
            title: "Bán tập thể tầng 3 - Quỳnh Lôi - quận Hai Bà Trưng. 1.39 tỷ",
            location: "Hai Bà Trưng, Hà nội",
            areaSize: "50m2",
            price: "1.39 tỷ",
            created_at: "4 ngày trước",
            image_count: 5,
            image_url: [
                "https://file4.batdongsan.com.vn/crop/257x147/2022/09/21/20220921124554-8f4a_wm.jpg",
            ],
            liked: false,
        },
    ];
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
            <div className="">
                <Row>
                    {recommendedData.map((item, index) => (
                        <Col md={3} key={index} className="mt-4">
                            <Card className="position-relative">
                                <img
                                    alt="recommended"
                                    src={item.image_url[0]}
                                />
                                <div className="image-count position-absolute d-flex align-items-center">
                                    {item.image_count}
                                    <Image className="ms-1" color="#fff" />
                                </div>
                                <div className="p-3">
                                    <h6>{item.title}</h6>
                                    <div className="mt-1">
                                        <b>{item.price}</b> -{" "}
                                        <b>{item.areaSize}</b>
                                    </div>
                                    <div>{item.location}</div>
                                    <div className="d-flex justify-content-between align-items-center mt-3">
                                        <span>{item.created_at}</span>
                                        <Button outline>
                                            {item.liked ? (
                                                <HeartFill />
                                            ) : (
                                                <Heart />
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
}

export default Recommended;
