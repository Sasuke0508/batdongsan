import React from "react";
import { Input } from "reactstrap";

function Select(props) {
    const { value, onChange, options, placeholder } = props;
    return (
        <Input type="select" fullWidth value={value} placeholder={placeholder} onChange={onChange}>
            {options.map((item, index) => (
                <option key={index} value={item.value}>
                    {item.label}
                </option>
            ))}
        </Input>
    );
}

export default Select;
