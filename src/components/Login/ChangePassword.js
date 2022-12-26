import React from "react";
import { Button, Input } from "reactstrap";

function ChangePassword({setViewMode}) {
    return (
        <div className="p-4">
            <h5>Thay đổi mật khẩu</h5>
            <Input className="mt-3" type="password" placeholder="Mật khẩu cũ" />
            <Input className="mt-3" type="password" placeholder="Mật khẩu mới" />
            <Input className="mt-3" type="password" placeholder="Nhập lại khẩu mới" />
            <Button className="w-100 mt-3" primary>
                Xác nhận
            </Button>
        </div>
    );
}

export default ChangePassword;
