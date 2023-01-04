import React, { useEffect, useState } from "react";
import { Input } from "reactstrap";
import Select from "./Select";
import getAddress from "./getAddress";

function SelectAddress({ size, address, setAddress }) {
    const [options, setOptions] = useState(() => {
        const city = getAddress("city");
        const district = getAddress("district", address.city || city[0].value);
        const ward = getAddress("ward", address.city || city[0].value, address.district || district[0].value);
        return {
            city,
            district,
            ward,
        }
    });

    useEffect(() => {
        (!address.city && !address.district && !address.ward) && setAddress({
            city: options.city[0].value,
            district: options.district[0].value,
            ward: options.ward[0].value,
        });
    }, []);

    const handleChange = (type, value) => {
        if (type === "city") {
            const newAddress = getAddress("district", value)
            const newWards = getAddress("ward", value, newAddress[0].value);
            setAddress({
                ...address,
                city: value,
                district: newAddress[0]?.value,
                ward: newWards[0].value,
            });
            setOptions({
                ...options,
                district: newAddress,
                ward: newWards,
            });
        }
        if (type === "district") {
            const newAddress = getAddress("ward", address.city, value)
            setAddress({
                ...address,
                district: value,
                ward: newAddress[0]?.value,
            });
            setOptions({
                ...options,
                ward: newAddress,
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
        <div className={size === 'menu' ? 'p-2' : ''}>
            <div className={ size === 'menu' ? 'mt-2' :'mt-4'}>
                <h6 className="required">
                    Tỉnh, thành phố
                </h6>
                <Select 
                    value={address.city || ''} 
                    label="VD: Nhà riêng" 
                    onChange={(e) => handleChange("city", e.target.value)} 
                    options={options.city} 
                />
            </div>
            <div className={ size === 'menu' ? 'mt-2' :'mt-4'}>
                <h6 className="required">
                    Quận, huyện
                </h6>
                <Select
                    value={address.district || ''}
                    label="VD: Nhà riêng"
                    onChange={(e) => handleChange("district", e.target.value)}
                    options={options.district}
                />
            </div>
            <div className={ size === 'menu' ? 'mt-2' :'mt-4'}>
                <h6 className="required">
                    Phường, xã
                </h6>
                <Select
                    value={address.ward || ''} 
                    label="VD: Nhà riêng" 
                    onChange={(e) => handleChange("ward", e.target.value)} 
                    options={options.ward} 
                />
                {size !== 'menu' && <div className={ size === 'menu' ? 'mt-2' :'mt-4'}>
                    <h6 className="required">
                        Số nhà cụ thể
                    </h6>
                    <Input
                        fullwidth="true"
                        value={address.number || address.addressDetail || ''}
                        placeholder="Bạn có thể bổ sung hẻm, ngách, ngõ,.."
                        onChange={(e) => handleChange("number", e.target.value)}
                    />
                </div>}
            </div>
        </div>
    );
}

export default SelectAddress;
