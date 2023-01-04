import React, { useEffect, useMemo, useState } from "react";
import { CaretDown } from "react-bootstrap-icons";
import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap";
import { bedRoomOptions, mediaOptions, utilityOptions } from "../../constants";
import { utilitiesService } from "../../services";

function SelectMore({ value, onChange: handleChange, open, toggle }) {

    const [utilities, setUtilities] = useState([]);

    const loadUtilities = async () => {
        const result = await utilitiesService.findAll();
        setUtilities(result.data);
    }

    useEffect(() => {
        loadUtilities();
    }, [])

    const label = useMemo(() => {
        if (!value.from && !value.to) {
            return "Mức giá";
        } else if (!value.from) {
            return `Dưới ${value.to} triệu`;
        } else if (!value.to) {
            return `Trên ${value.from} triệu`;
        } else {
            return `Từ ${value.from} đến ${value.to} triệu`;
        }
    }, [value]);

    const checkItemActive = (type, item) => {
        return value[type].indexOf(item) !== -1;
    };

    const handleClick = (type, item) => {
        const exist = checkItemActive(type, item);
        let newValue = [...value[type]];
        if (exist) {
            newValue = newValue.filter((old) => old !== item);
        } else {
            newValue.push(item);
        }
        handleChange(type, newValue);
    };

    return (
        <div>
            <Dropdown className="search__more" isOpen={open} toggle={() => toggle("filterMore")} direction={"down"}>
                <DropdownToggle outline className="w-100">
                    <div className="d-flex flex-nowrap align-items-center justify-content-between">
                        <span className="text-overflow-dots">Thông tin thêm</span>
                        <CaretDown className="ms-1" />
                    </div>
                </DropdownToggle>
                <DropdownMenu>
                    <div className="mx-2 p-2">
                        <div className="search__bedroom">
                            <h6>Số phòng ngủ</h6>
                            <div className="d-flex align-items-center mt-2">
                                {bedRoomOptions.map((item, index) => (
                                    <div
                                        key={index}
                                        className={`bedroom__item cursor-pointer p-1 px-3 mx-1 ${
                                            checkItemActive("bedroom", item.value) ? "bedroom__item--active" : ""
                                        }`}
                                        onClick={() => handleClick("bedroom", item.value)}
                                    >
                                        {item.label}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="search__bedroom mt-3">
                            <h6>Tiện ích</h6>
                            <div className="d-flex align-items-center mt-2">
                                {utilities.map((item) => (
                                    <div
                                        key={item.id}
                                        className={`bedroom__item cursor-pointer p-1 px-3 mx-1 ${
                                            checkItemActive("utility", item.id) ? "bedroom__item--active" : ""
                                        }`}
                                        onClick={() => handleClick("utility", item.id)}
                                    >
                                        {item.name}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="search__bedroom mt-3">
                            <h6>Nội dung tin có</h6>
                            <div className="d-flex align-items-center mt-2">
                                {mediaOptions.map((item, index) => (
                                    <div
                                        key={index}
                                        className={`bedroom__item cursor-pointer p-1 px-3 mx-1 ${
                                            checkItemActive("media", item.value) ? "bedroom__item--active" : ""
                                        }`}
                                        onClick={() => handleClick("media", item.value)}
                                    >
                                        {item.label}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </DropdownMenu>
            </Dropdown>
        </div>
    );
}

export default SelectMore;
