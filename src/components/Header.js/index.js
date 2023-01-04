import React, { useRef, useState } from "react";
import { Bell, CaretDown, Heart } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Dropdown, DropdownMenu, DropdownToggle } from "reactstrap";
import logo from "../../assets/img/logo_app.png";
import { listMenuItem, notiList, userSettingsOptions } from "../../constants";
import { settingsDispatch } from "../../store/slices/settingsSlice";
import { tokenDispatch } from "../../store/slices/tokenSlice";
import { countUnreadNoti, msgPendingFeature } from "../../utils";
import LoginModal from "../core/LoginModal";
import Notification from "../Notification";

function Header(props) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loginModalRef = useRef();

    const currentUser = useSelector(store => store.tokenSlice.user);
    const loggedIn = !!currentUser;
    
    const [openModalLogin, setOpenModalLogin] = useState(false);
    const [initMode, setInitMode] = useState("login");
    const [openNoti, setOpenNoti] = useState(false);
    const [openUserSettings, setOpenUserSettings] = useState(false);

    const handleClickMenu = (path) => {
        setOpenUserSettings(false);
        if (path === '/login') {
            navigate('/login', { state: {initMode : 'changePassword'}})
            return
        }
        if (path === '/logout') {
            dispatch(settingsDispatch.actSetLoginStatus(false))
            dispatch(tokenDispatch.removeToken());
            localStorage.setItem('find_room_login_status', false)
            navigate('/')
            return
        }
        if (!path) {
            msgPendingFeature()
            return
        }
        navigate(path);
    };
    return (
        <div className="header">
            <LoginModal initMode={initMode} ref={loginModalRef} />
            <div className="d-flex header__container justify-content-between px-4">
                <div className="d-flex">
                    <div onClick={() => navigate("/")}>
                        <img className="logo-app" src={logo} alt="logo" />
                    </div>
                    {listMenuItem.map((menuItem, indexMenu) => (
                        <div className="menu__item mx-2 position-relative d-flex align-items-center" key={indexMenu}>
                            <div onClick={() => handleClickMenu(menuItem.path)}>{menuItem.title}</div>
                            {menuItem.subMenu && (
                                <div className="sub-menu position-absolute py-2">
                                    {menuItem.subMenu.map((subMenuItem, indexSubMenu) => (
                                        <div
                                            className="sub-menu__item px-2 mx-2"
                                            onClick={() => handleClickMenu(subMenuItem.path)}
                                            key={indexSubMenu}
                                        >
                                            {subMenuItem.title}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div className="menu-action d-flex align-items-center">
                    {loggedIn && <div
                        className="menu-action__item menu-action__item--saved-post position-relative px-2 py-1 mx-2"
                        onClick={() => handleClickMenu("/post/saved")}
                    >
                        <Heart />
                        <div className="noti__count position-absolute">1</div>
                    </div>
                    }

                    {loggedIn && (
                        <div className="position-relative">
                            <div className="menu-action__item px-2 py-1 mx-2" onClick={() => setOpenNoti(!openNoti)}>
                                <Bell />
                            </div>
                            <div className="noti__count position-absolute">{countUnreadNoti(notiList)}</div>
                            <Notification open={openNoti} setOpen={setOpenNoti} />
                        </div>
                    )}
                    {!loggedIn &&
                        <>
                            <div
                                className="menu-action__item px-2 py-1 mx-2"
                                onClick={() => {
                                    setInitMode("login");
                                    loginModalRef.current.onToggle();
                                }}
                            >
                                Đăng nhập
                            </div>
                            <div
                                className="menu-action__item px-2 py-1 mx-2"
                                onClick={() => {
                                    setInitMode("signup");
                                    loginModalRef.current.onToggle();
                                }}
                            >
                                Đăng ký
                            </div>
                        </>
                    }
                    {loggedIn && (
                        <div className="px-2 py-1 mx-2 d-flex align-items-center">
                            <div className="user__avatar d-flex justify-content-center align-items-center">
                                {
                                    currentUser?.systemUser?.avatar
                                    ?
                                        <img className="mw-100 mh-100" src={currentUser?.systemUser?.avatar} alt="avatar" />
                                    :

                                        <strong>A</strong>
                                }
                            </div>
                            <div>
                                <Dropdown isOpen={openUserSettings} toggle={() => setOpenUserSettings(!openUserSettings)} direction={"down"}>
                                    <DropdownToggle className="w-100" color="white">
                                        <div className="d-flex flex-nowrap align-items-center justify-content-between">
                                            <div className="d-flex align-items-center">{ currentUser?.systemUser?.fullName || currentUser.username }</div>
                                            <CaretDown className="ms-1" />
                                        </div>
                                    </DropdownToggle>
                                    <DropdownMenu style={{ minWidth: "250px" }}>
                                        {userSettingsOptions.map((item, index) => (
                                            <div
                                                key={index}
                                                className="mx-3 d-flex my-2 align-items-center"
                                                onClick={() => handleClickMenu(item.path)}
                                            >
                                                <div className="me-2">{item.icon}</div>
                                                <label className="d-flex align-items-center me-3 cursor-pointer">
                                                    <div>{item.title}</div>
                                                </label>
                                            </div>
                                        ))}
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                        </div>
                    )}
                    {
                        loggedIn && 
                        <div className="menu-action__item mx-2">
                            <Button outline className="has-border" color="white" onClick={() => navigate("/manager-post")}>
                                Đăng tin
                            </Button>
                        </div>
                    }
                    </div>
                </div>
        </div>
    )
}

export default Header;
