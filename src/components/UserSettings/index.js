import React, { useState } from "react";
import { Pencil } from "react-bootstrap-icons";
import { Button, Input } from "reactstrap";

function UserSettings(props) {
    const [userInformation, setUserInformation] = useState({
        name: "Nguyen Tuan An",
        phoneNumber: "01234568***",
        email: "tuanan@phongtrochothue.com",
        address: "số 40, phường Nghĩa Tân, quận Cầu Giấy, Hà Nội",
        accountType: "VIP Đặc Biệt",
        date: "29/12/2022",
    });
    const handleChangeUserInformation = (type, value) => {
        setUserInformation({
            ...userInformation,
            [type]: value,
        });
    };
    const [editStatus, setEditStatus] = useState(false);
    return (
        <div className="user-settings">
            <div className="page-container-md">
                <div className="mt-4">
                    <h3>Quản lí thông tin cá nhân</h3>
                    <div className="mt-3">
                        <div className="text-center user__avatar position-relative">
                            A
                            <div className="position-absolute avatar__icon cursor-pointer">
                                <Pencil size={20} />
                            </div>
                        </div>
                        <div className="mt-3">
                            <h6>Tên người dùng</h6>
                            <Input
                                disabled={!editStatus}
                                className="w-50"
                                value={userInformation.name}
                                onChange={(e) => handleChangeUserInformation("name", e.target.value)}
                            ></Input>
                        </div>
                        <div className="mt-3">
                            <h6>Số điện thoại</h6>
                            <Input
                                disabled={!editStatus}
                                className="w-50"
                                value={userInformation.phoneNumber}
                                onChange={(e) => handleChangeUserInformation("phoneNumber", e.target.value)}
                            ></Input>
                        </div>
                        <div className="mt-3">
                            <h6>Email</h6>
                            <Input
                                disabled={!editStatus}
                                className="w-50"
                                value={userInformation.email}
                                onChange={(e) => handleChangeUserInformation("email", e.target.value)}
                            ></Input>
                        </div>
                        <div className="mt-3">
                            <h6>Địa chỉ</h6>
                            <Input
                                disabled={!editStatus}
                                className="w-50"
                                value={userInformation.address}
                                onChange={(e) => handleChangeUserInformation("address", e.target.value)}
                            ></Input>
                        </div>
                        <div className="mt-3">
                            <h6>
                                Ngày Tham gia: <span>{userInformation.date}</span>
                            </h6>
                        </div>
                        <div className="mt-3">
                            <h6>Loại tài khoản</h6>
                            <Input
                                disabled
                                className="w-50"
                                value={userInformation.accountType}
                                onChange={(e) => handleChangeUserInformation("accountType", e.target.value)}
                            ></Input>
                        </div>
                        <div className="my-3">
                            {!editStatus ? (
                                <Button onClick={() => setEditStatus(true)}>Chỉnh sửa</Button>
                            ) : (
                                <Button onClick={() => setEditStatus(false)}>Lưu thông tin</Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserSettings;
