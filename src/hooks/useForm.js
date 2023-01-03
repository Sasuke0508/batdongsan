import { useState } from "react";

function useForm(initValue) {

    const [ input, setInput ] = useState(initValue);

    return {
        data: input,
        onChange: e => {
            setInput({
                ...input,
                [e.target.name]: e.target.value
            })
        }
    }
}

export default useForm;