import React from 'react';
import { Heart } from 'react-bootstrap-icons';
import { Button } from 'reactstrap';
import { listMenuItem } from '../../constants';

function Header(props) {

    return (
        <div className='header'>
            <div className='d-flex header__containter justify-content-between px-4'>
                <div className='d-flex'>
                    <div>
                        <img className='logo-app' src="https://staticfile.batdongsan.com.vn/images/logo/standard/red/logo.svg" alt='logo' />
                    </div>
                    {listMenuItem.map((menuItem, indexMenu) => (
                        <div className='menu__item mx-2 position-relative d-flex align-items-center' key={indexMenu}>
                            <div>{menuItem.title}</div>
                            <div className='sub-menu position-absolute py-2'>
                                {menuItem.subMenu.map((subMenuItem, indexSubMenu) => (
                                    <div className='sub-menu__item px-2 mx-2' key={indexSubMenu}>
                                        {subMenuItem.title}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div className='menu-action d-flex align-items-center'>
                    <div className='menu-action__item px-2 py-1 mx-2'>
                        <Heart/>
                    </div>
                    <div className='menu-action__item px-2 py-1 mx-2'>
                        Đăng nhập
                    </div>
                    <div className='menu-action__item px-2 py-1 mx-2'>
                        Đăng ký
                    </div>
                    <div className='menu-action__item mx-2'>
                        <Button>Đăng tin</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;