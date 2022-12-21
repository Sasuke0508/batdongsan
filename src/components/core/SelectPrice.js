import React, { useMemo } from "react";
import { ArrowRight, CaretDown } from "react-bootstrap-icons";
import { Dropdown, DropdownMenu, DropdownToggle, Input } from "reactstrap";
import { priceOptions } from "../../constants";

function SelectPrice({ value, onChange, open, toggle }) {
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
    return (
        <div>
            <Dropdown className="search__price" isOpen={open} toggle={() => toggle("price")} direction={"down"}>
                <DropdownToggle outline className="w-100">
                    <div className="d-flex flex-nowrap align-items-center justify-content-between">
                        <span className="text-overflow-dots">{label}</span>
                        <CaretDown className="ms-1" />
                    </div>
                </DropdownToggle>
                <DropdownMenu>
                    <div className="mx-2 p-2">
                        <div className="d-flex justify-content-center align-items-center">
                            <Input placeholder="Từ" type="number" value={value.from} onChange={(e) => onChange("from", e.target.value)} />
                            <ArrowRight className="mx-3" />
                            <Input placeholder="Đến" type="number" value={value.to} onChange={(e) => onChange("to", e.target.value)} />
                        </div>
                        <div className="search__price-select mt-2">
                            {priceOptions.map((item, index) => (
                                <div
                                    className="select__item hover-bg cursor-pointer my-2 px-2"
                                    key={index}
                                    onClick={() => {
                                        onChange("to", item.to);
                                        onChange("from", item.from);
                                    }}
                                >
                                    {item.label}
                                </div>
                            ))}
                        </div>
                    </div>
                </DropdownMenu>
            </Dropdown>
        </div>
    );
}

export default SelectPrice;
