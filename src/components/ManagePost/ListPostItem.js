import React from "react";
import { BarChart, Dot, Pencil, ThreeDots, Upload } from "react-bootstrap-icons";
import { Button, Col, Input, Row } from "reactstrap";

function ListPostItem({ postList }) {
    return (
        <div>
            {postList.map((item, index) => (
                <div className="post__item p-2 bg-white" key={index}>
                    <Row>
                        <Col md={9}>
                            <div className="d-flex">
                                <div className="me-2">
                                    <img src={item.image_url} className="w-100" alt="statistic" />
                                </div>
                                <div>
                                    <h6>{item.title}</h6>
                                    <div className="d-flex">
                                        <div>{item.type}</div>
                                        <div className="mx-1">
                                            <Dot />
                                        </div>
                                        <div>{item.address}</div>
                                    </div>
                                    <div className="d-flex mt-2">
                                        <div className="me-4">
                                            <div className="opacity-75">Trạng thái</div>
                                            <div>{item.status}</div>
                                        </div>
                                        <div className="mx-5 me-4">
                                            <div className="opacity-75">Mã tin</div>
                                            <div>{item.id}</div>
                                        </div>
                                        <div className="mx-5 me-4">
                                            <div className="opacity-75">Ngày đăng</div>
                                            <div>{item.date}</div>
                                        </div>
                                        <div className="mx-5 me-4">
                                            <div className="opacity-75">Ngày hết hạn</div>
                                            <div>{item.expired_date}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between">
                                <div className="mt-2 d-flex align-items-center">
                                    <Input className="me-2" type="checkbox" />
                                    <label>#1</label>
                                </div>
                                <div className="d-flex align-items-center">
                                    <Button outline className="me-2">
                                        <BarChart className="me-2" />
                                        Chi tiết
                                    </Button>
                                    <Button outline className="me-2">
                                        <Pencil className="me-2" />
                                        Sửa tin
                                    </Button>
                                    <Button outline className="me-2">
                                        <ThreeDots className="me-2" />
                                        Thao tác
                                    </Button>
                                </div>
                            </div>
                        </Col>
                        <Col md={3}>
                            <div>
                                <img
                                    src="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
                                    className="w-100 statistic__img"
                                    alt="statistic"
                                />
                                <div className="text-center">Tin đăng này chưa có số liệu thống kê</div>
                                <Button outline className="mt-2 w-100" disabled>
                                    <Upload className="me-2" />
                                    Đẩy tin
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </div>
            ))}
        </div>
    );
}

export default ListPostItem;
