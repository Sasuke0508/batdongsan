import moment from "moment/moment";
import { useMemo, useState } from "react";
import {
    ArrowClockwise,
    ChevronRight,
    CloudArrowUp,
    Dash,
    Fonts,
    InfoCircle,
    List,
    Plus,
    QuestionCircleFill,
    X,
    Youtube,
} from "react-bootstrap-icons";
import { useLocation } from "react-router-dom";
import { Badge, Button, Card, Col, Input, Label, Modal, ModalBody, ModalHeader, Progress, Row, Tooltip } from "reactstrap";
import { postTypePlan, sellTypes, sellUnits, utilityList as initUtilityList } from "../../constants/menu";
import { checkArrayHasItem, convertInputTextToObject, formatCurrency } from "../../utils";
import { uploadImage } from "../core/firebase";
import Select from "../core/Select";
import SelectAddress from "../core/SelectAddress";

function CreateNewPost(props) {
    const location = useLocation();
    const dataEditPost = location?.state?.dataEditPost || {};
    // thong tin co ban
    const [isSell, setIsSell] = useState(true);
    const handleClickSaleType = (status) => {
        setIsSell(status);
    };

    const [sellType, setSellType] = useState(sellTypes[0].value);
    const handleChangeSellType = (event) => {
        setSellType(event.target.value);
    };

    const [address, setAddress] = useState(
        dataEditPost.address || {
            city: "",
            district: "",
            ward: "",
            number: "",
        }
    );
    // thong tin bai dang

    const [title, setTitle] = useState(dataEditPost.title || "");
    const [description, setDescription] = useState(dataEditPost.description || "");

    // thong tin bat dong san

    const [areaSize, setAreaSize] = useState(dataEditPost.areaSize || "");
    const [price, setPrice] = useState(dataEditPost.price || { value: "", unit: sellUnits[0].value });
    const [quantityInfo, setQuantityInfo] = useState(dataEditPost.quantityInfo || { bedRoom: 0, bathRoom: 0, floor: 0 });
    const handleChangeQuantityInfo = (value, field) => {
        if (value >= 0) {
            setQuantityInfo({ ...quantityInfo, [field]: Number(value) });
        }
    };
    const handleClickQuantityButton = (type, field) => {
        if (type === "increase") {
            handleChangeQuantityInfo(quantityInfo[field] + 1, field);
        } else {
            handleChangeQuantityInfo(quantityInfo[field] - 1, field);
        }
    };

    // Tien ich

    const [utilityList, setUtilityList] = useState(initUtilityList);
    const [selectedUtilities, setSelectedUtilities] = useState([]);
    const [openModalAddUtility, setOpenModalAddUtility] = useState(false);
    const [utilityText, setUtilityText] = useState("");

    const handleAddUtilityList = (item) => {
        const newValue = [...utilityList, convertInputTextToObject(item)];
        setUtilityList(newValue);
        setSelectedUtilities([...selectedUtilities, convertInputTextToObject(item)]);
        setOpenModalAddUtility(false);
        setUtilityText("");
    };

    const handleClickUtility = (item) => {
        let newValue = [];
        const existed = checkArrayHasItem(item.value, selectedUtilities, "value");
        console.log(existed);
        if (existed) {
            newValue = selectedUtilities.filter((util) => util.value !== item.value);
        } else {
            newValue = [...selectedUtilities, item];
        }
        setSelectedUtilities(newValue);
    };

    // Thong tin bo sung
    const [entranceSize, setEntranceSize] = useState(dataEditPost.entranceSize || "");
    const [frontSize, setFrontSize] = useState(dataEditPost.frontSize || "");
    const [youtubeLink, setYoutubeLink] = useState("");

    // Thong tin lien he
    const [contactInfo, setContactInfo] = useState(
        dataEditPost.contactInfo || {
            name: "",
            phoneNumber: "",
            address: "",
            email: "",
        }
    );

    const handleChangeContactInfo = (value, field) => {
        const newValue = { ...contactInfo, [field]: value };
        setContactInfo(newValue);
    };

    // file upload
    const [fileUpload, setFileUpload] = useState([]);
    const [imageUrls, setImageUrls] = useState(dataEditPost.imageUrls || []);
    const [loadingUploadImage, setLoadingUploadImage] = useState({
        status: false,
        value: 0,
    });

    const handleUploadFiles = async (files) => {
        setLoadingUploadImage({ status: true, value: 10 });
        const arrayImage = Object.values(files);
        const result = await Promise.all(arrayImage.map((item) => uploadImage(item)));
        setFileUpload(files);
        setImageUrls(result);
        setLoadingUploadImage({ status: true, value: 100 });
        setTimeout(() => {
            setLoadingUploadImage({ status: false, value: 10 });
        }, 500);
    };

    const handleClickCancelFile = () => {
        setFileUpload({});
    };
    const FileLabel = () => {
        return (
            <div className="d-flex flex-wrap align-items-center">
                {imageUrls.map((item, index) => (
                    <div className="m-2" key={index}>
                        <img style={{ height: "100px", weight: "100%" }} alt="upload" src={item} />
                    </div>
                ))}
                <div className="cursor-pointer" onClick={handleClickCancelFile}>
                    Huỷ
                    <X size="28" />
                </div>
            </div>
        );
    };
    const RequiredMark = () => <span style={{ color: "red" }}>*</span>;

    // Post config
    const [postPlan, setPostPlan] = useState(1);
    const [viewMorePostType, setViewMorePostType] = useState(true);
    const [highlightPost, setHighlightPost] = useState(false);
    const [postDays, setPostDays] = useState(10);
    const [postStartDate, setPostStartDate] = useState(dataEditPost.postStartDate || moment(new Date()).format("YYYY-MM-DD"));
    const [postStartTime, setPostStartTime] = useState(moment(new Date()).format("HH:mm"));
    const [autoRePost, setAutoRePost] = useState(false);

    const totalPrice = useMemo(() => {
        let total = 0;
        total = Number(postTypePlan[postPlan].price) * postDays;
        if (highlightPost) {
            total = Math.ceil(total * 1.2);
        }
        return total;
    }, [postPlan, postDays, highlightPost]);

    const [tooltipOpen, setTooltipOpen] = useState({
        highlightPost: false,
        rePost: false,
    });

    const handleClickPostPlan = (id) => {
        setPostPlan(id);
    };

    const handleClickSubmit = (e) => {
        e.preventDefault();
    };

    const toggle = (type) => setTooltipOpen({ ...tooltipOpen, [type]: !tooltipOpen[type] });
    return (
        <div className="page-container-md">
            {dataEditPost.address && <h4 className="mt-2">Chỉnh sửa bài đăng</h4>}
            <Card className="mt-3 p-4">
                <h5>Thông tin cơ bản</h5>
                {/* <ButtonGroup className="mt-3">
                    <Button size="sm" outline={!isSell} onClick={() => handleClickSaleType(true)}>
                        Bán
                    </Button>
                    <Button size="sm" outline={isSell} onClick={() => handleClickSaleType(false)}>
                        Cho thuê
                    </Button>
                </ButtonGroup> */}
                <div className="mt-2">
                    <div className="mt-2">
                        <h6>
                            Loại phòng <RequiredMark />
                        </h6>
                        <Select value={sellType} label="VD: Nhà riêng" onChange={handleChangeSellType} options={sellTypes} />
                    </div>
                    <SelectAddress address={address} setAddress={setAddress} />
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
                        placeholder="VD: Cho thuê nhà riêng 50m2 chính chủ tại Cầu Giấy"
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
                <h5>Thông tin phòng trọ</h5>
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
                            <Select
                                value={price.unit}
                                onChange={(e) => setPrice({ ...price, unit: e.target.value })}
                                placeholder="Nhập giá, VD 12000000000"
                                options={sellUnits}
                            />
                        </Col>
                    </Row>
                </div>
                <div className="mt-4">
                    <h6>
                        Tiện ích
                        <RequiredMark />
                    </h6>
                    <div className="d-flex flex-wrap">
                        {utilityList.map((item, index) => (
                            <Badge
                                className={`utility__item mx-2 p-2 ${
                                    checkArrayHasItem(item.value, selectedUtilities, "value") ? "utility__item--selected" : ""
                                }`}
                                color={checkArrayHasItem(item.value, selectedUtilities, "value") ? "danger" : ""}
                                key={index}
                                onClick={() => handleClickUtility(item)}
                            >
                                {item.label}
                            </Badge>
                        ))}
                        <Button size="sm" outline className="d-flex align-items-center" onClick={() => setOpenModalAddUtility(true)}>
                            <Plus />
                        </Button>
                        <Modal isOpen={openModalAddUtility} toggle={() => setOpenModalAddUtility(!openModalAddUtility)} centered>
                            <ModalHeader toggle={() => setOpenModalAddUtility(!openModalAddUtility)}>Thêm tiện ích</ModalHeader>
                            <ModalBody>
                                <div>Tên tiện ích</div>
                                <div className="d-flex pb-4">
                                    <Input value={utilityText} onChange={(e) => setUtilityText(e.target.value)} />
                                    <Button color="danger" onClick={() => handleAddUtilityList(utilityText)}>
                                        Thêm
                                    </Button>
                                </div>
                            </ModalBody>
                        </Modal>
                    </div>
                </div>
                <hr />
                <div className="mt-4">
                    <div className="d-flex justify-content-between">
                        <h6>Số phòng ngủ</h6>
                        <div className="d-flex align-items-center">
                            <Button outline onClick={() => handleClickQuantityButton("decrease", "bedRoom")}>
                                <Dash />
                            </Button>
                            <Input
                                style={{ width: "50px" }}
                                type="number"
                                value={quantityInfo.bedRoom}
                                onChange={(e) => handleChangeQuantityInfo(Number(e.target.value), "bedRoom")}
                            />
                            <Button outline onClick={() => handleClickQuantityButton("increase", "bedRoom")}>
                                <Plus />
                            </Button>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between mt-3">
                        <h6>Số phòng tắm, vệ sinh</h6>
                        <div className="d-flex align-items-center">
                            <Button outline onClick={() => handleClickQuantityButton("decrease", "bathRoom")}>
                                <Dash />
                            </Button>
                            <Input
                                style={{ width: "50px" }}
                                type="number"
                                value={quantityInfo.bathRoom}
                                onChange={(e) => handleChangeQuantityInfo(Number(e.target.value), "bathRoom")}
                            />
                            <Button outline onClick={() => handleClickQuantityButton("increase", "bathRoom")}>
                                <Plus />
                            </Button>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between mt-3">
                        <h6>Số tầng</h6>
                        <div className="d-flex align-items-center">
                            <Button outline onClick={() => handleClickQuantityButton("decrease", "floor")}>
                                <Dash />
                            </Button>
                            <Input
                                style={{ width: "50px" }}
                                type="number"
                                value={quantityInfo.floor}
                                onChange={(e) => handleChangeQuantityInfo(Number(e.target.value), "floor")}
                            />
                            <Button outline onClick={() => handleClickQuantityButton("increase", "floor")}>
                                <Plus />
                            </Button>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="mt-4">
                    <div className="">
                        <h6>Đường vào</h6>
                        <Input value={entranceSize} onChange={(e) => setEntranceSize(e.target.value)} placeholder="Nhập số" />
                    </div>
                    <div className="mt-4">
                        <h6>Mặt tiền</h6>
                        <Input value={frontSize} onChange={(e) => setFrontSize(e.target.value)} placeholder="Nhập số" />
                    </div>
                </div>
            </Card>
            <Card className="mt-3 p-4">
                <div className="d-flex justify-content-between align-items-center">
                    <h5>Hình ảnh & Video</h5>
                    <div className="opacity-75 d-flex align-items-center">
                        <InfoCircle className="me-1" />
                        <a alt="policy" href="#" style={{ color: "#000", textDecoration: "none" }}>
                            Quy định đăng hình & video
                        </a>
                    </div>
                </div>
                <ul className="mt-2">
                    <li> Hãy dùng ảnh thật, không trùng, không chèn số điện thoại</li>
                    <li>Mỗi ảnh kích thước tối thiểu 100x100 px, tối đa 15 MB</li>
                    <li>Số lượng ảnh tối đa tuỳ theo loại tin chọn ở bước tiếp theo</li>
                </ul>
                <Label for="create-post-upload" className="create-post-upload__label d-flex flex-column align-items-center cursor-pointer p-4">
                    <CloudArrowUp size={50} />
                    <div>Bấm để chọn ảnh cần tải lên</div>
                    <div className="opacity-75">hoặc kéo thả ảnh vào đây</div>
                </Label>
                <Input
                    className="d-none"
                    id="create-post-upload"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleUploadFiles(e.target.files)}
                />
                {!!imageUrls.length && !loadingUploadImage.status && <FileLabel />}
                {loadingUploadImage.status && <Progress value={loadingUploadImage.value} />}
                <div className="mt-4">
                    <div className="d-flex align-items-center">
                        <Youtube className="me-2" /> Thêm video từ Youtube
                    </div>
                    <Input placeholder="Nhập url" className="mt-2" value={youtubeLink} onChange={(e) => setYoutubeLink(e.target.value)} />
                </div>
            </Card>
            <Card className="mt-3 p-4">
                <h5>Thông tin liên hệ</h5>
                <div className="mt-2">
                    <h6>
                        Tên liên hệ
                        <RequiredMark />
                    </h6>
                    <Input
                        fullWidth
                        value={contactInfo.name}
                        placeholder="Nhập tên"
                        onChange={(e) => handleChangeContactInfo(e.target.value, "name")}
                    />
                </div>
                <div className="mt-4">
                    <h6>
                        Số điện thoại
                        <RequiredMark />
                    </h6>
                    <Input
                        fullWidth
                        value={contactInfo.phoneNumber}
                        placeholder="Nhập số điện thoại"
                        onChange={(e) => handleChangeContactInfo(e.target.value, "phoneNumber")}
                    />
                </div>
                <div className="mt-4">
                    <h6>
                        Địa chỉ
                        <RequiredMark />
                    </h6>
                    <Input
                        fullWidth
                        value={contactInfo.address}
                        placeholder="Nhập địa chỉ"
                        onChange={(e) => handleChangeContactInfo(e.target.value, "address")}
                    />
                </div>
                <div className="mt-4">
                    <h6>
                        Email
                        <RequiredMark />
                    </h6>
                    <Input
                        fullWidth
                        value={contactInfo.email}
                        placeholder="Nhập email"
                        onChange={(e) => handleChangeContactInfo(e.target.value, "email")}
                    />
                </div>
            </Card>
            <Card className="mt-3 p-4">
                <h5>Cấu hình tin đăng</h5>
                <h6>Chọn loại tin đăng</h6>
                <div className="d-flex post-plan__container mt-2">
                    {postTypePlan.map((plan, index) => (
                        <div
                            style={{ flex: "1" }}
                            className={`post-plan__item text-center cursor-pointer p-2 ${postPlan === index ? "post-plan__item--selected" : ""}`}
                            key={index}
                            onClick={() => handleClickPostPlan(index)}
                        >
                            <div className={`mt-2 plan__tag plan__tag--${index}`}>X{plan.performance} hiệu quả</div>
                            <h6 className="mb-4 mt-3">{plan.title}</h6>
                            <Button color="info" outline={postPlan !== plan.id}>
                                {postPlan !== plan.id ? "Chọn" : "Đã chọn"}
                            </Button>
                            <hr />
                            <Fonts />
                            <div>
                                Tiêu đề chữ {plan.id > 1 ? "hoa" : "thường"}{" "}
                                <span style={{ color: plan.titleColor.color }}>{plan.titleColor.label}</span>
                            </div>
                            <hr />
                            <List />
                            <div style={{ minHeight: "52px" }} className="mt-3">
                                {plan.position}
                            </div>
                            <hr />
                            <div className="mt-3">{plan.postDays}</div>
                            <hr />
                            <div className="mt-3 pb-3">
                                Từ{" "}
                                <b>
                                    {formatCurrency(plan.price)}đ <br />
                                </b>
                                ngày
                            </div>
                        </div>
                    ))}
                </div>

                <div className="d-flex mt-3">
                    <Input
                        className="me-1"
                        id="highlight-post"
                        type="checkbox"
                        value={highlightPost}
                        onChange={(e) => setHighlightPost(e.target.checked)}
                    />
                    <Label for="highlight-post" id="highlight-post__label">
                        Làm nổi bật tin đăng
                        <QuestionCircleFill />
                    </Label>
                    <Tooltip target="highlight-post__label" isOpen={tooltipOpen.highlightPost} toggle={() => toggle("highlightPost")}>
                        • Gắn nhãn NỔI BẬT có màu theo loại tin
                        <br />
                        • Hiển thị 3 ảnh đại diện ở trang danh sách
                        <br />• Nút bấm Hiện số điện thoại
                    </Tooltip>
                </div>
                <hr />
                <Row>
                    <Col md={4}>
                        <div className="mt-2">
                            <h6>
                                Số ngày đăng
                                <RequiredMark />
                            </h6>
                            <Input type="number" value={postDays} onChange={(e) => setPostDays(e.target.value)} placeholder="Nhập số ngày đăng" />
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className="mt-2">
                            <h6>
                                Ngày bắt đầu
                                <RequiredMark />
                            </h6>
                            <Input type="date" value={postStartDate} onChange={(e) => setPostStartDate(e.target.value)} />
                            <div>
                                Kết thúc ngày{" "}
                                {moment(new Date(postStartDate).setDate(new Date(postStartDate).getDate() + postDays)).format("DD/MM/YYYY")}
                            </div>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className="mt-2">
                            <h6>
                                Hẹn giờ đăng tin
                                <RequiredMark />
                            </h6>
                            <Input disabled type="time" value={postStartTime} onChange={(e) => setPostStartTime(e.target.value)} />
                        </div>
                    </Col>
                </Row>
            </Card>
            <Card className="mt-3 p-4">
                <h5>Tiện ích</h5>
                <div className="mt-3 d-flex justify-content-between">
                    <div className="d-flex align-items-start">
                        <Button disabled className="me-3" color="danger">
                            <ArrowClockwise />
                        </Button>
                        <div>
                            <h6>
                                <Input
                                    className="me-2"
                                    color="danger"
                                    type="switch"
                                    value={autoRePost}
                                    onChange={(e) => setAutoRePost(e.target.value)}
                                />
                                Tự động đăng lại{" "}
                            </h6>
                            <div id="auto_repost">
                                Tin sẽ được đăng lại ngay khi tin vừa hết hạn. Mỗi lần đăng lại, hệ thống chỉ trừ tiền của lần đăng lại đó.
                                <QuestionCircleFill />
                            </div>
                            <Tooltip isOpen={tooltipOpen.rePost} target="auto_repost" toggle={() => toggle("rePost")}>
                                Tin sẽ được đăng lại ngay khi tin vừa hết hạn. <br />• Đến thời điểm đăng lại, hệ thống mới thực hiện trừ tiền.
                                <br />
                                • Mỗi lần tin được đăng lại, hệ thống chỉ trừ tiền của lần đăng lại đó.
                                <br />• Trước đó, quý khách có thể hủy chế độ tự động, và không phát sinh chi phí gì thêm.
                            </Tooltip>
                        </div>
                    </div>
                    <div></div>
                </div>
            </Card>
            <Card className="mt-3 p-4">
                <h5>Thanh toán</h5>
                <div className="mt-2">
                    <div className="d-flex justify-content-between mt-2">
                        <div>Loại tin</div>
                        <h6>{postTypePlan[postPlan].title}</h6>
                    </div>
                    <div className="d-flex justify-content-between mt-2">
                        <div>Đơn giá / ngày</div>
                        <h6>{formatCurrency(postTypePlan[postPlan].price)}đ</h6>
                    </div>
                    <div className="d-flex justify-content-between mt-2">
                        <div>Thời gian đăng tin</div>
                        <h6>{postDays} ngày</h6>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between mt-2">
                        <div>Tổng tiền</div>
                        <h3>{formatCurrency(totalPrice)} đ</h3>
                    </div>
                </div>
            </Card>
            <Card className="mt-3 p-4">
                <div className="d-flex justify-content-between align-items-center">
                    <Button outline>Xem trước giao diện</Button>
                    <div className="d-flex align-items-center">
                        <div className="me-2">
                            <div>Tổng tiền</div>
                            <div className="d-flex align-items-start">
                                <b>{formatCurrency(totalPrice)} đ</b>
                            </div>
                        </div>
                        <Button color="danger" type="submit" onClick={handleClickSubmit}>
                            Thanh toán và đăng tin <ChevronRight />
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default CreateNewPost;
