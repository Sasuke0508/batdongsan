import React, { useState } from "react";
import { ArrowClockwise, Building, CaretDown, House, Search } from "react-bootstrap-icons";
import { Button, ButtonGroup, Dropdown, DropdownMenu, DropdownToggle, Input } from "reactstrap";
import { getAddressLabelText } from "./getAddress";
import SelectAddress from "./SelectAddress";
import SelectAreaSize from "./SelectAreaSize";
import SelectMore from "./SelectMore";
import SelectPrice from "./SelectPrice";
import SelectProductType from "./SelectProductType";

function SearchBar(props) {
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
    const [searchHouseType, setSearchHouseType] = useState(defaultSearch.houseType);
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
        setSearchHouseType(value);
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
        setSearchHouseType(defaultSearch.houseType);
        setSearchText(defaultSearch.searchText);
        setAddress(defaultSearch.address);
        setFilterMore(defaultSearch.filterMore);
        setPrice(defaultSearch.price);
        setAreaSize(defaultSearch.areaSize);
    };

    return (
        <div className="search-bar">
            <div className="d-flex align-items-center p-3" style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}>
                <div className="d-flex align-items-center" style={{ flex: "1" }}>
                    <Button outline>
                        <Search />
                    </Button>
                    <Input value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="Tìm kiếm" />
                </div>
                <div className="search-bar__item">
                    <SelectProductType open={dropdownOpen.houseType} toggle={toggle} value={searchHouseType} onChange={handleChangeHouseType} />
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
