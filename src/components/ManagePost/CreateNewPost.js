import { useEffect, useState } from "react";
import {
    ArrowClockwise,
    ChevronRight,
    CloudArrowUp,
    InfoCircle, QuestionCircleFill,
    X,
    Youtube
} from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Badge, Button, Card, Col, Input, Label, Progress, Row, Tooltip } from "reactstrap";
import Swal from "sweetalert2";
import { sellTypes, sellUnits } from "../../constants/menu";
import useFormInput from "../../hooks/useFormInput";
import { postService, utilitiesService } from "../../services";
import { settingsDispatch } from "../../store/slices/settingsSlice";
import { checkArrayHasItem, formatCurrency, getAddressName, msgPendingFeature } from "../../utils";
import { uploadImage } from "../core/firebase";
import Select from "../core/Select";
import SelectAddress from "../core/SelectAddress";
import PostTypeList from "../Post/PostTypeList";
import QuantityInfo from "./QuantityInfo";

function CreateNewPost(props) {

    const location = useLocation();
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const dataEditPost = location?.state?.dataEditPost || {};

    useEffect(() => {

        const postId = searchParams.get('postId');
        postId &&
        postService.findById(postId)
            .then(res => res.data)
            .then(data => {
                console.log(data);
                setId(data.id);
                typeOfRealEstate.setvalue(data.typeOfRealEstate);
                setAddress({
                    id: data.address.id,
                    city: data.address.provinceId,
                    district: data.address.districtId,
                    ward: data.address.wardId,
                    number: data.address.addressDetail
                });
                title.setvalue(data.title);
                content.setvalue(data.content);
                areaSize.setvalue(data.area);
                setPrice({
                    value: data.price,
                    unit: data.unit
                });
                setQuantityInfo({
                    numberOfBedroom: data.numberOfBedroom,
                    numberOfBathroom: data.numberOfBathroom,
                    numberOfFloor: data.numberOfFloor
                });
                setUtilitiesIdList(data.utilitiesList.map(u => u.id));
                setContactInformation(data.contactInformation);
                setImageUrls(data.images.map(image => image.link));
                setPostPlan(data.postType);
            })
            .catch(err => {
                dispatch(
                    settingsDispatch.actSetToastMessage({
                        open: true,
                        error: true,
                        content: err.message
                    })
                )
            })

    }, [searchParams])

    // thong tin co ban
    const [id, setId] = useState(null);
    const typeOfRealEstate = useFormInput(sellTypes[0].value);
    const [address, setAddress] = useState(
        dataEditPost.address || {
            city: "",
            district: "",
            ward: "",
            number: "",
        }
    );

    // thong tin bai dang
    const title = useFormInput(dataEditPost.title || '');
    const content = useFormInput(dataEditPost.description || '');

    // thong tin bat dong san
    const areaSize = useFormInput(dataEditPost.areaSize || "");
    const [price, setPrice] = useState(dataEditPost.price || { value: "", unit: sellUnits[0].value });
    const [quantityInfo, setQuantityInfo] = useState(
        dataEditPost.quantityInfo ||  
    { 
        numberOfBedroom: 0, 
        numberOfBathroom: 0, 
        numberOfFloor: 0 
    });
    const youtubeLink = useFormInput('');
    const [utilityList, setUtilityList] = useState([]);
    const [utilitiesIdList, setUtilitiesIdList] = useState([]);

    // Thong tin lien he
    const [contactInformation, setContactInformation] = useState(dataEditPost.contactInfo || {
        fullName: "",
        phoneNumber1: "",
        address: "",
        email: "",
    });

    // file upload
    const [fileUpload, setFileUpload] = useState([]);
    const [imageUrls, setImageUrls] = useState(dataEditPost.imageUrls || []);
    const [loadingUploadImage, setLoadingUploadImage] = useState({
        status: false,
        value: 0,
    });

    // Post config
    const [highlightPost, setHighlightPost] = useState(false);
    const [autoRePost, setAutoRePost] = useState(false);
    const [postPlan, setPostPlan] = useState({});

    const [tooltipOpen, setTooltipOpen] = useState({
        highlightPost: false,
        rePost: false,
    });

    const handleChangeQuantityInfo = (newValue, type) => {
        setQuantityInfo({
            ...quantityInfo,
            [type]: newValue
        });
    }

    const handleClickUtility = (item) => {
        let newValue = [];
        const existed = checkArrayHasItem(item.id, utilitiesIdList);
        if (existed) {
            newValue = utilitiesIdList.filter((util) => util !== item.id);
        } else {
            newValue = [...utilitiesIdList, item.id];
        }
        setUtilitiesIdList(newValue);
    };
    
    const handleChangeContactInfo = (value, field) => {
        setContactInformation({...contactInformation, [field]: value });
    };

    const handleUploadFiles = async (files) => {
        setLoadingUploadImage({ status: true, value: 10 });
        const arrayImage = Object.values(files);
        const result = await Promise.all(arrayImage.map((item) => uploadImage(item)));
        setFileUpload(files);
        if(result.length > 16) {
            Swal.fire('', 'Tối đa 16 ảnh!')
        } else {
            setImageUrls(result);
        }
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
                        <img style={{ height: "100px", weight: "100%" }} className='mw-100' alt="upload" src={item} />
                    </div>
                ))}
                <div className="cursor-pointer" onClick={handleClickCancelFile}>
                    Huỷ
                    <X size="28" />
                </div>
            </div>
        );
    };

    const handleClickSubmit = async (e) => {
        youtubeLink.value && imageUrls.push(youtubeLink.value);

        const post = {
            id: id,
            typeOfRealEstate: typeOfRealEstate.value,
            title: title.value,
            content: content.value,
            areaSize: areaSize.value,
            price: price.value,
            unit: price.unit,
            utilitiesIdList,
            imageUrls,
            youtubeLink,
            contactInformation,
            address: {
                id: address.id,
                wardId: address.ward,
                provinceId: address.city,
                districtId: address.district,
                addressDetail: address.number,
                ...(await getAddressName(address))
            },
            ...quantityInfo,
            postTypeId: postPlan.id,
        };
        try {
            if (id) {
                await postService.updatePost(id, post);
            } else {
                await postService.createPost(post);
            }
            dispatch(
                settingsDispatch.actSetToastMessage({
                    open: true,
                    error: false,
                    content: `${id ? 'Cập nhật' : 'Thêm mới'} thành công`,
                })
            );
            navigate('/manager-post/my-post');
        } catch(err) {
            dispatch(
                settingsDispatch.actSetToastMessage({
                    open: true,
                    error: true,
                    content: err.message,
                })
            );
        }
    }

    const toggle = (type) => setTooltipOpen({ ...tooltipOpen, [type]: !tooltipOpen[type] });
    
    useEffect(() => {
        loadUtilities();
    }, []);

    const loadUtilities = async () => {
        const result = await utilitiesService.findAll();
        setUtilityList(result.data);
    }

    return (
        <div className="page-container-md">
            <Card className="mt-3 p-4">
                <h5>Thông tin cơ bản</h5>
                <div className="mt-2">
                    <div className="mt-2">
                        <h6 className="required">
                            Loại phòng
                        </h6>
                        <Select 
                            label="VD: Nhà riêng" 
                            options={sellTypes} 
                            {...typeOfRealEstate}
                        />
                    </div>
                    <SelectAddress address={address} setAddress={setAddress} />
                </div>
            </Card>
            <Card className="mt-3 p-4">
                <h5>Thông tin bài viết</h5>
                <div className="mt-2">
                    <h6 className="required">
                        Tiêu đề
                    </h6>
                    <Input
                        fullwidth="true"
                        placeholder="VD: Bán nhà riêng 50m2 chính chủ tại Cầu Giấy"
                        {...title}
                    />
                    <Label className="opacity-75 mt-1">Tối thiểu 30 ký tự, tối đa 99 ký tự</Label>
                </div>
                <div className="mt-2">
                    <h6 className="required">
                        Mô tả
                    </h6>
                    <Input
                        type="textarea"
                        fullwidth="true"
                        style={{ minHeight: "200px" }}
                        placeholder="Nhập mô tả chung về bất động sản của bạn. Ví dụ: Khu nhà có vị trí thuận lợi, gần công viên, gần trường học ... "
                        {...content}
                    />
                    <Label className="opacity-75 mt-1">Tối thiểu 30 ký tự, tối đa 3.000 ký tự</Label>
                </div>
            </Card>
            <Card className="mt-3 p-4">
                <h5>Thông tin bất động sản</h5>
                <div className="mt-2">
                    <h6 className="required">
                        Diện tích
                    </h6>
                    <Input 
                        fullwidth="true" 
                        placeholder="Nhập diện tích, VD 80"
                        type="number"
                        {...areaSize}
                    />
                </div>
                <div className="mt-4">
                    <Row>
                        <Col md={9}>
                            <h6 className="required">
                                Mức giá
                            </h6>
                            <Input
                                fullwidth="true"
                                value={price.value}
                                type="number"
                                placeholder="Nhập giá, VD 12000000000"
                                onChange={(e) => setPrice({ ...price, value: e.target.value })}
                            />
                        </Col>
                        <Col md={3}>
                            <h6 className="required">
                                Đơn vị
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
                    <h6 className="required">
                        Tiện ích
                    </h6>
                    <div className="d-flex flex-wrap">
                        {utilityList.map((item) => (
                            <Badge
                                className={`utility__item mx-2 p-2 cursor-pointer ${
                                    checkArrayHasItem(item.id, utilitiesIdList) ? "utility__item--selected" : ""
                                }`}
                                color={checkArrayHasItem(item.id, utilitiesIdList) ? "danger" : ""}
                                key={item.id}
                                onClick={() => handleClickUtility(item)}
                            >
                                {item.name}
                            </Badge>
                        ))}
                    </div>
                </div>
                <hr />
                <div className="mt-4">
                    <QuantityInfo 
                        label="Số phòng ngủ"
                        value={quantityInfo.numberOfBedroom}
                        setValue={(newValue) => handleChangeQuantityInfo(newValue, "numberOfBedroom")}
                    />
                    <QuantityInfo 
                        label="Số phòng tắm, vệ sinh" 
                        value={quantityInfo.numberOfBathroom}
                        setValue={(newValue) => handleChangeQuantityInfo(newValue, "numberOfBathroom")} 
                    />
                    <QuantityInfo 
                        label="Số tầng"
                        value={quantityInfo.numberOfFloor}
                        setValue={(newValue) => handleChangeQuantityInfo(newValue, "numberOfFloor")} 
                    />
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
                    <li>Hãy dùng ảnh thật, không trùng, không chèn số điện thoại</li>
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
                    <Input placeholder="Nhập url" className="mt-2" {...youtubeLink} />
                </div>
            </Card>
            <Card className="mt-3 p-4">
                <h5>Thông tin liên hệ</h5>
                <div className="mt-2">
                    <h6 className="required">
                        Tên liên hệ
                    </h6>
                    <Input
                        fullwidth="true"
                        value={contactInformation.fullName}
                        placeholder="Nhập tên"
                        onChange={(e) => handleChangeContactInfo(e.target.value, "fullName")}
                    />
                </div>
                <div className="mt-4">
                    <h6 className="required">
                        Số điện thoại
                    </h6>
                    <Input
                        fullwidth="true"
                        value={contactInformation.phoneNumber1}
                        placeholder="Nhập số điện thoại"
                        onChange={(e) => handleChangeContactInfo(e.target.value, "phoneNumber1")}
                    />
                </div>
                <div className="mt-4">
                    <h6 className="required">
                        Địa chỉ
                    </h6>
                    <Input
                        fullwidth="true"
                        value={contactInformation.address}
                        placeholder="Nhập địa chỉ"
                        onChange={(e) => handleChangeContactInfo(e.target.value, "address")}
                    />
                </div>
                <div className="mt-4">
                    <h6 className="required">
                        Email
                    </h6>
                    <Input
                        fullwidth="true"
                        value={contactInformation.email}
                        placeholder="Nhập email"
                        onChange={(e) => handleChangeContactInfo(e.target.value, "email")}
                    />
                </div>
            </Card>
            <Card className="mt-3 p-4">
                <h5>Cấu hình tin đăng</h5>
                <h6>Chọn loại tin đăng</h6>
                <PostTypeList 
                    setPostPlan={setPostPlan}
                    postPlan={postPlan}
                />
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
                        <h6>{postPlan.type}</h6>
                    </div>
                    <div className="d-flex justify-content-between mt-2">
                        <div>Đơn giá</div>
                        <h6>{formatCurrency(postPlan.price)}đ</h6>
                    </div>
                    <div className="d-flex justify-content-between mt-2">
                        <div>Thời gian đăng tin</div>
                        <h6>{postPlan.duration} ngày</h6>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between mt-2">
                        <div>Tổng tiền</div>
                        <h6>{formatCurrency(postPlan.price)}đ</h6>
                    </div>
                </div>
            </Card>
            <Card className="mt-3 p-4">
                <div className="d-flex justify-content-between align-items-center">
                    <Button outline onClick={msgPendingFeature}>Xem trước giao diện</Button>
                    <div className="d-flex align-items-center">
                        <div className="me-2">
                            <div>Tổng tiền</div>
                            <div className="d-flex align-items-start">
                                <h6>{formatCurrency(postPlan.price)}đ</h6>
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