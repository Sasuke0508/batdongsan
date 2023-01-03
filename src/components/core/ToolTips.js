import React, { useState } from "react";
import { Tooltip } from "reactstrap";

function ToolTips(props) {
    const { target } = props;
    const [openToolTip, setOpenToolTips] = useState(false);

    return (
        <div>
            <Tooltip target={target} isOpen={openToolTip} toggle={() => setOpenToolTips(!openToolTip)}>
                {props.children}
            </Tooltip>
        </div>
    );
}

export default ToolTips;
