import React, { useState } from "react";
import { ArrowClockwise, ArrowRight, Building, CaretDown, House, Search } from "react-bootstrap-icons";
import { Button, Col, Dropdown, DropdownMenu, DropdownToggle, Input, Row, TabContent, TabPane } from "reactstrap";
import { getAddressLabelText } from "../core/getAddress";
import SelectAddress from "../core/SelectAddress";
import SelectAreaSize from "../core/SelectAreaSize";
import SelectMore from "../core/SelectMore";
import SelectPrice from "../core/SelectPrice";
import SelectProductType from "../core/SelectProductType";

function SearchBox(props) {
    const defaultSearch = {
        sellType: 0,
        houseType: [],
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

    const [houseType, setHouseType] = useState(defaultSearch.houseType);
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

    const handleChangeHouseType = (value) => {
        console.log(value)
        setHouseType(value);
        // toggle("areaSize");
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
        <div className="search-box pt-5">
            <TabContent className="pt-4 p-3 mt-n2">
                <TabPane>
                    <Row>
                        <Col md="3">
                            <SelectProductType open={dropdownOpen.houseType} toggle={toggle} value={houseType} onChange={handleChangeHouseType} />
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
