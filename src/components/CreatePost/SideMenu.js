import React, { useState } from "react";
import {
    ArrowDown,
    ArrowUp,
    BoxSeam,
    Buildings,
    CaretDown,
    CaretDownFill,
    CaretUp,
    CaretUpFill,
    ChevronDown,
    ChevronUp,
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

function SideMenu(props) {
    const menuItem = [
        {
            title: "Quản lý tin đăng",
            icon: <ListUl size={22} />,
            children: [{ title: "Đăng mới" }, { title: "Danh sách tin" }, { title: "Tin nháp" }, { title: "Quản lý tin tài trợ" }],
        },
        {
            title: "Tài khoản Pro",
            icon: <BoxSeam size={22} />,
            children: [{ title: "Đăng kí mua" }],
        },
        {
            title: "Quản lý tài chính",
            icon: <GraphUpArrow size={22} />,
            children: [
                { title: "Thông tin số dư" },
                { title: "Lịch sử giao dịch" },
                { title: "Nhóm khuyễn mãi" },
                { title: "Nạp tiền vào tài khoản" },
                { title: "Quản lý điểm tích luỹ" },
            ],
        },
        {
            title: "Quản lý TK Doanh nghiệp",
            icon: <Buildings size={22} />,
            children: [{ title: "Đăng ký tài khoản Doanh nghiệp" }],
        },
        {
            title: "Báo giá &  Hướng dẫn",
            icon: <Paperclip size={22} />,
            children: [{ title: "Báo giá" }, { title: "Hướng dẫn thanh toán" }, { title: "Hướng dẫn sử dụng" }],
        },
        {
            title: "Tiện ích",
            icon: <Gear size={22} />,
            children: [{ title: "Thông báo" }, { title: "Quản lý đăng kí nhận email" }, { title: "Yêu cầu xoá tài khoảnrnf" }],
        },
    ];

    const [selectedMenu, setSelectedMenu] = useState([]);
    const checkActiveMenu = (id) => selectedMenu.indexOf(id) !== -1;
    const handleClickMenu = (id) => {
        if (checkActiveMenu(id)) {
            const newItems = selectedMenu.filter((item) => item !== id);
            setSelectedMenu(newItems);
        } else {
            setSelectedMenu([...selectedMenu, id]);
        }
    };
    return (
        <div className="side__menu px-3 pt-2">
            {menuItem.map((item, index) => (
                <div className={`menu__item ${checkActiveMenu(index) ? "menu__item--active" : ""}`} key={index}>
                    <div className={`menu__item-main d-flex justify-content-between align-items-center `} onClick={() => handleClickMenu(index)}>
                        <div className="d-flex">
                            <div className="me-3 menu__icon">{item.icon}</div>
                            <div>{item.title}</div>
                        </div>
                        {checkActiveMenu(index) ? <ChevronUp /> : <ChevronDown />}
                    </div>
                    {item.children &&
                        item.children.map((children, indexChild) => (
                            <div className="menu__item-sub d-flex align-items-center" key={indexChild}>
                                <div className="me-3 menu__icon">{item.icon}</div>
                                <div>{children.title}</div>
                            </div>
                        ))}
                </div>
            ))}
        </div>
    );
}

export default SideMenu;
