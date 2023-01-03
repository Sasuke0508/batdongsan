import React from "react";
import { BarChart, Dot, Pencil, ThreeDots } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { Button, Col, Input, Row } from "reactstrap";
import { sellUnits } from "../../constants";
import { msgPendingFeature } from "../../utils";

function ListPostItem({ postList }) {
    const navigate = useNavigate();
    const handleClickEditPost = () => {
        navigate("/manager-post/create-new-post", {
            state: {
                dataEditPost: {
                    address: {
                        city: "01",
                        district: "005",
                        ward: "00160",
                        number: "số 40",
                    },
                    title: "Cho thuê phòng trọ tại số 30 Nghĩa Tân - Cầu Giấy thềm 30m",
                    description: `Cam kết:
                    - Giá thuê tốt nhất.
                    - Xem căn hộ 24/7 không cần báo trước.
                    - Hỗ trợ 24/7 trong suốt quá trình thuê.
                    - Pháp lý minh bạch, kí HĐ trực tiếp với chủ sở hữu căn hộ.
                    - Hỗ trợ, tư vấn nếu khách thuê có nhu cầu mua căn hộ.`,
                    areaSize: "30m2",
                    price: { value: "4triệu / tháng", unit: sellUnits[0].value },
                    quantityInfo: { bedRoom: 2, bathRoom: 1, floor: 1 },
                    entranceSize : '6m2',
                    frontSize : '10m2',
                    contactInfo : {
                        name: "Nguyễn Tuấn An",
                        phoneNumber: "01234568***",
                        address: "Cầu Giấy - Hà Nội",
                        email: "tuanan@phongtrochothue.com",
                    },
                    imageUrls : ['https://www.hancorp.com.vn/wp-content/uploads/2020/08/phong-tro-2.jpg'],
                    postStartDate : '2022-12-10'
                },
            },
        });
    };
    return (
        <div>
            {postList.map((item, index) => (
                <div className="post__item p-2 bg-white" key={index}>
                    <Row>
                        <Col md={9}>
                            <div className="d-flex">
                                <div className="me-2">
                                    <img height={120} src={item.image_url} className="w-100" alt="statistic" />
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
                                        <div className="d-flex align-items-center">
                                            <Button outline className="me-2" onClick={msgPendingFeature} >
                                                <BarChart className="me-2"/>
                                                Chi tiết
                                            </Button>
                                            <Button outline className="me-2" onClick={handleClickEditPost}>
                                                <Pencil className="me-2" />
                                                Sửa tin
                                            </Button>
                                            <Button outline className="me-2" onClick={msgPendingFeature}>
                                                <ThreeDots className="me-2" />
                                                Thao tác
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between">
                                <div className="mt-2 d-flex align-items-center">
                                    <Input className="me-2" type="checkbox" />
                                    <label>#1</label>
                                </div>
                                
                            </div>
                        </Col>
                        {/* <Col md={3}>
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
                        </Col> */}
                    </Row>
                </div>
            ))}
        </div>
    );
}

export default ListPostItem;
