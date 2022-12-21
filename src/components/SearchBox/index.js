import React, { useState } from "react";
import { ArrowClockwise, ArrowRight, Building, CaretDown, House, Search } from "react-bootstrap-icons";
import { Button, Col, Dropdown, DropdownMenu, DropdownToggle, Input, Row, TabContent, TabPane } from "reactstrap";
import { getAddressLabelText } from "../core/getAddress";
import SelectAddress from "../core/SelectAddress";
import SelectAreaSize from "../core/SelectAreaSize";
import SelectMore from "../core/SelectMore";
import SelectPrice from "../core/SelectPrice";

function SearchBox(props) {
    const defaultSearch = {
        sellType: 0,
        houseType: 0,
        searchText: "",
        address: {
            city: "",
            district: "",
            ward: "",
            number: "",
        },
        price: {
            from: 0,
            to: 0,
        },
        filterMore: {
            utility: [],
            bedroom: [],
            media: [],
        },
        areaSize: {
            from: 0,
            to: 0,
        },
    };
    const [searchText, setSearchText] = useState(defaultSearch.searchText);
    const [address, setAddress] = useState(defaultSearch.address);
    const [filterMore, setFilterMore] = useState(defaultSearch.filterMore);
    const [price, setPrice] = useState(defaultSearch.price);
    const [areaSize, setAreaSize] = useState(defaultSearch.areaSize);

    const [dropdownOpen, setDropdownOpen] = useState({
        houseType: false,
        location: false,
        price: false,
        areaSize: false,
        filterMore: false,
    });

    const toggle = (type) => {
        setDropdownOpen((prevState) => ({
            ...prevState,
            [type]: !prevState[type],
        }));
    };

    const handleChangePrice = (type, value) => {
        setPrice((prev) => ({
            ...prev,
            [type]: value,
        }));
        toggle("price");
    };
    const handleChangeAreaSize = (type, value) => {
        setAreaSize((prev) => ({
            ...prev,
            [type]: value,
        }));
        toggle("areaSize");
    };

    const handleChangeFilterMore = (type, value) => {
        setFilterMore((prev) => ({
            ...prev,
            [type]: value,
        }));
        // toggle("filterMore");
    };

    const handleResetSearch = () => {
        setSearchText(defaultSearch.searchText);
        setAddress(defaultSearch.address);
        setFilterMore(defaultSearch.filterMore);
        setPrice(defaultSearch.price);
        setAreaSize(defaultSearch.areaSize);
    };

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
                                            <span className="text-overflow-dots">Loại nhà đất</span>
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
                                            <div style={{ whiteSpace: "nowrap" }}>Nhà biệt thự, liền kề</div>
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
                                <Input value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="Tìm kiếm" />
                            </div>
                        </Col>
                        <Col md="2">
                            <Button color="danger">
                                <div className="d-flex align-items-center">
                                    <Search className="me-1" />
                                    <span className="text-overflow-dots">Search</span>
                                </div>
                            </Button>
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col md={11}>
                            <Row>
                                <Col md={3}>
                                    <Dropdown
                                        className="search__address"
                                        isOpen={dropdownOpen.location}
                                        toggle={() => toggle("location")}
                                        direction={"down"}
                                    >
                                        <DropdownToggle className="w-100">
                                            <div className="d-flex flex-nowrap align-items-center justify-content-between">
                                                <span className="text-overflow-dots">{getAddressLabelText(address)}</span>
                                                <CaretDown className="ms-1" />
                                            </div>
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <div className="mx-2">
                                                <SelectAddress size="menu" address={address} setAddress={setAddress} />
                                            </div>
                                        </DropdownMenu>
                                    </Dropdown>
                                </Col>
                                <Col md={3}>
                                    <SelectPrice open={dropdownOpen.price} toggle={toggle} value={price} onChange={handleChangePrice} />
                                </Col>
                                <Col md={3}>
                                    <SelectAreaSize open={dropdownOpen.areaSize} toggle={toggle} value={areaSize} onChange={handleChangeAreaSize} />
                                </Col>
                                <Col md={3}>
                                    <SelectMore open={dropdownOpen.filterMore} toggle={toggle} value={filterMore} onChange={handleChangeFilterMore} />
                                </Col>
                            </Row>
                        </Col>
                        <Col>
                            <Button>
                                <ArrowClockwise onClick={handleResetSearch} />
                            </Button>
                        </Col>
                    </Row>
                </TabPane>
            </TabContent>
        </div>
    );
}

export default SearchBox;
