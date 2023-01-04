import { useState } from "react";

export default function useFormInput(initValue) {

    const [value, setValue] = useState(initValue ?? "");

    return {
        value: value,
        onChange: e => {
            setValue(e.target.value);
        },
        setvalue: setValue,
    }
}