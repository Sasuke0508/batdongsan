import React from "react";
import { BarChart, Dot, Pencil, ThreeDots, Upload } from "react-bootstrap-icons";
import { createSearchParams, useNavigate } from "react-router-dom";
import { Button, Col, Input, Row } from "reactstrap";
import Paging from "../core/Paging";

function ListPostItem({ postList, ...restProps }) {

    const navigate = useNavigate();

    const handleUpdatePost = (post) => {
        navigate({
            pathname: '/manager-post/create-new-post',
            search: createSearchParams({
                postId: post.id,
            }).toString(),
        });
    }

    return (
        <div>
            {postList.map((item, index) => (
                <div className="post__item p-2 bg-white" key={item.id}>
                    <Row>
                        <Col md={9}>
                            <div className="d-flex">
                                <div className="me-2">
                                    <img src={item.images?.[0]?.link} className="w-100 h-100" style={{maxWidth: 210}} alt="statistic" />
                                </div>
                                <div>
                                    <h6>{item.title}</h6>
                                    <div className="d-flex">
                                        <div>{item.type}</div>
                                        <div className="mx-1">
                                            <Dot />
                                        </div>
                                        <div>{item.address.addressDetail}</div>
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
                                            <div>{item.createdDate}</div>
                                        </div>
                                        <div className="mx-5 me-4">
                                            <div className="opacity-75">Ngày hết hạn</div>
                                            <div>{item.expDate}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between mt-3">
                                <div className="mt-2 d-flex align-items-center">
                                    <Input className="me-2" type="checkbox" />
                                    <label>#{index+1}</label>
                                </div>
                                <div className="d-flex align-items-center">
                                    <Button outline className="me-2" onClick={() => navigate(`/post/${item.id}`)}>
                                        <BarChart className="me-2" />
                                        Chi tiết
                                    </Button>
                                    <Button outline className="me-2" onClick={() => handleUpdatePost(item)}>
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
            <Paging {...restProps} />
        </div>
    );
}

export default ListPostItem;
