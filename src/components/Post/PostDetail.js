import React, { useRef, useState } from "react";
import { Dot, ExclamationTriangle, Facebook, Heart, HeartFill, Share } from "react-bootstrap-icons";
import ReactImageGallery from "react-image-gallery";
import { useDispatch } from "react-redux";
import { Button, CarouselCaption, CarouselItem, Col, Input, Label, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import Swal from "sweetalert2";
import { recommendedData, reportReasonList } from "../../constants";
import { settingsDispatch } from "../../store/slices/settingsSlice";
import NewsCard from "../core/NewsCard";
import RequestModal from "../core/RequestModal";
import SearchBar from "../core/SearchBar";
import ToolTips from "../core/ToolTips";
import useWindowHeight from "../core/useWindowHeight";
import nha_cho_thue_1 from "../../assets/img/post/nha_cho_thue_1.jpg"
import nha_cho_thue_2 from "../../assets/img/post/nha_cho_thue_2.jpg"
import nha_cho_thue_3 from "../../assets/img/post/nha_cho_thue_3.jpg"
import nha_cho_thue_4 from "../../assets/img/post/nha_cho_thue_4.jpg"
import nha_cho_thue_5 from "../../assets/img/post/nha_cho_thue_5.jpg"

function Post(props) {
    const slideItems = [
        {
            original: nha_cho_thue_1,
            thumbnail: nha_cho_thue_1,
            altText: "Slide 1",
            caption: "Slide 1",
            key: 1,
        },
        {
            original: nha_cho_thue_2,
            thumbnail: nha_cho_thue_2,
            altText: "Slide 2",
            caption: "Slide 2",
            key: 2,
        },
        {
            original: nha_cho_thue_3,
            thumbnail: nha_cho_thue_3,
            altText: "Slide 3",
            caption: "Slide 3",
            key: 3,
        },
        {
            original: nha_cho_thue_4,
            thumbnail: nha_cho_thue_4,
            altText: "Slide 4",
            caption: "Slide 4",
            key: 3,
        },
        {
            original: nha_cho_thue_5,
            thumbnail: nha_cho_thue_5,
            altText: "Slide 5",
            caption: "Slide 5",
            key: 3,
        },
    ];
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === slideItems.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    };

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? slideItems.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    };

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    };

    const slides = slideItems.map((item) => {
        return (
            <CarouselItem onExiting={() => setAnimating(true)} onExited={() => setAnimating(false)} key={item.src}>
                <img src={item.src} alt={item.altText} />
                <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
            </CarouselItem>
        );
    });

    const keySearch = [
        "Bán chung cư Vinhomes Grand Park",
        "Bán chung cư Vinhomes Grand Park Quận 9",
        "Bán căn hộ Vinhomes Grand Park",
        "Bán căn hộ chung cư Vinhomes Grand Park",
        "Bán căn hộ Vinhomes Grand Park Quận 9",
        "Bán căn hộ chung cư Vinhomes Grand Park Quận 9",
    ];
    const [openRequestModal, setOpenRequestModal] = useState(false);

    const scrollHeight = useWindowHeight();

    //
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

    const numberPhoneRef = useRef();

    const dispatch = useDispatch();
    function copyToClipboard(e) {
        const copyText = e.target.innerText;
        navigator.clipboard.writeText(copyText);
        Swal.fire('', 'Đã sao chép số điện thoại!')
    }
    return (
        <div className="posts">
            <RequestModal open={openRequestModal} onToggle={() => setOpenRequestModal(!openRequestModal)} />
            <SearchBar />
            <div className={`action-bar py-2 ${scrollHeight > 400 ? "action-bar--active" : ""}`}>
                <div className="page-container-xl">
                    <div className="d-flex justify-content-between">
                        <div>
                            <div className="d-flex">
                                <span>
                                    <h5>6 triệu/tháng</h5>
                                </span>
                                <span className="mx-1">
                                    <Dot />
                                </span>
                                <span>
                                    <h5>47 m²</h5>
                                </span>
                                <span className="mx-1">
                                    <Dot />
                                </span>
                                <span>
                                    <h5>2 PN</h5>
                                </span>
                            </div>
                            <div>số 4 ngách 64 ngõ 105 Phố Doãn Kế Thiện, Phường Mai Dịch, Cầu Giấy, Hà Nội</div>
                        </div>
                        <div className="d-flex align-items-center">
                            <img
                                className="avatar me-1"
                                src="https://file4.batdongsan.com.vn/resize/200x200/2021/05/11/20210511095658-0e22.jpg"
                                alt="avatar"
                            />
                            <div className="me-1">
                                <h5>Su</h5>
                            </div>
                            <Button outline className="me-1" onClick={() => setOpenRequestModal(true)}>
                                Yêu cầu liên hệ lại
                            </Button>
                            <Button color="info" onClick={(e) => copyToClipboard(e)}>0832 025 *** · Hiện số</Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="page-container-xl mt-3">
                <Row>
                    <Col md={9}>
                        <ReactImageGallery items={slideItems} showPlayButton={false} autoPlay={true} />
                        <p className="mt-3">Cho thuê/Hà Nội/Cầu Giấy/Nhà trọ, phòng trọ tại phố Doãn Kế Thiện</p>
                        <h5>CHO THUÊ CĂN HỘ FULL NỘI THẤT 1K1N 35 - 45M2 PHỐ DOÃN KẾ THIỆN - CẦU GIẤY</h5>
                        <p className="mt-1">số 4 ngách 64 ngõ 105 Phố Doãn Kế Thiện, Phường Mai Dịch, Cầu Giấy, Hà Nội</p>
                        <hr />
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-start">
                                <div className="py-2 me-4">
                                    <div>Mức giá</div>
                                    <h5>6 triệu/tháng</h5>
                                    <div>60 triệu/năm</div>
                                </div>
                                <div className="py-2 mx-4">
                                    <div>Diện tích</div>
                                    <h5>47 m²</h5>
                                </div>
                                <div className="py-2 mx-4">
                                    <div>Phòng ngủ</div>
                                    <h5>2 PN</h5>
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
                                <div id="post__like-btn">
                                    {true ? 
                                    <Heart className="mx-2 cursor-pointer" size={26} /> :
                                    <HeartFill className="mx-2 cursor-pointer" size={26} />}
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
                        <p className="mt-3">
                        <p>1 - Cho thu&ecirc; c&#259;n h&#7897; full n&#7897;i th&#7845;t 1K1N ph&#7889; Do&atilde;n K&#7871; Thi&#7879;n, C&#7847;u Gi&#7845;y.</p>

<p>- T&ograve;a nh&agrave; 8 t&#7847;ng t&#7841;i ph&#7889; Do&atilde;n K&#7871; Thi&#7879;n m&#7899;i ho&agrave;n thi&#7879;n v&agrave;o &#7903; lu&ocirc;n. T&ograve;a nh&agrave; v&#7899;i c&aacute;c trang thi&#7871;t b&#7883; hi&#7879;n &#273;&#7841;i, &#273;&#7847;y &#273;&#7911; ti&#7879;n &iacute;ch, s&agrave;n g&#7895; v&#7899;i c&aacute;c c&#259;n h&#7897; mini chia 1 kh&aacute;ch v&agrave; 1 ng&#7911; DT 45m&sup2;. + Gi&aacute; t&#7915; 6.500.000&#273; - 7.000.000 &#273;/th&aacute;ng. + Ph&ograve;ng ng&#7911; + ph&ograve;ng kh&aacute;ch v&agrave; khu b&#7871;p ri&ecirc;ng bi&#7879;t. + Ph&ograve;ng ng&#7911; &#273;&#432;&#7907;c trang b&#7883; &#273;i&#7873;u h&ograve;a 2 chi&#7873;u, gi&#432;&#7901;ng, &#273;&#7879;m, t&#7911; qu&#7847;n &aacute;o, b&agrave;n l&agrave;m vi&#7879;c... + Ph&ograve;ng kh&aacute;ch c&#361;ng c&oacute; th&#7875; l&agrave;m ph&ograve;ng ng&#7911; n&#7871;u nh&agrave; &#272;&ocirc;ng ng&#432;&#7901;i. + Ph&ograve;ng b&#7871;p &#273;&#432;&#7907;c trang b&#7883; sofa b&agrave;n tr&agrave;, b&agrave;n b&#7871;p, b&#7871;p t&#7915;, t&#7911; b&#7871;p, t&#7911; l&#7841;nh, ch&#7853;u r&#7917;a b&aacute;t, h&uacute;t m&ugrave;i,... + Khu v&#7921;c nh&agrave; v&#7879; sinh &#273;&#432;&#7907;c l&#7855;p &#273;&#7847;y &#273;&#7911; thi&#7871;t b&#7883; hi&#7879;n &#273;&#7841;i nh&#432; ch&#7853;u r&#7917;a m&#7863;t, b&#7879;t Inax, v&ograve;i sen, b&igrave;nh n&oacute;ng l&#7841;nh,... - T&ograve;a nh&agrave; c&oacute; b&#7843;o v&#7879; 24/24, kh&oacute;a c&#7917;a v&acirc;n tay, &#273;&#7843;m b&#7843;o an ninh tuy&#7879;t &#273;&#7889;i, gi&#7901; gi&#7845;c ra v&agrave;o tho&#7843;i m&aacute;i. - Khu v&#7921;c ban c&ocirc;ng ph&#417;i &#273;&#7891; ri&ecirc;ng bi&#7879;t c&#7911;a t&#7915;ng ph&ograve;ng. * T&ograve;a nh&agrave; n&#7857;m &#7903; v&#7883; tr&iacute; trung t&acirc;m, giao th&ocirc;ng thu&#7853;n ti&#7879;n, r&#7845;t thu&#7853;n ti&#7879;n cho vi&#7879;c mua s&#7855;m, &#273;i ch&#7907;, g&#7847;n l&agrave;ng tr&#7867; SOS, g&#7847;n c&aacute;c trung t&acirc;m th&#432;&#417;ng m&#7841;i, g&#7847;n c&aacute;c tr&#432;&#7901;ng &#272;H nh&#432; Qu&#7889;c Gia, Ngo&#7841;i Ng&#7919;, g&#7847;n b&#7871;n xe M&#7929; &#272;&igrave;nh,...</p>

<p>&#272;&#7883;a ch&#7881;: S&#7889; 4 ng&aacute;ch 64 ng&otilde; 105 ho&#7863;c ng&otilde; 66 H&#7891; T&ugrave;ng M&#7853;u - P. Mai D&#7883;ch - C&#7847;u Gi&#7845;y. LH C H&#432;&#417;ng. 2 - T&ograve;a nh&agrave; 8 t&#7847;ng t&#7841;i ph&#7889; Do&atilde;n K&#7871; Thi&#7879;n m&#7899;i ho&agrave;n thi&#7879;n v&agrave;o &#7903; lu&ocirc;n. - C&#259;n Studio DT 23m&sup2;. + Gi&aacute; 3.500.000 &#273;/th&aacute;ng. - C&#259;n h&#7897; Chia 1 kh&aacute;ch v&agrave; ng&#7911; DT 38m&sup2;. + Gi&aacute; t&#7915; 5.800.000 &#273;/th&aacute;ng. + Ph&ograve;ng ng&#7911; + ph&ograve;ng kh&aacute;ch v&agrave; khu b&#7871;p ri&ecirc;ng bi&#7879;t. + Ph&ograve;ng ng&#7911; &#273;&#432;&#7907;c trang b&#7883; &#273;i&#7873;u h&ograve;a 2 chi&#7873;u, gi&#432;&#7901;ng, t&#7911; qu&#7847;n &aacute;o... + Ph&ograve;ng kh&aacute;ch c&#361;ng c&oacute; th&#7875; l&agrave;m ph&ograve;ng ng&#7911; n&#7871;u nh&agrave; &#272;&ocirc;ng ng&#432;&#7901;i. + Ph&ograve;ng b&#7871;p &#273;&#432;&#7907;c trang b&#7883; b&agrave;n &#259;n, b&agrave;n b&#7871;p, t&#7911; b&#7871;p, ch&#7853;u r&#7917;a b&aacute;t, h&uacute;t m&ugrave;i,... + Khu v&#7921;c nh&agrave; v&#7879; sinh &#273;&#432;&#7907;c l&#7855;p &#273;&#7847;y &#273;&#7911; thi&#7871;t b&#7883; hi&#7879;n &#273;&#7841;i nh&#432; ch&#7853;u r&#7917;a m&#7863;t, b&#7879;t Inax, v&ograve;i sen, b&igrave;nh n&oacute;ng l&#7841;nh,... - T&ograve;a nh&agrave; c&oacute; b&#7843;o v&#7879; 24/24, &#273;&#7843;m b&#7843;o an ninh tuy&#7879;t &#273;&#7889;i, gi&#7901; gi&#7845;c ra v&agrave;o tho&#7843;i m&aacute;i. - Khu v&#7921;c ban c&ocirc;ng ph&#417;i &#273;&#7891; ri&ecirc;ng bi&#7879;t c&#7911;a t&#7915;ng ph&ograve;ng. * T&ograve;a nh&agrave; n&#7857;m &#7903; v&#7883; tr&iacute; trung t&acirc;m, giao th&ocirc;ng thu&#7853;n ti&#7879;n, c&aacute;ch m&#7863;t &#273;&#432;&#7901;ng Do&atilde;n K&#7871; Thi&#7879;n 20m, &#273;&#7889;i di&#7879;n ch&#7907; &#272;&#7891;ng Xa n&ecirc;n r&#7845;t thu&#7853;n ti&#7879;n cho vi&#7879;c mua s&#7855;m, &#273;i ch&#7907;, n&#7857;m trong khu&ocirc;n vi&ecirc;n t&#7853;p qu&acirc;n &#273;&#7897;i n&ecirc;n an ninh r&#7845;t t&#7889;t, g&#7847;n c&aacute;c trung t&acirc;m th&#432;&#417;ng m&#7841;i, g&#7847;n c&aacute;c tr&#432;&#7901;ng &#272;H nh&#432; qu&#7889;c gia, ngo&#7841;i ng&#7919;, g&#7847;n b&#7871;n xe M&#7929; &#272;&igrave;nh,...</p>

<p>&#272;&#7883;a ch&#7881;: S&#7889; 32C1 &#272;&#432;&#7901;ng Do&atilde;n K&#7871; Thi&#7879;n (&#272;&#7889;i di&#7879;n c&#7893;ng ch&#7907; &#273;&#7891;ng Xa) - P. Mai D&#7883;ch - C&#7847;u Gi&#7845;y. LH C H&#432;&#417;ng.</p>
                        </p>
                        <div className="mt-5">
                            <h5>Đặc điểm bất động sản</h5>
                            <div>Loại tin đăng: Cho thuê nhà trọ, phòng trọ</div>
                            <Row>
                                <Col md={6}>
                                    <hr />
                                    <div className="d-flex align-items-center px-5">
                                        <h6 style={{ minWidth: "140px" }}>Diện tích</h6>
                                        <div className="mb-2 ms-5">47 m²</div>
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <hr />
                                    <div className="d-flex align-items-center px-5">
                                        <h6 style={{ minWidth: "140px" }}>Mức giá</h6>
                                        <div className="mb-2 ms-5">6 triệu/tháng</div>
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <hr />
                                    <div className="d-flex align-items-center px-5">
                                        <h6 style={{ minWidth: "140px" }}>Số phòng ngủ</h6>
                                        <div className="mb-2 ms-5">2 phòng</div>
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <hr />
                                    <div className="d-flex align-items-center px-5">
                                        <h6 style={{ minWidth: "140px" }}>Pháp lý</h6>
                                        <div className="mb-2 ms-5">Sổ đỏ/ Sổ hồng</div>
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <hr />
                                    <div className="d-flex align-items-center px-5">
                                        <h6 style={{ minWidth: "140px" }}>Số toilet</h6>
                                        <div className="mb-2 ms-5">1 phòng</div>
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <hr />
                                    <div className="d-flex align-items-center px-5">
                                        <h6 style={{ minWidth: "140px" }}>Nội thất</h6>
                                        <div className="mb-2 ms-5">Nội thất chủ đầu tư</div>
                                    </div>
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
                                        <h6>01/12/2022</h6>
                                    </div>
                                    <div className="me-5">
                                        <div>Ngày hết hạn</div>
                                        <h6>01/12/2022</h6>
                                    </div>
                                    <div className="me-5">
                                        <div>Loại tin</div>
                                        <h6>Tin Vip đặc biệt</h6>
                                    </div>
                                    <div className="me-5">
                                        <div>Mã tin</div>
                                        <h6>35842627</h6>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        </div>

                        <NewsCard title="Tin đăng dành cho bạn" data={recommendedData} wrapItem={true} />
                        <NewsCard title="Tin đăng đã xem" data={recommendedData} wrapItem={true} />
                        <hr />
                        <div className="my-4">
                        Quý vị đang xem nội dung tin rao "Chính chủ cho thuê căn hộ full nội thất 1K1N 35 - 45m2 phố Doãn Kế Thiện - Cầu Giấy" - Mã tin 36081052. Mọi thông tin, nội dung liên quan tới tin rao này là do người đăng tin đăng tải và chịu trách nhiệm. Batdongsan.com.vn luôn cố gắng để các thông tin được hữu ích nhất cho quý vị tuy nhiên Batdongsan.com.vn không đảm bảo và không chịu trách nhiệm về bất kỳ thông tin, nội dung nào liên quan tới tin rao này. Trường hợp phát hiện nội dung tin đăng không chính xác, Quý vị hãy thông báo và cung cấp thông tin cho Ban quản trị Batdongsan.com.vn theo Hotline 19001881 để được hỗ trợ nhanh và kịp thời nhất.
                        </div>
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
                                <h6>Lê Phi Long</h6>
                                <div>Xem thêm 1 tin khác</div>
                                <Button ref={numberPhoneRef} className="w-100 mt-2" color="info" onClick={(e) => copyToClipboard(e)}>
                                    0832 025 *** · Hiện số
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
    );
}

export default Post;
