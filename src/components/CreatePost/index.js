import { InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";
import { Plus } from "react-bootstrap-icons";
import { Badge, Button, ButtonGroup, Card, Col, Input, Label, Modal, ModalHeader, Row } from "reactstrap";
import { sellTypes, sellUnits, utilityList as initUtilityList } from "../../constants/menu";
import { checkArrayHasItem, convertInputTextToObject, removeAccents } from "../../utils";
import SideMenu from "./SideMenu";
import UserInfo from "./UserInfo";

function CreatePost(props) {
    const [isSell, setIsSell] = useState(true);
    const handleClickSaleType = (status) => {
        setIsSell(status);
    };

    const [sellType, setSellType] = useState(sellTypes[0].value);

    const handleChangeSellType = (event) => {
        setSellType(event.target.value);
    };

    const [address, setAddress] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [areaSize, setAreaSize] = useState("");
    const [price, setPrice] = useState({ value: "", unit: sellUnits[0].value });

    const [utilityList, setUtilityList] = useState(initUtilityList);
    const [utilities, setUtilities] = useState([]);

    const handleAddUtilityList = (item) => {
        const newValue = [...utilityList, convertInputTextToObject(item)];
        setUtilityList(newValue);
    };

    const handleClickUtility = (item) => {
        let newValue = [];
        const existed = checkArrayHasItem(item.value, utilities, "value");
        console.log(existed)
        if (existed) {
            newValue = utilities.filter((util) => util.value !== item.value);
        } else {
            newValue = [...utilities ,item];
        }
        setUtilities(newValue);
    };
    const [openModalAddUtility , setOpenModalAddUtility] = useState(true)

    const RequiredMark = () => <span style={{ color: "red" }}>*</span>;
    return (
        <div className="create-post">
            <Row className="w-100">
                <Col md={2} className="side-bar">
                    <UserInfo />
                    <SideMenu />
                </Col>
                <Col md={10}>
                    <div className="page-container-md">
                        <Card className="mt-3 p-4">
                            <h5>Thông tin cơ bản</h5>
                            <ButtonGroup className="mt-3">
                                <Button size="sm" outline={!isSell} onClick={() => handleClickSaleType(true)}>
                                    Bán
                                </Button>
                                <Button size="sm" outline={isSell} onClick={() => handleClickSaleType(false)}>
                                    Cho thuê
                                </Button>
                            </ButtonGroup>
                            <div className="mt-4">
                                <div className="mt-2">
                                    <h6>
                                        Loại bất động sản <RequiredMark />
                                    </h6>
                                    <Select fullWidth value={sellType} label="VD: Nhà riêng" onChange={handleChangeSellType}>
                                        {sellTypes.map((item, index) => (
                                            <MenuItem key={index} value={item.value}>
                                                {item.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </div>
                                <div className="mt-4">
                                    <h6>
                                        Tỉnh, thành phố
                                        <RequiredMark />
                                    </h6>
                                    <Select fullWidth value={sellType} label="VD: Nhà riêng" onChange={handleChangeSellType}>
                                        {sellTypes.map((item, index) => (
                                            <MenuItem key={index} value={item.value}>
                                                {item.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </div>
                                <div className="mt-4">
                                    <h6>
                                        Quận, huyện
                                        <RequiredMark />
                                    </h6>
                                    <Select fullWidth value={sellType} label="VD: Nhà riêng" onChange={handleChangeSellType}>
                                        {sellTypes.map((item, index) => (
                                            <MenuItem key={index} value={item.value}>
                                                {item.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </div>
                                <div className="mt-4">
                                    <h6>
                                        Phường, xã
                                        <RequiredMark />
                                    </h6>
                                    <Select fullWidth value={sellType} label="VD: Nhà riêng" onChange={handleChangeSellType}>
                                        {sellTypes.map((item, index) => (
                                            <MenuItem key={index} value={item.value}>
                                                {item.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </div>
                                <div className="mt-4">
                                    <h6>
                                        Đường, phố
                                        <RequiredMark />
                                    </h6>
                                    <Select fullWidth value={sellType} label="VD: Nhà riêng" onChange={handleChangeSellType}>
                                        {sellTypes.map((item, index) => (
                                            <MenuItem key={index} value={item.value}>
                                                {item.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </div>
                                <div className="mt-4">
                                    <h6>
                                        Địa chỉ hiển thị trên tin đăng
                                        <RequiredMark />
                                    </h6>
                                    <TextField
                                        fullWidth
                                        value={address}
                                        label="Bạn có thể bổ sung hẻm, ngách, ngõ,.."
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                </div>
                            </div>
                        </Card>
                        <Card className="mt-3 p-4">
                            <h5>Thông tin bài viết</h5>
                            <div className="mt-2">
                                <h6>
                                    Tiêu đề
                                    <RequiredMark />
                                </h6>
                                <Input
                                    fullWidth
                                    value={title}
                                    placeholder="VD: Bán nhà riêng 50m2 chính chủ tại Cầu Giấy"
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                <Label className="opacity-75 mt-1">Tối thiểu 30 ký tự, tối đa 99 ký tự</Label>
                            </div>
                            <div className="mt-2">
                                <h6>
                                    Mô tả
                                    <RequiredMark />
                                </h6>
                                <Input
                                    type="textarea"
                                    fullWidth
                                    style={{ minHeight: "200px" }}
                                    value={description}
                                    placeholder="Nhập mô tả chung về bất động sản của bạn. Ví dụ: Khu nhà có vị trí thuận lợi, gần công viên, gần trường học ... "
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                <Label className="opacity-75 mt-1">Tối thiểu 30 ký tự, tối đa 3.000 ký tự</Label>
                            </div>
                        </Card>
                        <Card className="mt-3 p-4">
                            <h5>Thông tin bất động sản</h5>
                            <div className="mt-2">
                                <h6>
                                    Diện tích
                                    <RequiredMark />
                                </h6>
                                <Input fullWidth value={areaSize} placeholder="Nhập diện tích, VD 80" onChange={(e) => setAreaSize(e.target.value)} />
                            </div>
                            <div className="mt-4">
                                <Row>
                                    <Col md={9}>
                                        <h6>
                                            Mức giá
                                            <RequiredMark />
                                        </h6>
                                        <Input
                                            fullWidth
                                            value={price.value}
                                            placeholder="Nhập giá, VD 12000000000"
                                            onChange={(e) => setPrice({ ...price, value: e.target.value })}
                                        />
                                    </Col>
                                    <Col md={3}>
                                        <h6>
                                            Đơn vị
                                            <RequiredMark />
                                        </h6>
                                        <Input
                                            type="select"
                                            fullWidth
                                            value={price.unit}
                                            placeholder="Nhập giá, VD 12000000000"
                                            onChange={(e) => setPrice({ ...price, unit: e.target.value })}
                                        >
                                            {sellUnits.map((item, index) => (
                                                <option key={index} value={item.value}>
                                                    {item.label}
                                                </option>
                                            ))}
                                        </Input>
                                    </Col>
                                </Row>
                            </div>
                            <div className="mt-4">
                                <h6>
                                    Tiện ích
                                    <RequiredMark />
                                </h6>
                                <div className="d-flex">
                                    {utilityList.map((item, index) => (
                                        <Badge
                                            className={`utility__item mx-2 p-2 ${
                                                checkArrayHasItem(item.value, utilities, "value") ? "utility__item--selected" : ""
                                            }`}
                                            color={checkArrayHasItem(item.value, utilities, "value") ? "info" : 'secondary'}
                                            key={index}
                                            onClick={() => handleClickUtility(item)}
                                        >
                                            {item.label}
                                        </Badge>
                                    ))}
                                    <Button size="sm" outline className="d-flex align-items-center" onClick={() => setOpenModalAddUtility(true)}><Plus/></Button>
                                    <Modal isOpen={openModalAddUtility} toggle={() => setOpenModalAddUtility(!openModalAddUtility)} centered>
                                        <ModalHeader>
                                            Thêm tiện ích
                                        </ModalHeader>
                                        
                                    </Modal>
                                </div>
                            </div>
                        </Card>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default CreatePost;
