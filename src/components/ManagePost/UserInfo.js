import React, { useState } from "react";
import {
    ArrowDown,
    ArrowUp,
    BoxSeam,
    Buildings,
    CaretDown,
    CaretUp,
    Clipboard,
    CreditCard,
    Gear,
    GraphUp,
    GraphUpArrow,
    ListUl,
    Paperclip,
    QuestionCircleFill,
} from "react-bootstrap-icons";
import { Button, Tooltip } from "reactstrap";

function UserInfo(props) {
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const toggle = () => setTooltipOpen(!tooltipOpen);
    return (
        <div className="user-info px-2">
            <div className="d-flex align-items-center">
                <img className="avatar me-2" alt="avatar" src="https://icons.getbootstrap.com/assets/img/icons-hero.png" />
                <div>
                    <h5>user2078504</h5>
                    <div id="userPoint">
                        0 điểm <QuestionCircleFill />
                    </div>
                    <Tooltip isOpen={tooltipOpen} target="userPoint" toggle={toggle}>
                        Điểm tích luỹ
                    </Tooltip>
                </div>
            </div>
            <div className="info__card p-3">
                <h5>Số dư tài khoản</h5>
                <div className="d-flex justify-content-between">
                    <div>TK tin đăng</div>
                    <h6>0</h6>
                </div>
                <div className="d-flex justify-content-between">
                    <div>TK ngoài tin đăng</div>
                    <h6>0</h6>
                </div>
                <div className="d-flex justify-content-between">
                    <div>TK khuyến mãi 1</div>
                    <h6>40.000</h6>
                </div>
                <div className="d-flex justify-content-between">
                    <div>TK khuyến mãi 2</div>
                    <h6>0</h6>
                </div>
                <div className="transfer-box p-3 d-flex justify-content-between align-items-center">
                    <div>
                        <div>Mã chuyển khoản</div>
                        <h6>BDS20785044</h6>
                    </div>
                    <div>
                        <Clipboard size={26} />
                    </div>
                </div>
                <Button className="mt-2 w-100 d-flex align-items-center justify-content-center" outline color="danger">
                    <CreditCard className="me-2" />
                    <div>Nạp tiền</div>
                </Button>
            </div>
        </div>
    );
}

export default UserInfo;
