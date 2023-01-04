import React, { useRef, useState } from "react";
import { Bell, CaretDown, Heart } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Dropdown, DropdownMenu, DropdownToggle } from "reactstrap";
import { listMenuItem, notiList, userSettingsOptions } from "../../constants";
import { tokenDispatch } from "../../store/slices/tokenSlice";
import { countUnreadNoti } from "../../utils";
import LoginModal from "../core/LoginModal";
import Notification from "../Notification";

function Header(props) {

    const currentUser = useSelector(store => store.tokenSlice.user);
    const loggedIn = !!currentUser;
    const [initMode, setInitMode] = useState("login");
    const [openNoti, setOpenNoti] = useState(false);
    const [openUserSettings, setOpenUserSettings] = useState(false);
    
    const navigate = useNavigate();
    const loginModalRef = useRef();
    const dispatch = useDispatch();

    const handlePathMenu = (path) => {
        setOpenUserSettings(false);
        if (path === '/login') {
            navigate('/login', { state: {initMode : 'changePassword'}})
            return
        }
        navigate(path);
    };

    const handleOpenModal = (viewModel) => {
        setInitMode(viewModel);
        loginModalRef.current.onToggle();
    }

    const handleLogout = () => {
        dispatch(
            tokenDispatch.removeToken()
        );
        navigate('/login');
    }

    return (
        <div className="header">
            <LoginModal initMode={initMode} ref={loginModalRef}/>
            <div className="d-flex header__container justify-content-between px-4">
                <div className="d-flex">
                    <div onClick={() => navigate("/")}>
                        <img className="logo-app" src="https://staticfile.batdongsan.com.vn/images/logo/standard/red/logo.svg" alt="logo" />
                    </div>
                    {listMenuItem.map((menuItem, indexMenu) => (
                        <div className="menu__item mx-2 position-relative d-flex align-items-center" key={indexMenu}>
                            <div onClick={() => handlePathMenu(menuItem.path)}>{menuItem.title}</div>
                            {menuItem.subMenu && (
                                <div className="sub-menu position-absolute py-2">
                                    {menuItem.subMenu.map((subMenuItem, indexSubMenu) => (
                                        <div
                                            className="sub-menu__item px-2 mx-2"
                                            onClick={() => handlePathMenu(subMenuItem.path)}
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

                    {loggedIn && (
                       <>
                            <div
                                className="menu-action__item menu-action__item--saved-post position-relative px-2 py-1 mx-2"
                                onClick={() => handlePathMenu("/post/saved")}
                            >
                                <Heart />
                                <div className="noti__count position-absolute">1</div>
                            </div>
                            <div className="position-relative">
                                <div className="menu-action__item px-2 py-1 mx-2" onClick={() => setOpenNoti(!openNoti)}>
                                    <Bell />
                                </div>
                                <div className="noti__count position-absolute">{countUnreadNoti(notiList)}</div>
                                <Notification open={openNoti} setOpen={setOpenNoti} />
                            </div>
                       </>
                    )}
                    {!loggedIn &&
                        <>
                            <div
                                className="menu-action__item px-2 py-1 mx-2"
                                onClick={() => handleOpenModal('login')}
                            >
                                Đăng nhập
                            </div>
                            <div
                                className="menu-action__item px-2 py-1 mx-2"
                                onClick={() => handleOpenModal('signup')}
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
                                                onClick={() => {
                                                    if (item.path) {
                                                        handlePathMenu(item.path);
                                                    } else if (item.onClick) {
                                                        item.onClick((type) => {

                                                            if (type === 'LOG_OUT') {
                                                                handleLogout();
                                                            }
                                                            
                                                        });
                                                    }
                                                }}
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
                    {loggedIn && 
                    <div className="menu-action__item mx-2">
                        <Button outline className="has-border" color="white" onClick={() => navigate("/manager-post")}>
                            Đăng tin
                        </Button>
                    </div>}
                </div>
            </div>
        </div>
    );
}

export default Header;
