import React, { useMemo } from "react";
import { CaretDown, House } from "react-bootstrap-icons";
import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap";
import { houseTypeOptions } from "../../constants";

function SelectProductType({ value, onChange: handleChange, open, toggle }) {
    const handleClick = (item) => {
        handleChange(item);
    };
    const selectLabel = useMemo(() => {
        if (value) {
            const label = houseTypeOptions.find((item) => item.value === value)?.label;
            return label;
        } else {
            return "Loại phòng cho thuê";
        }
    }, [value]);
    return (
        <div>
            <Dropdown className="search__house-type" isOpen={open} toggle={() => toggle("houseType")} direction={"down"}>
                <DropdownToggle outline className="w-100">
                    <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                            <House className="me-2" />
                            <span className="text-overflow-dots">{selectLabel}</span>
                        </div>
                        <CaretDown className="ms-1" />
                    </div>
                </DropdownToggle>
                <DropdownMenu>
                    {houseTypeOptions.map((item, index) => (
                        <div
                            key={index}
                            className="mx-3 cursor-pointer hover-bg d-flex my-2 justify-content-between"
                            onClick={() => handleClick(item.value)}
                        >
                            <label className="d-flex align-items-center me-3">
                                <div>{item.label}</div>
                            </label>
                        </div>
                    ))}
                </DropdownMenu>
            </Dropdown>
        </div>
    );
}

export default SelectProductType;
