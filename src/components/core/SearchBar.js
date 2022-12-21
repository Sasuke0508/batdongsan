import React, { useState } from "react";
import { ArrowClockwise, Building, CaretDown, House, Search } from "react-bootstrap-icons";
import { Button, ButtonGroup, Dropdown, DropdownMenu, DropdownToggle, Input } from "reactstrap";
import { getAddressLabelText } from "./getAddress";
import SelectAddress from "./SelectAddress";
import SelectAreaSize from "./SelectAreaSize";
import SelectMore from "./SelectMore";
import SelectPrice from "./SelectPrice";

function SearchBar(props) {
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
        <div className="search-bar">
            <div className="d-flex align-items-center p-3">
                <div className="d-flex align-items-center" style={{flex : '1'}}>
                    <Button outline>
                        <Search />
                    </Button>
                    <Input value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="Tìm kiếm" />
                </div>
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
                    <Dropdown className="search__address" isOpen={dropdownOpen.location} toggle={() => toggle("location")} direction={"down"}>
                        <DropdownToggle outline className="w-100">
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
                </div>
                <div className="search-bar__item">
                    <SelectPrice open={dropdownOpen.price} toggle={toggle} value={price} onChange={handleChangePrice} />
                </div>
                <div className="search-bar__item">
                    <SelectAreaSize open={dropdownOpen.areaSize} toggle={toggle} value={areaSize} onChange={handleChangeAreaSize} />
                </div>
                <div className="search-bar__item">
                    <SelectMore open={dropdownOpen.filterMore} toggle={toggle} value={filterMore} onChange={handleChangeFilterMore} />
                </div>
                <div className="d-flex">
                    <Button outline onClick={handleResetSearch}>
                        <ArrowClockwise />
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default SearchBar;
