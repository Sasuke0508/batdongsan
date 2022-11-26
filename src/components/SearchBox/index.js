import React, { useState } from 'react';
import { ArrowClockwise, CaretDown, House, Search } from 'react-bootstrap-icons';
import { Button, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Input, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';

function SearchBox(props) {
    const defaultSearch = {
        sellType: 0,
        houseType: 0,
        searchText: '',
        location: 'all',
        price: {
            from: 0,
            to: 0
        },
        status: 'all'
    }
    const [sellType, setSellType] = useState(defaultSearch.sellType)
    const [houseType, setHouseType] = useState(defaultSearch.houseType)
    const [searchText, setSearchText] = useState(defaultSearch.searchText)
    const [location, setLocation] = useState(defaultSearch.location)
    const [price, setPrice] = useState(defaultSearch.price)
    const [status, setStatus] = useState(defaultSearch.status)

    const handleClickSellType = (id) => {
        setSellType(id)
    }

    const isActiveTab = (id) => {
        return Number(id) === sellType
    }

    const tabs = [
        {
            id: 0,
            title: 'Nhà đất bán'
        },
        {
            id: 1,
            title: 'Nhà đất cho thuê'
        },
        {
            id: 2,
            title: 'Dự án'
        },
    ]

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen((prevState) => !prevState);

    return (
        <div className='search-box mt-5'>
            <Nav tabs>
                {tabs.map(item => (
                    <NavItem key={item.id}>
                        <NavLink
                            className={`${isActiveTab(item.id) ? 'active' : ''}`}
                            onClick={() => handleClickSellType(item.id)}
                        >
                            {item.title}
                        </NavLink>
                    </NavItem>
                ))}
            </Nav>
            <TabContent className='pt-4 p-3 mt-n2'>
                <TabPane >
                    <Row>
                        <Col md="3">
                            <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={'down'}>
                                <DropdownToggle>
                                    <div className='d-flex flex-nowrap align-items-center'>
                                        <House className='me-1' />
                                        <span>Loại nhà đất</span>
                                        <CaretDown className='ms-1' />
                                    </div>
                                </DropdownToggle>
                                <DropdownMenu>
                                    <div className='mx-2'>
                                        <input type="checkbox" checked={true} className="mx-1"></input>
                                        <label>Tất cả nhà đất</label>
                                    </div>
                                </DropdownMenu>
                            </Dropdown>
                        </Col>
                        <Col md="7">
                            <div className='d-flex align-items-center'>
                                <Input placeholder='Tìm kiếm' />
                            </div>
                        </Col>
                        <Col md="2">
                            <Button>
                                <div className='d-flex align-items-center'>
                                    <Search className='me-1' />
                                    <span>Search</span>
                                </div>
                            </Button>
                        </Col>
                    </Row>
                    <Row className='mt-4'>
                        <Col md={11}>
                            <Row>
                                <Col md={3}>
                                    <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={'down'}>
                                        <DropdownToggle>
                                            <div className='d-flex flex-nowrap align-items-center'>
                                                <House className='me-1' />
                                                <span>Loại nhà đất</span>
                                                <CaretDown className='ms-1' />
                                            </div>
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <div className='mx-2'>
                                                <input type="checkbox" checked={true} className="mx-1"></input>
                                                <label>Tất cả nhà đất</label>
                                            </div>
                                        </DropdownMenu>
                                    </Dropdown>
                                </Col>
                                <Col md={3}>
                                    <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={'down'}>
                                        <DropdownToggle>
                                            <div className='d-flex flex-nowrap align-items-center'>
                                                <House className='me-1' />
                                                <span>Loại nhà đất</span>
                                                <CaretDown className='ms-1' />
                                            </div>
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <div className='mx-2'>
                                                <input type="checkbox" checked={true} className="mx-1"></input>
                                                <label>Tất cả nhà đất</label>
                                            </div>
                                        </DropdownMenu>
                                    </Dropdown>
                                </Col>
                                <Col md={3}>
                                    <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={'down'}>
                                        <DropdownToggle>
                                            <div className='d-flex flex-nowrap align-items-center'>
                                                <House className='me-1' />
                                                <span>Loại nhà đất</span>
                                                <CaretDown className='ms-1' />
                                            </div>
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <div className='mx-2'>
                                                <input type="checkbox" checked={true} className="mx-1"></input>
                                                <label>Tất cả nhà đất</label>
                                            </div>
                                        </DropdownMenu>
                                    </Dropdown>
                                </Col>
                                <Col md={3}>
                                    <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={'down'}>
                                        <DropdownToggle>
                                            <div className='d-flex flex-nowrap align-items-center'>
                                                <House className='me-1' />
                                                <span>Loại nhà đất</span>
                                                <CaretDown className='ms-1' />
                                            </div>
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <div className='mx-2'>
                                                <input type="checkbox" checked={true} className="mx-1"></input>
                                                <label>Tất cả nhà đất</label>
                                            </div>
                                        </DropdownMenu>
                                    </Dropdown>
                                </Col>
                            </Row>
                        </Col>
                        <Col>
                            <Button>
                                <ArrowClockwise />
                            </Button>
                        </Col>
                    </Row>
                </TabPane>
            </TabContent>
        </div>
    );
}

export default SearchBox;