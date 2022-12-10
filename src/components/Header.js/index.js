import React, { useState } from "react";
import { Bell, Heart } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import { listMenuItem, notiList } from "../../constants";
import { countUnreadNoti } from "../../utils";
import LoginModal from "../core/LoginModal";
import Notification from "../Notification";
import Notice from "../Notification";

function Header(props) {
    const navigate = useNavigate();
    const [openModalLogin, setOpenModalLogin] = useState(false);
    const [initMode, setInitMode] = useState("login");
    const [openNoti, setOpenNoti] = useState(false);
    return (
        <div className="header">
            <LoginModal open={openModalLogin} initMode={initMode} onToggle={() => setOpenModalLogin(!openModalLogin)} />
            <div className="d-flex header__container justify-content-between px-4">
                <div className="d-flex">
                    <div onClick={() => navigate("/")}>
                        <img className="logo-app" src="https://staticfile.batdongsan.com.vn/images/logo/standard/red/logo.svg" alt="logo" />
                    </div>
                    {listMenuItem.map((menuItem, indexMenu) => (
                        <div className="menu__item mx-2 position-relative d-flex align-items-center" key={indexMenu}>
                            <div>{menuItem.title}</div>
                            <div className="sub-menu position-absolute py-2">
                                {menuItem.subMenu.map((subMenuItem, indexSubMenu) => (
                                    <div className="sub-menu__item px-2 mx-2" key={indexSubMenu}>
                                        {subMenuItem.title}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="menu-action d-flex align-items-center">
                    <div className="menu-action__item px-2 py-1 mx-2">
                        <Heart />
                    </div>

                    <div className="position-relative">
                        <div className="menu-action__item px-2 py-1 mx-2" onClick={() => setOpenNoti(!openNoti)}>
                            <Bell />
                        </div>
                        <div className="noti__count position-absolute">
                            {countUnreadNoti(notiList)}
                        </div>
                        <Notification open={openNoti} setOpen={setOpenNoti} />
                    </div>
                    <div
                        className="menu-action__item px-2 py-1 mx-2"
                        onClick={() => {
                            setInitMode("login");
                            setOpenModalLogin(true);
                        }}
                    >
                        Đăng nhập
                    </div>
                    <div
                        className="menu-action__item px-2 py-1 mx-2"
                        onClick={() => {
                            setInitMode("signup");
                            setOpenModalLogin(true);
                        }}
                    >
                        Đăng ký
                    </div>
                    <div className="menu-action__item mx-2">
                        <Button onClick={() => navigate("/manager-post")}>Đăng tin</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
