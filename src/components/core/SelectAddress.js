import React, { useEffect, useState } from "react";
import { Input } from "reactstrap";
import { RequiredMark } from "../../utils";
import getAddress from "./getAddress";
import Select from "./Select";

function SelectAddress({ size, address, setAddress }) {
    const initCityOption = getAddress("city");
    const [options, setOptions] = useState({
        city: initCityOption,
        district: [],
        ward: [],
    });
    const handleChange = (type, value) => {
        if (type === "city") {
            const newAddress = getAddress("district", value);
            setAddress(() => ({
                ...address,
                city: value,
                district: newAddress[0]?.value,
                ward: "",
            }));
            setOptions(() => ({
                ...options,
                district: newAddress,
                ward: [],
            }));
        }
        if (type === "district") {
            const newAddress = getAddress("ward", address.city, value);
            setAddress(() => ({
                ...address,
                district: value,
                ward: newAddress[0]?.value,
            }));
            setOptions(() => ({
                ...options,
                ward: newAddress,
            }));
        }
        if (type === "ward") {
            setAddress(() => ({
                ...address,
                ward: value,
            }));
        }
        if (type === "number") {
            setAddress(() => ({
                ...address,
                number: value,
            }));
        }
    };
    useEffect(() => {
        if (address.city) {
            handleChange("city", address.city);
        }

    }, []);
    useEffect(() => {
        if (address.district) {
            handleChange("district", address.district);
            console.log(1);
        }
    }, []);
    return (
        <div className={size === "menu" ? "p-2" : ""}>
            <div className={size === "menu" ? "mt-2" : "mt-4"}>
                <h6>
                    Tỉnh, thành phố
                    <RequiredMark />
                </h6>
                <Select value={address.city} label="VD: Nhà riêng" onChange={(e) => handleChange("city", e.target.value)} options={options.city} />
            </div>
            <div className={size === "menu" ? "mt-2" : "mt-4"}>
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
            <div className={size === "menu" ? "mt-2" : "mt-4"}>
                <h6>
                    Phường, xã
                    <RequiredMark />
                </h6>
                <Select value={address.ward} label="VD: Nhà riêng" onChange={(e) => handleChange("ward", e.target.value)} options={options.ward} />
                {size !== "menu" && (
                    <div className={size === "menu" ? "mt-2" : "mt-4"}>
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
                )}
            </div>
        </div>
    );
}

export default SelectAddress;
