import React, { useState } from "react";
import { Input } from "reactstrap";
import { RequiredMark } from "../../utils";
import Select from "./Select";
import getAddress from "./getAddress";

function SelectAddress({ address, setAddress }) {
    const initCityOption = getAddress("city");
    const [options, setOptions] = useState({
        city: initCityOption,
        district: [],
        ward: [],
    });
    const handleChange = (type, value) => {
        if (type === "city") {
            setAddress({
                ...address,
                city: value,
                district: "",
                ward: "",
            });
            setOptions({
                ...options,
                district: getAddress("district", value),
                ward: [],
            });
        }
        if (type === "district") {
            setAddress({
                ...address,
                district: value,
                ward: "",
            });
            setOptions({
                ...options,
                ward: getAddress("ward", address.city, value),
            });
        }
        if (type === "ward") {
            setAddress({
                ...address,
                ward: value,
            });
        }
        if (type === "number") {
            setAddress({
                ...address,
                number: value,
            });
        }
    };
    return (
        <div>
            <div className="mt-4">
                <h6>
                    Tỉnh, thành phố
                    <RequiredMark />
                </h6>
                <Select value={address.city} label="VD: Nhà riêng" onChange={(e) => handleChange("city", e.target.value)} options={options.city} />
            </div>
            <div className="mt-4">
                <h6>
                    Quận, huyện
                    <RequiredMark />
                </h6>
                <Select
                    value={address.district}
                    label="VD: Nhà riêng"
                    onChange={(e) => handleChange("district", e.target.value)}
                    options={options.district}
                />
            </div>
            <div className="mt-4">
                <h6>
                    Phường, xã
                    <RequiredMark />
                </h6>
                <Select value={address.ward} label="VD: Nhà riêng" onChange={(e) => handleChange("ward", e.target.value)} options={options.ward} />
                <div className="mt-4">
                    <h6>
                        Số nhà cụ thể
                        <RequiredMark />
                    </h6>
                    <Input
                        fullWidth
                        value={address.number}
                        placeholder="Bạn có thể bổ sung hẻm, ngách, ngõ,.."
                        onChange={(e) => handleChange("number", e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
}

export default SelectAddress;
