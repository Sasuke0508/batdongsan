import { Dash, Plus } from "react-bootstrap-icons";
import { Button, Input } from "reactstrap";

function QuantityInfo({label, value, setValue, min = 0, max = 999}) {


    const handleIncrease = () => {
        if (value === max) return;
        setValue(value + 1);
    }

    const handleDecrease = () => {
        if (value === min) return;
        setValue(value - 1);
    }

    const handleChangeQuantityInfo = (e) => {
        let newValue = Number(e.target.value);
        if (newValue < min) newValue = min;
        else if (newValue > max) newValue = max;
        setValue(newValue);
    }

    return (
        <div className="d-flex justify-content-between">
            <h6>{ label }</h6>
            <div className="d-flex align-items-center">
                <Button outline onClick={handleDecrease}>
                    <Dash />
                </Button>
                <Input
                    style={{ width: "50px" }}
                    type="number"
                    value={value}
                    onChange={handleChangeQuantityInfo}
                />
                <Button outline onClick={handleIncrease}>
                    <Plus />
                </Button>
            </div>
        </div>
    )
}

export default QuantityInfo;