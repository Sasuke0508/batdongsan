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
    Play,
    PlayCircle,
    Plus,
    QuestionCircleFill,
    X,
    Youtube,
} from "react-bootstrap-icons";
import { Navigate, Route, Routes } from "react-router-dom";
import { Badge, Button, ButtonGroup, Card, Col, Input, Label, Modal, ModalBody, ModalHeader, Row, Tooltip } from "reactstrap";
import { postTypePlan, sellTypes, sellUnits, utilityList as initUtilityList } from "../../constants/menu";
import { checkArrayHasItem, convertInputTextToObject, formatCurrency } from "../../utils";
import Select from "../core/Select";
import CreateNewPost from "./CreateNewPost";
import ListPost from "./ListPost";
import SideMenu from "./SideMenu";
import UserInfo from "./UserInfo";

function CreatePost(props) {
    // thong tin co ban
    const [isSell, setIsSell] = useState(true);
    const handleClickSaleType = (status) => {
        setIsSell(status);
    };

    const [sellType, setSellType] = useState(sellTypes[0].value);
    const handleChangeSellType = (event) => {
        setSellType(event.target.value);
    };

    const [address, setAddress] = useState("");

    // thong tin bai dang

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    // thong tin bat dong san

    const [areaSize, setAreaSize] = useState("");
    const [price, setPrice] = useState({ value: "", unit: sellUnits[0].value });
    const [quantityInfo, setQuantityInfo] = useState({ bedRoom: 0, bathRoom: 0, floor: 0 });
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
    const [entranceSize, setEntranceSize] = useState("");
    const [frontSize, setFrontSize] = useState("");
    const [youtubeLink, setYoutubeLink] = useState("");

    // Thong tin lien he
    const [contactInfo, setContactInfo] = useState({
        name: "",
        phoneNumber: "",
        address: "",
        email: "",
    });

    const handleChangeContactInfo = (value, field) => {
        const newValue = { ...contactInfo, [field]: value };
        setContactInfo(newValue);
    };

    // file upload
    const [fileUpload, setFileUpload] = useState([]);

    const selectedFile = useMemo(() => {
        const array = Object.keys(fileUpload);
        return array.map((item) => URL.createObjectURL(fileUpload[item]));
    }, [fileUpload]);

    const handleClickCancelFile = () => {
        setFileUpload({});
    };
    const FileLabel = () => {
        return (
            <div className="d-flex flex-wrap align-items-center">
                {selectedFile.map((item, index) => (
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
    const [postStartDate, setPostStartDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
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
        <div className="manager-post">
            <Row className="w-100">
                <Col md={2} className="side-bar">
                    <div className="side-bar__container">
                        <UserInfo />
                        <SideMenu />
                    </div>
                </Col>
                <Col md={10}>
                    <Routes>
                        <Route path="/create-new-post" element={<CreateNewPost />} />
                        <Route path="/list-post" element={<ListPost />} />
                        <Route path="*" element={<Navigate to="create-new-post" />} />
                    </Routes>
                </Col>
            </Row>
        </div>
    );
}

export default CreatePost;
