import React from "react";
import {
    GeoAlt,
    Globe,
    Headphones,
    Person,
    Phone,
    PhoneFlip,
    Send,
    TelephoneOutbound,
} from "react-bootstrap-icons";
import {
    Button,
    Col,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    Input,
    Row,
} from "reactstrap";

function index(props) {
    return (
        <div className="app-footer py-5">
            <div className="page-container-xl">
                <div className="d-flex justify-content-between">
                    <div>
                        <img
                            src="https://staticfile.batdongsan.com.vn/images/logo/standard/black/logo_gray-5.svg"
                            alt="logo-app"
                        />
                    </div>
                    <div className="d-flex justify-content-end">
                        <div className="d-flex align-items-center mx-2">
                            <Phone size={36} />
                            <div className="d-flex flex-column">
                                <div>Hotline</div>
                                <div>
                                    <b>1900 1881</b>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex align-items-center mx-2">
                            <Person size={36} />
                            <div className="d-flex flex-column">
                                <div>Hỗ trợ khách hàng</div>
                                <div>
                                    <b>trogiup.batdongsan.com.vn</b>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex align-items-center mx-2">
                            <Headphones size={36} className="me-2"/>
                            <div className="d-flex flex-column">
                                <div>Chăm sóc khách hàng </div>
                                <div>
                                    <b>hotro@batdongsan.com.vn</b>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Row className="mt-4">
                    <Col md={5}>
                        <h6>CÔNG TY CỔ PHẦN PROPERTYGURU VIỆT NAM</h6>
                        <div className="d-flex align-items-center my-1">
                            <GeoAlt size={38} className="me-2"/>
                            <span className="ms-3">
                                Tầng 31, Keangnam Hanoi Landmark, Phạm Hùng, Nam
                                Từ Liêm, Hà Nội
                            </span>
                        </div>
                        <div className="d-flex align-items-center mt-2">
                            <TelephoneOutbound size={28} className="me-2"/>
                            <span className="ms-3">
                                (024) 3562 5939 - (024) 3562 5940
                            </span>
                        </div>
                        <div className="d-flex flex-column align-items-start justify-content-end mt-3">
                            <img
                                style={{
                                    height: "30px",
                                    objectFit: "contain",
                                }}
                                alt="contact"
                                src="https://staticfile.batdongsan.com.vn/images/mobile/footer/google-play.png"
                            />
                            <img
                                style={{
                                    height: "30px",
                                    objectFit: "contain",
                                }}
                                alt="contact"
                                src="https://staticfile.batdongsan.com.vn/images/mobile/footer/app_store.png"
                            />
                        </div>
                    </Col>
                    <Col md={2}>
                        <div className="d-flex flex-column">
                            <div>
                                <h6>HƯỚNG DẪN</h6>
                            </div>
                            <div className="my-1">Báo giá & hỗ trợ</div>
                            <div className="my-1">Câu hỏi thường gặp</div>
                            <div className="my-1">Thông báo</div>
                            <div className="my-1">Liên hệ</div>
                            <div className="my-1">Sitemap</div>
                        </div>
                    </Col>
                    <Col md={2}>
                        <div className="d-flex flex-column">
                            <div>
                                <h6>QUY ĐỊNH</h6>
                            </div>
                            <div className="my-1">Quy định đăng tin</div>
                            <div className="my-1">Quy chế hoạt động</div>
                            <div className="my-1">Điều khoản thỏa thuận</div>
                            <div className="my-1">Chính sách bảo mật</div>
                            <div className="my-1">Góp ý báo lỗi</div>
                        </div>
                    </Col>
                    <Col md={3}>
                        <div>
                            <h6>ĐĂNG KÝ NHẬN TIN</h6>
                        </div>
                        <div className="d-flex">
                            <Input placeholder="Nhập email của bạn" />
                            <Button color="danger">
                                <Send />
                            </Button>
                        </div>
                        <div className="mt-4">
                            <h6>QUỐC GIA & NGÔN NGỮ</h6>
                        </div>
                        <div className="d-flex">
                            <Dropdown
                                className="w-100"
                                isOpen={true}
                                placeholder="Nhập email của bạn"
                            >
                                <DropdownMenu>
                                    <DropdownItem>
                                        <Globe className="me-2" />
                                        Việt Nam
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default index;
