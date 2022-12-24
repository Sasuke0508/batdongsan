import React from "react";
import { CaretDown, House } from "react-bootstrap-icons";
import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap";
import { houseTypeOptions } from "../../constants";

function SelectProductType({ value, onChange: handleChange, open, toggle }) {
    const checkItemActive = (item) => {
        return value.indexOf(item) !== -1;
    };

    const handleClick = (item) => {
        const exist = checkItemActive(item);
        let newValue = value;
        if (exist) {
            newValue = newValue.filter((old) => old !== item);
        } else {
            newValue.push(item);
        }
        handleChange(newValue);
    };

    return (
        <div>
            <Dropdown className="search__house-type" isOpen={open} toggle={() => toggle("houseType")} direction={"down"}>
                <DropdownToggle outline className="w-100">
                    <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                            <House className="me-2" />
                            <span className="text-overflow-dots">Loại nhà đất</span>
                        </div>
                        <CaretDown className="ms-1" />
                    </div>
                </DropdownToggle>
                <DropdownMenu>
                    {houseTypeOptions.map((item, index) => (
                        <div key={index} className="mx-3 cursor-pointer hover-bg d-flex my-2 justify-content-between" onClick={() => handleClick(item.value)}>
                            <label className="d-flex align-items-center me-3">
                                <div>{item.label}</div>
                            </label>
                            <input type="checkbox" checked={checkItemActive(item.value)} className="mx-1"></input>
                        </div>
                    ))}
                </DropdownMenu>
            </Dropdown>
        </div>
    );
}

export default SelectProductType;
