import React, { useState } from "react";
import {
    Clipboard,
    CreditCard, QuestionCircleFill
} from "react-bootstrap-icons";
import { Button, Tooltip } from "reactstrap";
import Swal from "sweetalert2";
import logo from "../../assets/img/user/user_avatar.jpg";


function UserInfo(props) {
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const toggle = () => setTooltipOpen(!tooltipOpen);
    const handleClickAddFund = () => {
        Swal.fire('', 'Đã sao chép số mã chuyển khoản!')
    }
    return (
        <div className="user-info px-2">
            <div className="d-flex align-items-center">
                <img className="avatar me-2" alt="avatar" src={logo} />
                <div>
                    <h5>tuanan2078504</h5>
                    <div id="userPoint">
                        22 điểm <QuestionCircleFill />
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
                    <h6>200.000đ</h6>
                </div>
                <div className="transfer-box p-3 d-flex justify-content-between align-items-center">
                    <div>
                        <div>Mã chuyển khoản</div>
                        <h6>BDS20785044</h6>
                    </div>
                    <div className="cursor-pointer" onClick={handleClickAddFund}>
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
