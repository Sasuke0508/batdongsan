import React, { useState } from "react";
import { ArrowClockwise, Building, CaretDown, House, Search } from "react-bootstrap-icons";
import { Button, ButtonGroup, Dropdown, DropdownMenu, DropdownToggle, Input } from "reactstrap";

function SearchBar(props) {
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
    const [isSell, setIsSell] = useState(true);
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

    const toggle = (type) =>
        setDropdownOpen((prevState) => ({
            ...prevState,
            [type]: !prevState[type],
        }));

    const handleClickSellType = (type) => {
        setIsSell(type);
    };

    return (
        <div className="search-bar">
            <div className="d-flex align-items-center p-3">
                <ButtonGroup className="mx-2 w-50">
                    <Button size="sm" outline active={isSell} onClick={() => handleClickSellType(true)}>
                        Bán
                    </Button>
                    <Button size="sm" outline active={!isSell} onClick={() => handleClickSellType(false)}>
                        Cho thuê
                    </Button>
                </ButtonGroup>
                <Button outline>
                    <Search />
                </Button>
                <Input placeholder="Tìm kiếm" className="flex-1" />
                <div className="search-bar__item">
                    <Dropdown isOpen={dropdownOpen.houseType} toggle={() => toggle("houseType")} direction={"down"}>
                        <DropdownToggle outline className="w-100">
                            <div className="d-flex flex-nowrap align-items-center justify-content-between">
                                <span>
                                    <House className="me-1" />
                                    <span>Loại nhà đất</span>
                                </span>
                                <CaretDown className="ms-1" />
                            </div>
                        </DropdownToggle>
                        <DropdownMenu>
                            <div className="mx-2 d-flex">
                                <input type="checkbox" checked={true} className="mx-1"></input>
                                <label className="d-flex align-items-center">
                                    <House />
                                    <span>Tất cả nhà đất</span>
                                </label>
                            </div>
                            <div className="mx-2 d-flex">
                                <input type="checkbox" checked={true} className="mx-1"></input>
                                <label className="d-flex align-items-center">
                                    <Building />
                                    <span>Căn hộ chung cư</span>
                                </label>
                            </div>
                            <div className="mx-2 d-flex">
                                <input type="checkbox" checked={true} className="mx-1"></input>
                                <label className="d-flex align-items-center">
                                    <Building />
                                    <span>Nhà riêng</span>
                                </label>
                            </div>
                            <div className="mx-2 d-flex">
                                <input type="checkbox" checked={true} className="mx-1"></input>
                                <label className="d-flex align-items-center">
                                    <Building />
                                    <span>Nhà biệt thự, liền kề</span>
                                </label>
                            </div>
                            <div className="mx-2 d-flex">
                                <input type="checkbox" checked={true} className="mx-1"></input>
                                <label className="d-flex align-items-center">
                                    <Building />
                                    <span>Nhà mặt phố</span>
                                </label>
                            </div>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <div className="search-bar__item">
                    <Dropdown isOpen={dropdownOpen.location} toggle={() => toggle("location")} direction={"down"}>
                        <DropdownToggle outline className="w-100">
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
                </div>
                <div className="search-bar__item">
                    <Dropdown isOpen={dropdownOpen.price} toggle={() => toggle("price")} direction={"down"}>
                        <DropdownToggle outline className="w-100">
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
                </div>
                <div className="search-bar__item">
                    <Dropdown isOpen={dropdownOpen.areaSize} toggle={() => toggle("areaSize")} direction={"down"}>
                        <DropdownToggle outline className="w-100">
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
                </div>
                <div className="search-bar__item d-flex">
                    <Dropdown isOpen={dropdownOpen.status} toggle={() => toggle("status")} direction={"down"}>
                        <DropdownToggle outline className="w-100">
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
                    <Button outline>
                        <ArrowClockwise />
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default SearchBar;
