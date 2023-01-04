import React from "react";
import { Col, Row } from "reactstrap";

function Footer(props) {
    const data = [
        [
            "Nhà đất TP HCM",
            "Bán nhà Quận 6",
            "Bán nhà Quận 7",
            "Bán nhà Quận 8",
            "Bán nhà Quận 12",
            "Bán nhà Bình Chánh",
            "Bán nhà Bình Tân",
            "Chung cư Thủ Đức",
            "Vinhomes Central Park",
            "Saigon Pearl",
            "Vinhomes Grand Park Quận 9",
            "Celadon City",
            "PiCity High Park",
            "Lakeview City",
            "Akari City",
            "Cư Xá Thanh Đa",
            "Ecogreen Saigon",
            "Sunshine City",
            "Estella Quận 2",
        ],
        [
            "Nhà đất Hà Nội",
            "Bán nhà Hà Nội",
            "Thuê chung cư Hà Nội",
            "Thuê nhà Hà Nội",
            "Chung cư Hà Đông",
            "Terra An Hưng",
            "The Matrix One",
            "Vinhomes Ocean Park",
            "Vinhomes Smart City",
            "Nhà phố Gò Vấp",
            "Vinhomes Royal City",
            "Khu đô thị Vạn Phúc",
            "Khu Ngoại Giao Đoàn",
            "The Manor Central Park",
            "Khu đô thị Xa La",
            "Vinhomes Skylake",
            "Khu đô thị Ciputra",
            "Imperia Smart City",
            "Vinhomes Times City",
        ],
        [
            "Mua bán nhà đất",
            "Nhà đất Bình Dương",
            "Nhà Đất Đà Nẵng",
            "Nhà đất Nam Định",
            "Nhà đất Gia Lai",
            "Nhà đất Hải Phòng",
            "CityLand Park Hills",
            "Chung cư Sky Oasis",
            "Thanh Long Bay",
            "Gem Sky World",
            "KN Paradise Cam Ranh",
            "Nhơn Hội New City",
            "Astral City",
            "Bcons Garden",
            "Lavita Thuận An",
            "Danko City",
            "Tecco Felice Homes",
            "Văn Phú Hà Đông",
            "Vinhomes Imperia Hải, Phòng",
        ],
        [
            "Nhà đất cho thuê",
            "Cho thuê nhà Hà Nội",
            "Thuê nhà nguyên căn",
            "Cho thuê phòng trọ",
            "Nhà trọ Quận 7",
            "Vinhomes Riverside",
            "Sunshine City",
            "The Manor",
            "Mipec Long Biên",
            "Trung Hòa Nhân Chính",
            "BRG Lê Văn Lương",
            "Vinhomes Symphony",
            "Xanh Villas",
            "Star Lake",
            "Vinhomes Golden River",
            "Tecco Diamond",
            "Swan Bay",
            "Waterpoint",
            "Meyhomes phú quốc",
        ],
    ];
    return (
        <div className="footer page-container-xl my-5">
            <Row>
                {data.map((item, index) => (
                    <Col md={3} key={index}>
                        <div className="d-flex flex-column">
                            {item.map((title, indexTitle) => (
                                <div
                                    key={indexTitle}
                                    className={`my-1 title__item ${indexTitle === 0 ? "title__item--bold" : ""}`}
                                >
                                    {title}
                                </div>
                            ))}
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default Footer;
