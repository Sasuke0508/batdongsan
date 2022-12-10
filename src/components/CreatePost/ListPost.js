import React, { useState } from "react";
import { BarChart, Calendar, Dot, Filter, Pencil, Search, Sliders, ThreeDots, Upload } from "react-bootstrap-icons";
import { Button, Col, Input, Label, Row } from "reactstrap";
import Select from "../core/Select";

function ListPost(props) {
    const [filter, setFilter] = useState({
        text: "",
        days: "",
        type: "all",
    });

    const handleChangeFilter = (type, value) => {
        setFilter({
            ...filter,
            [type]: value,
        });
    };

    const daysOption = [
        { label: "Mặc định", value: "default" },
        { label: "1 tuần qua", value: "7_days" },
        { label: "30 ngày qua", value: "30_days" },
    ];

    const postTypes = [
        { label: "Tất cả(1)", value: "all" },
        { label: "Hết hạn", value: "expired" },
        { label: "Sắp hết hạn", value: "expired_soon" },
        { label: "Đang hiển thị", value: "displaying" },
        { label: "Chờ hiển thị", value: "display_pending" },
        { label: "Chờ duyệt", value: "pending" },
        { label: "Không duyệt", value: "not_allow" },
        { label: "Đã hạ", value: "deleted" },
    ];

    const checkSelectedType = (value) => filter.type === value;

    const handleClickType = (value) => {
        setFilter({
            ...filter,
            type: value,
        });
    };

    const postList = [
        {
            id: 36089521,
            image_url: "https://batdongsan.com.vn/sellernet/static/media/no-photo.2de8b38e.svg",
            title: "Bán nhà khu vực cầu giấy thềm 30m",
            type: "Bán nhà mặt phố",
            address: "Ba Vì, Hà Nội",
            status: "Chờ duyệt",
            date: "10/12/2022",
            expired_date: "20/12/2022",
            statistic: "",
        },
    ];

    return (
        <div className="list-post">
            <div className="list__header bg-white mt-2 p-5 pb-1">
                <h3>Danh sách tin</h3>
                <div className="d-flex align-items-center mt-3">
                    <div className="d-flex align-items-center me-2">
                        <Button outline disabled>
                            <Search />
                        </Button>
                        <Input value={filter.text} onChange={(e) => handleChangeFilter("text", e.target.value)} placeholder="Theo mã tin, tiêu đề" />
                    </div>
                    <div className="d-flex align-items-center me-2 w-25">
                        <Button outline disabled>
                            <Calendar />
                        </Button>
                        <Select options={daysOption} value={filter.days} onChange={(e) => handleChangeFilter("days", e.target.value)} />
                    </div>
                    <div className="d-flex align-items-center me-2 w-25">
                        <Button outline>
                            <Sliders className="me-1" />
                            Lọc
                        </Button>
                    </div>
                </div>
                <div className="list__type mt-3 d-flex">
                    {postTypes.map((item, index) => (
                        <div
                            className={`type__item ${checkSelectedType(item.value) ? "type__item--selected" : ""} cursor-pointer p-2 mx-1`}
                            key={index}
                            onClick={() => handleClickType(item.value)}
                        >
                            {item.label}
                        </div>
                    ))}
                </div>
            </div>
            <div className="list__content px-5">
                <div className="content__action d-flex justify-content-between my-2">
                    <div className="d-flex align-items-center">
                        <Input className="me-2" type="checkbox" />
                        <label for="list__content--select-all">Chọn tất cả</label>
                    </div>
                    <div className="d-flex align-items-center">
                        <Button outline>
                            <Filter className="me-2" />
                            Sắp xếp
                        </Button>
                    </div>
                </div>
                <div className="mt-3">
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
            </div>
        </div>
    );
}

export default ListPost;
