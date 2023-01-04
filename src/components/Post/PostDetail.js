import React, { useEffect, useState } from "react";
import { Dot, ExclamationTriangle, Facebook, Heart, HeartFill, InputCursor, Share } from "react-bootstrap-icons";
import ReactImageGallery from "react-image-gallery";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Col, Input, Label, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import { reportReasonList } from "../../constants";
import useCachePost from "../../hooks/useCachePost";
import { postService } from "../../services";
import { settingsDispatch } from "../../store/slices/settingsSlice";
import { formatCurrency } from "../../utils";
import NewsCard from "../core/NewsCard";
import RequestModal from "../core/RequestModal";
import ToolTips from "../core/ToolTips";
import useWindowHeight from "../core/useWindowHeight";

const keySearch = [
    "Trọ Bách Kinh Xây",
    "Cho thuê nhà nguyên căn",
    "Cho thuê chung cư",
    "Trọ khu vực Cầu Giáy",
    "Trọ 2-3 triệu",
    "Trọ Hà Đông",
];

function Post(props) {

    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector(store => store.tokenSlice.user);
    const [post, setPost] = useState(null);
    const [topPost, setTopPost] = useState([]);
    const [slideItems, setSlideItems] = useState([]);
    const {posts, addPost} = useCachePost();

    const handleGetPost = async () => {

        try {
            const result = await postService.findById(id);
            setPost(result.data);
            addPost(result.data);
            setSlideItems(result.data.images.map(({link, id}, index) => ({
                original: link,
                thumbnail: link,
                altText: `Image ${index}`,
                caption: `Image ${index}`,
                key: id
            })));
        } catch(err) {
            dispatch(
                settingsDispatch.actSetToastMessage({
                    open: true,
                    error: true,
                    content: err.message,
                })
            )
        }
    }

    const handleGetTopPost = async () => {
        const result = await postService.topPost(10);
        setTopPost(result.data.content);
    }

    useEffect(() => {
        handleGetPost();
        handleGetTopPost();
    }, [id])

    
    const [openRequestModal, setOpenRequestModal] = useState(false);

    const scrollHeight = useWindowHeight();

    const [openModalReport, setOpenModalReport] = useState(false);
    const [reportContent, setReportContent] = useState({
        reason: [],
        reason_text: "",
    });
    const [reportInfo, setReportInfo] = useState({
        name: "",
        phone: "",
        email: "",
    });

    const handleChangeReason = (type, value) => {
        if (type === "reason_text") {
            setReportContent({
                ...reportContent,
                reason_text: value,
            });
        } else {
            let newValue = reportContent.reason;
            if (reportContent.reason.indexOf(value) !== -1) {
                newValue = reportContent.reason.filter((item) => item !== value);
            } else {
                newValue.push(value);
            }
            setReportContent({
                ...reportContent,
                reason: newValue,
            });
        }
    };

    const handleChangeReportInfo = (type, value) => {
        setReportInfo({
            ...reportInfo,
            [type]: value,
        });
    };

    const handleSubmitReport = async () => {
        setOpenModalReport(false);
    };

    const toggleModalReport = () => {
        setOpenModalReport(!openModalReport);
    };

    const handleLikeOrUnlike = async () => {
        if (!token) {
            dispatch(
                settingsDispatch.actSetToastMessage({
                    open: true,
                    error: true,
                    content: 'Bạn cần đăng nhập để thực hiện chức năng này.'
                })
            )
            navigate('/login');
            return;
        }

        try {
            let message = 'Hủy yêu thích thành công';
            if (post.liked) {
                // call api like post
                await postService.unLike(post.id);
            } else {
                // cal api unlike this post
                await postService.like(post.id);
                message = 'Yêu thích bài đăng thành công';
            }
            handleGetPost();
            dispatch(
                settingsDispatch.actSetToastMessage({
                    open: true,
                    error: false,
                    content: message
                })
            )
        } catch(err) {
            dispatch(
                settingsDispatch.actSetToastMessage({
                    open: true,
                    error: true,
                    content: err.message
                })
            )
        }
    }

    const copyToClipboard = (e) => {
        const copyText = e.target.innerText;
        navigator.clipboard.writeText(copyText);
        dispatch(
            settingsDispatch.actSetToastMessage({
                open: true,
                content: "Copied!",
                error: false,
            })
        );
    }
    return (
        <>
        { 
            post && 
            <div className="posts">
            <RequestModal open={openRequestModal} onToggle={() => setOpenRequestModal(!openRequestModal)} />
            {/* <SearchBar /> */}
            <div className={`action-bar py-2 ${scrollHeight > 400 ? "action-bar--active" : ""}`}>
                <div className="page-container-xl">
                    <div className="d-flex justify-content-between">
                        <div>
                            <div className="d-flex">
                                <span>
                                    <h5>{ formatCurrency(post.price) }</h5>
                                </span>
                                <span className="mx-1">
                                    <Dot />
                                </span>
                                <span>
                                    <h5>{ post.area } m²</h5>
                                </span>
                                <span className="mx-1">
                                    <Dot />
                                </span>
                                <span>
                                    <h5>{ post.numberOfBedroom } PN</h5>
                                </span>
                            </div>
                            <div>{ post.address?.addressDetail }</div>
                        </div>
                        <div className="d-flex align-items-center">
                            <img
                                className="avatar me-1"
                                src="https://file4.batdongsan.com.vn/resize/200x200/2021/05/11/20210511095658-0e22.jpg"
                                alt="avatar"
                            />
                            <div className="me-1">
                                <h5>{ post.contactInformation.fullName }</h5>
                            </div>
                            <Button outline className="me-1" onClick={() => setOpenRequestModal(true)}>
                                Yêu cầu liên hệ lại
                            </Button>
                            <Button color="info">{ post.contactInformation.phoneNumber1 }</Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="page-container-xl mt-3">
                <Row>
                    <Col md={9}>
                        <ReactImageGallery items={slideItems} showPlayButton={false} autoPlay={true} />
                        <h5 className="text-uppercase">{ post.title }</h5>
                        <hr />
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-start">
                                <div className="py-2 me-4">
                                    <div>Mức giá</div>
                                    <h5>{ formatCurrency(post.price) }</h5>
                                    <div>~{ formatCurrency(post.price / post.area) }/m²</div>
                                </div>
                                <div className="py-2 mx-4">
                                    <div>Diện tích</div>
                                    <h5>{ post.area } m²</h5>
                                </div>
                                <div className="py-2 mx-4">
                                    <div>Phòng ngủ</div>
                                    <h5>{ post.numberOfBedroom } PN</h5>
                                </div>
                            </div>
                            <div className="d-flex align-items-center">
                                <Share id="post__share-btn" className="mx-2 cursor-pointer" size={26} />
                                <ToolTips target="post__share-btn">Chia sẻ tin</ToolTips>
                                <ExclamationTriangle
                                    id="post__report-btn"
                                    onClick={() => setOpenModalReport(true)}
                                    className="mx-2 cursor-pointer"
                                    size={26}
                                />
                                <ToolTips target="post__report-btn">Báo cáo tin</ToolTips>
                                <div id="post__like-btn" onClick={handleLikeOrUnlike}>
                                    {post.liked 
                                    ? <HeartFill className="mx-2 cursor-pointer" size={26} />
                                    : <Heart className="mx-2 cursor-pointer" size={26} />}
                                </div>
                                <ToolTips target="post__like-btn">Thêm vào tin yêu thích</ToolTips>
                                <Modal isOpen={openModalReport} toggle={toggleModalReport}>
                                    <div className="p-3">
                                        <ModalHeader toggle={toggleModalReport}>Báo cáo tin rao có thông tin không đúng</ModalHeader>
                                        <ModalBody>
                                            {reportReasonList.map((item, index) => (
                                                <div className="my-2" key={index}>
                                                    <Input
                                                        type="checkbox"
                                                        id={`report-reason-${item.value}`}
                                                        className="me-2"
                                                        checked={reportContent.reason.indexOf(item.value) !== -1}
                                                        onChange={(e) => handleChangeReason("reason", item.value)}
                                                    />
                                                    <Label for={`report-reason-${item.value}`}>{item.label}</Label>
                                                </div>
                                            ))}
                                            <div className="mt-3">Phản hồi khác</div>
                                            <Input
                                                type="textarea"
                                                className="mt-1"
                                                placeholder="Nhập nội dung"
                                                value={reportContent.reason_text}
                                                onChange={(e) => handleChangeReason("reason_text", e.target.value)}
                                            />
                                            <h6 className="mt-3">Thông tin của bạn</h6>
                                            <Input
                                                className="mt-3"
                                                value={reportInfo.name}
                                                placeholder="Họ và tên"
                                                onChange={(e) => handleChangeReportInfo("name", e.target.value)}
                                            />
                                            <Input
                                                className="mt-3"
                                                value={reportInfo.phone}
                                                placeholder="Số điện thoại"
                                                onChange={(e) => handleChangeReportInfo("phone", e.target.value)}
                                            />
                                            <Input
                                                className="mt-3"
                                                value={reportInfo.email}
                                                placeholder="Email"
                                                onChange={(e) => handleChangeReportInfo("email", e.target.value)}
                                            />
                                            <Button color="danger" className="mt-5 w-100" onClick={handleSubmitReport}>
                                                Gửi
                                            </Button>
                                        </ModalBody>
                                    </div>
                                </Modal>
                            </div>
                        </div>
                        <hr />
                        <h5 className="mt-4">Thông tin mô tả</h5>
                        <p className="mt-3">{ post.content }</p>
                        <div className="mt-5">
                            <h5>Đặc điểm bất động sản</h5>
                            <div>Loại tin đăng: Cho thuê căn hộ</div>
                            <Row>
                                <Col md={6}>
                                    <hr style={{ borderColor: '#bfbbbb' }} />
                                    <div className="d-flex align-items-center px-5">
                                        <InputCursor className="mb-2 me-2" size={20} />
                                        <h6 style={{ minWidth: "140px" }}>Diện tích</h6>
                                        <div className="mb-2 ms-5">{ post.area } m²</div>
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <hr style={{ borderColor: '#bfbbbb' }} />
                                    <div className="d-flex align-itThems-center px-5">
                                        <svg style={{width: 26}} className="mb-2 me-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M384 64c0-17.7 14.3-32 32-32H544c17.7 0 32 14.3 32 32s-14.3 32-32 32H448v96c0 17.7-14.3 32-32 32H320v96c0 17.7-14.3 32-32 32H192v96c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h96V320c0-17.7 14.3-32 32-32h96V192c0-17.7 14.3-32 32-32h96V64z"/></svg>
                                        <h6 style={{ minWidth: "140px" }}>Số tầng</h6>
                                        <div className="mb-2 ms-5">{ post.numberOfFloor} tầng</div>
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <hr style={{ borderColor: '#bfbbbb' }} />
                                    <div className="d-flex align-items-center px-5">
                                        <svg style={{width: 26}} className="mb-2 me-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M32 32c17.7 0 32 14.3 32 32V320H288V160c0-17.7 14.3-32 32-32H544c53 0 96 43 96 96V448c0 17.7-14.3 32-32 32s-32-14.3-32-32V416H352 320 64v32c0 17.7-14.3 32-32 32s-32-14.3-32-32V64C0 46.3 14.3 32 32 32zM176 288c-44.2 0-80-35.8-80-80s35.8-80 80-80s80 35.8 80 80s-35.8 80-80 80z"/></svg>
                                        <h6 style={{ minWidth: "140px" }}>Số phòng ngủ</h6>
                                        <div className="mb-2 ms-5">{ post.numberOfBedroom } phòng</div>
                                    </div>
                                    <hr style={{ borderColor: '#bfbbbb' }} />
                                </Col>
                                <Col md={6}>
                                    <hr style={{ borderColor: '#bfbbbb' }} />
                                    <div className="d-flex align-items-center px-5">
                                        <svg style={{width: 26}} className="mb-2 me-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M96 77.3c0-7.3 5.9-13.3 13.3-13.3c3.5 0 6.9 1.4 9.4 3.9l14.9 14.9C130 91.8 128 101.7 128 112c0 19.9 7.2 38 19.2 52c-5.3 9.2-4 21.1 3.8 29c9.4 9.4 24.6 9.4 33.9 0L289 89c9.4-9.4 9.4-24.6 0-33.9c-7.9-7.9-19.8-9.1-29-3.8C246 39.2 227.9 32 208 32c-10.3 0-20.2 2-29.2 5.5L163.9 22.6C149.4 8.1 129.7 0 109.3 0C66.6 0 32 34.6 32 77.3V256c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H96V77.3zM32 352v16c0 28.4 12.4 54 32 71.6V480c0 17.7 14.3 32 32 32s32-14.3 32-32V464H384v16c0 17.7 14.3 32 32 32s32-14.3 32-32V439.6c19.6-17.6 32-43.1 32-71.6V352H32z"/></svg>
                                        <h6 style={{ minWidth: "140px" }}>Số toilet</h6>
                                        <div className="mb-2 ms-5">{ post.numberOfBathroom } phòng</div>
                                    </div>
                                    <hr style={{ borderColor: '#bfbbbb' }} />
                                </Col>
                            </Row>
                            <div>
                                <h5 className="mt-3">Xem trên bản đồ</h5>
                                <iframe
                                    width="600"
                                    title="map"
                                    height="450"
                                    style={{ border: 0 }}
                                    loading="lazy"
                                    allowFullScreen
                                    referrerPolicy="no-referrer-when-downgrade"
                                    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCH53Cs6qjDqx5QHSwkj1_LZkREJVKjhIE&q=Space+Needle,Seattle+WA"
                                ></iframe>
                            </div>
                            <div>
                                <h5 className="mt-3">Tìm kiếm theo từ khóa</h5>
                                <div className="d-flex flex-wrap">
                                    {keySearch.map((item, index) => (
                                        <div className="key-search__item p-1 px-3 m-1" key={index}>
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="mt-5">
                                <hr />
                                <div className="d-flex">
                                    <div className="me-5">
                                        <div>Ngày đăng</div>
                                        <h6>{ post.createdDate }</h6>
                                    </div>
                                    <div className="me-5">
                                        <div>Ngày hết hạn</div>
                                        <h6>{ post.expireDate }</h6>
                                    </div>
                                    <div className="me-5">
                                        <div>Loại tin</div>
                                        <h6>{ post.postType?.type }</h6>
                                    </div>
                                    <div className="me-5">
                                        <div>Mã tin</div>
                                        <h6>{ post.code }</h6>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        </div>

                        <NewsCard title="Bất động sản dành cho bạn" data={topPost} wrapItem={true} />
                        { token && <NewsCard title="Tin đăng đã xem" data={posts} wrapItem={true} />}
                        {/* <hr /> */}
                        {/* <div className="my-4">
                            Quý vị đang xem nội dung tin rao "Bán hàng hiếm góc 2 MT Nguyễn Đình Chiểu, P Đa Kao Q1 DT 8x24m CN 189m2 trệt 1L. Chỉ 110
                            tỷ tl" - Mã tin 34845360. Mọi thông tin, nội dung liên quan tới tin rao này là do người đăng tin đăng tải và chịu trách
                            nhiệm. Batdongsan.com.vn luôn cố gắng để các thông tin được hữu ích nhất cho quý vị tuy nhiên Batdongsan.com.vn không đảm
                            bảo và không chịu trách nhiệm về bất kỳ thông tin, nội dung nào liên quan tới tin rao này. Trường hợp phát hiện nội dung
                            tin đăng không chính xác, Quý vị hãy thông báo và cung cấp thông tin cho Ban quản trị Batdongsan.com.vn theo Hotline
                            19001881 để được hỗ trợ nhanh và kịp thời nhất.
                        </div> */}
                    </Col>
                    <Col md={3}>
                        <div className="user-info p-2">
                            <div className="mt-4 d-flex justify-content-center">
                                <img
                                    style={{ width: "100px", height: "100px", borderRadius: "50%" }}
                                    alt="avatar"
                                    src="https://file4.batdongsan.com.vn/resize/200x200/2022/11/15/20221115115041-c21a_wm.jpg"
                                />
                            </div>
                            <div className="mt-3 text-center">
                                <div>Được đăng bởi</div>
                                <h6>{ post.host.fullName }</h6>
                                <div>Xem thêm 1 tin khác</div>
                                <Button className="w-100 mt-2" color="info" onClick={(e) => copyToClipboard(e)}>
                                    { post.host.phoneNumber }
                                </Button>
                                <Button className="w-100 mt-2" outline>
                                    <Facebook /> Chat qua Facebook
                                </Button>
                                <Button className="w-100 mt-2" outline>
                                    Gửi email
                                </Button>
                                <Button className="w-100 mt-2" outline onClick={() => setOpenRequestModal(true)}>
                                    Yêu cầu liên hệ lại
                                </Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
        }
        </>
    )
}

export default Post;
