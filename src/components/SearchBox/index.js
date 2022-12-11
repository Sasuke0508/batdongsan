import React, { useState } from "react";
import { ArrowClockwise, Building, CaretDown, House, Search } from "react-bootstrap-icons";
import {
    Button,
    Col,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Input,
    Nav,
    NavItem,
    NavLink,
    Row,
    TabContent,
    TabPane,
} from "reactstrap";

function SearchBox(props) {
    const defaultSearch = {
        sellType: 0,
        houseType: 0,
        searchText: "",
        location: "all",
        price: {
            from: 0,
            to: 0,
        },
        status: "all",
        areaSize: {
            from: 0,
            to: 0,
        },
    };
    const [sellType, setSellType] = useState(defaultSearch.sellType);
    const [houseType, setHouseType] = useState(defaultSearch.houseType);
    const [searchText, setSearchText] = useState(defaultSearch.searchText);
    const [location, setLocation] = useState(defaultSearch.location);
    const [price, setPrice] = useState(defaultSearch.price);
    const [status, setStatus] = useState(defaultSearch.status);
    const [areaSize, setAreaSize] = useState(defaultSearch.areaSize);
    const [dropdownOpen, setDropdownOpen] = useState({
        houseType: false,
        location: false,
        price: false,
        areaSize: false,
        status: false,
    });

    const handleClickSellType = (id) => {
        setSellType(id);
    };

    const isActiveTab = (id) => {
        return Number(id) === sellType;
    };

    const tabs = [
        {
            id: 0,
            title: "Nhà đất bán",
        },
        {
            id: 1,
            title: "Nhà đất cho thuê",
        },
        {
            id: 2,
            title: "Dự án",
        },
    ];

    const toggle = (type) =>
        setDropdownOpen((prevState) => ({
            ...prevState,
            [type]: !prevState[type],
        }));

    return (
        <div className="search-box mt-5">
            <TabContent className="pt-4 p-3 mt-n2">
                <TabPane>
                    <Row>
                        <Col md="3">
                            <Dropdown isOpen={dropdownOpen.houseType} toggle={() => toggle("houseType")} direction={"down"}>
                                <DropdownToggle className="w-100">
                                    <div className="d-flex flex-nowrap align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                            <House className="me-2" />
                                            <span>Loại nhà đất</span>
                                        </div>
                                        <CaretDown className="ms-1" />
                                    </div>
                                </DropdownToggle>
                                <DropdownMenu>
                                    <div className="mx-3 d-flex my-2 justify-content-between">
                                        <label className="d-flex align-items-center me-3">
                                            <House className="me-2" />
                                            <div>Tất cả nhà đất</div>
                                        </label>
                                        <input type="checkbox" checked={true} className="mx-1"></input>
                                    </div>
                                    <div className="mx-3 d-flex my-2 justify-content-between">
                                        <label className="d-flex align-items-center me-3">
                                            <Building className="me-2" />
                                            <div>Căn hộ chung cư</div>
                                        </label>
                                        <input type="checkbox" checked={true} className="mx-1"></input>
                                    </div>
                                    <div className="mx-3 d-flex my-2 justify-content-between">
                                        <label className="d-flex align-items-center me-3">
                                            <Building className="me-2" />
                                            <div>Nhà riêng</div>
                                        </label>
                                        <input type="checkbox" checked={true} className="mx-1"></input>
                                    </div>
                                    <div className="mx-3 d-flex my-2 justify-content-between">
                                        <label className="d-flex align-items-center me-3">
                                            <Building className="me-2" />
                                            <div style={{whiteSpace : 'nowrap'}}>Nhà biệt thự, liền kề</div>
                                        </label>
                                        <input type="checkbox" checked={true} className="mx-1"></input>
                                    </div>
                                    <div className="mx-3 d-flex my-2 justify-content-between">
                                        <label className="d-flex align-items-center me-3">
                                            <Building className="me-2" />
                                            <div>Nhà mặt phố</div>
                                        </label>
                                        <input type="checkbox" checked={true} className="mx-1"></input>
                                    </div>
                                </DropdownMenu>
                            </Dropdown>
                        </Col>
                        <Col md="7">
                            <div className="d-flex align-items-center">
                                <Input placeholder="Tìm kiếm" />
                            </div>
                        </Col>
                        <Col md="2">
                            <Button color="danger">
                                <div className="d-flex align-items-center">
                                    <Search className="me-1" />
                                    <span>Search</span>
                                </div>
                            </Button>
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col md={11}>
                            <Row>
                                <Col md={3}>
                                    <Dropdown isOpen={dropdownOpen.location} toggle={() => toggle("location")} direction={"down"}>
                                        <DropdownToggle className="w-100">
                                            <div className="d-flex flex-nowrap align-items-center justify-content-between">
                                                <span>Trên toàn quốc</span>
                                                <CaretDown className="ms-1" />
                                            </div>
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <div className="mx-2">
                                                <input type="checkbox" checked={true} className="mx-1"></input>
                                                <label>Tất cả nhà đất</label>
                                            </div>
                                        </DropdownMenu>
                                    </Dropdown>
                                </Col>
                                <Col md={3}>
                                    <Dropdown isOpen={dropdownOpen.price} toggle={() => toggle("price")} direction={"down"}>
                                        <DropdownToggle className="w-100">
                                            <div className="d-flex flex-nowrap align-items-center justify-content-between">
                                                <span>Mức giá</span>
                                                <CaretDown className="ms-1" />
                                            </div>
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <div className="mx-2">
                                                <input type="checkbox" checked={true} className="mx-1"></input>
                                                <label>Tất cả nhà đất</label>
                                            </div>
                                        </DropdownMenu>
                                    </Dropdown>
                                </Col>
                                <Col md={3}>
                                    <Dropdown isOpen={dropdownOpen.areaSize} toggle={() => toggle("areaSize")} direction={"down"}>
                                        <DropdownToggle className="w-100">
                                            <div className="d-flex flex-nowrap align-items-center justify-content-between">
                                                <span>Diện tích</span>
                                                <CaretDown className="ms-1" />
                                            </div>
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <div className="mx-2">
                                                <input type="checkbox" checked={true} className="mx-1"></input>
                                                <label>Tất cả nhà đất</label>
                                            </div>
                                        </DropdownMenu>
                                    </Dropdown>
                                </Col>
                                <Col md={3}>
                                    <Dropdown isOpen={dropdownOpen.status} toggle={() => toggle("status")} direction={"down"}>
                                        <DropdownToggle className="w-100">
                                            <div className="d-flex flex-nowrap align-items-center justify-content-between">
                                                <span>Lọc thêm</span>
                                                <CaretDown className="ms-1" />
                                            </div>
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <div className="mx-2">
                                                <input type="checkbox" checked={true} className="mx-1"></input>
                                                <label>Tất cả nhà đất</label>
                                            </div>
                                        </DropdownMenu>
                                    </Dropdown>
                                </Col>
                            </Row>
                        </Col>
                        <Col>
                            <Button>
                                <ArrowClockwise />
                            </Button>
                        </Col>
                    </Row>
                </TabPane>
            </TabContent>
        </div>
    );
}

export default SearchBox;
