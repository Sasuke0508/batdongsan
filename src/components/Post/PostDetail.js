import React, { useRef, useState } from "react";
import { Dot, ExclamationTriangle, Facebook, Heart, HeartFill, Share } from "react-bootstrap-icons";
import ReactImageGallery from "react-image-gallery";
import { useDispatch } from "react-redux";
import { Button, CarouselCaption, CarouselItem, Col, Input, Label, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import { recommendedData, reportReasonList } from "../../constants";
import { settingsDispatch } from "../../store/slices/settingsSlice";
import NewsCard from "../core/NewsCard";
import RequestModal from "../core/RequestModal";
import SearchBar from "../core/SearchBar";
import ToolTips from "../core/ToolTips";
import useWindowHeight from "../core/useWindowHeight";

function Post(props) {
    const slideItems = [
        {
            original: "https://file4.batdongsan.com.vn/2022/11/15/20221115115039-c46d_wm.jpg",
            thumbnail: "https://file4.batdongsan.com.vn/2022/11/15/20221115115039-c46d_wm.jpg",
            altText: "Slide 1",
            caption: "Slide 1",
            key: 1,
        },
        {
            original: "https://file4.batdongsan.com.vn/2022/11/15/20221115115039-0f54_wm.jpg",
            thumbnail: "https://file4.batdongsan.com.vn/2022/11/15/20221115115039-0f54_wm.jpg",
            altText: "Slide 2",
            caption: "Slide 2",
            key: 2,
        },
        {
            original: "https://file4.batdongsan.com.vn/2022/11/15/20221115115040-11af_wm.jpg",
            thumbnail: "https://file4.batdongsan.com.vn/2022/11/15/20221115115040-11af_wm.jpg",
            altText: "Slide 3",
            caption: "Slide 3",
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
        dispatch(
            settingsDispatch.actSetToastMessage({
                open: true,
                content: "Copied!",
                error: false,
            })
        );
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
                                    <h5>110 tỷ</h5>
                                </span>
                                <span className="mx-1">
                                    <Dot />
                                </span>
                                <span>
                                    <h5>189 m²</h5>
                                </span>
                                <span className="mx-1">
                                    <Dot />
                                </span>
                                <span>
                                    <h5>1 PN</h5>
                                </span>
                            </div>
                            <div>Đường Nguyễn Đình Chiểu, Phường Đa Kao, Quận 1, Hồ Chí Minh</div>
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
                            <Button color="info">0832 025 *** · Hiện số</Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="page-container-xl mt-3">
                <Row>
                    <Col md={9}>
                        <ReactImageGallery items={slideItems} showPlayButton={false} autoPlay={true} />
                        <p className="mt-3">Bán/Hồ Chí Minh/Quận 9/Căn hộ chung cư tại Vinhomes Grand Park</p>
                        <h5>SANG NHƯỢNG VINHOMES GRAND PARK QUẬN 9 STUDIO 1.2 TỶ, 1PN 1.7 TỶ, 2PN 2 TỶ, LH 0832 025 ***</h5>
                        <p className="mt-1">Dự án Vinhomes Grand Park, Quận 9, Hồ Chí Minh</p>
                        <hr />
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-start">
                                <div className="py-2 me-4">
                                    <div>Mức giá</div>
                                    <h5>1.7 tỷ</h5>
                                    <div>~36.17 triệu/m²</div>
                                </div>
                                <div className="py-2 mx-4">
                                    <div>Diện tích</div>
                                    <h5>47 m²</h5>
                                </div>
                                <div className="py-2 mx-4">
                                    <div>Phòng ngủ</div>
                                    <h5>1 PN</h5>
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
                            Mở bán chính thức đại đô thị thông minh chuẩn Singapore - Vinhomes Grand Park. Tổng quan dự án: - Tên dự án: Vinhomes
                            Grand Park Quận 9. - Vị trí: Đường Nguyễn Xiển và Phước Thiện, phường Long Bình, Quận 9, TP. Hồ Chí Minh. - Đầu tư dự án:
                            Tập đoàn Vingroup. Nhà thầu xây dựng chính: Coteccons. - Tổng diện tích của dự án: 271ha. - Mật độ xây dựng: 40%. - Các
                            loại hình xây dựng: Căn hộ - nhà phố - Shophouse - Biệt thự và dinh thự. - Quy mô dự án căn hộ Vinhomes Quận 9: Cao 26 -
                            35 tầng. - Số lượng khoảng hơn 44.000 căn hộ với diện tích dự kiến vào khoảng 35m² đến 139m². - Nhà phố, shophouse, biệt
                            thự diện tích từ 84m² đến 500m². - Tiện ích nổi bật: Trung tâm thương mại Vincom, bệnh viện Quốc tế Vinmec, trường học
                            Quốc tế Vinschool, siêu thị Vinmart, Tuyến xe Vinbus. Thương mại dịch vụ hồ bơi, khu vui chơi, công viên ánh sáng lớn nhất
                            Đông Nam Á... Phân khu Rainbow: - Studio (diện tích 30 - 35m) Giá bán hiện tại: 1.25 tỷ - 1.4 tỷ. - Căn hộ 1PN + 1 (diện
                            tích 46.5 - 51.5 m²) Giá bán hiện tại: 1.7 tỷ - 1.9 tỷ. - Căn hộ 2PN 1WC (diện tích: 59m²) Giá bán hiện tại: 2 tỷ - 2.3
                            tỷ. - Căn hộ 2PN + 1 (2WC) diện tích 69m² căn góc. Giá bán hiện tại: 2.5 - 2.8 tỷ. - Căn hộ 3PN 81.7m² giá bán hiện tại:
                            2.8 tỷ - 3 tỷ. Ngân hàng hỗ trợ 70%. Chỉ cần trả trước 30% giá gốc. Lưu ý: Giá căn hộ có thể phụ thuộc vào tầng view và
                            chủ nhà. Liên hệ: 0832 025 *** PKD. Và còn thêm nhiều phân khu bán mới như Origami, Solari, The Beverly, Lumier nhiều
                            chính sách ưu đãi. Chuyển nhượng nhà phố The Mahattan giá tốt nhất thị trường. PKD có 5 năm kinh nghiệm về bất động sản.
                            Có xe đưa đón xem dự án tận nơi. Công ty nằm trong dự án xem nhà 24/24. Liên hệ ngay: 0832 025 *** PKD.
                        </p>
                        <div className="mt-5">
                            <h5>Đặc điểm bất động sản</h5>
                            <div>Loại tin đăng: Bán căn hộ chung cư</div>
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
                                        <div className="mb-2 ms-5">1.7 tỷ</div>
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <hr />
                                    <div className="d-flex align-items-center px-5">
                                        <h6 style={{ minWidth: "140px" }}>Số phòng ngủ</h6>
                                        <div className="mb-2 ms-5">1 phòng</div>
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

                        <NewsCard title="Bất động sản dành cho bạn" data={recommendedData} wrapItem={true} />
                        <NewsCard title="Tin đăng đã xem" data={recommendedData} wrapItem={true} />
                        <hr />
                        <div className="my-4">
                            Quý vị đang xem nội dung tin rao "Bán hàng hiếm góc 2 MT Nguyễn Đình Chiểu, P Đa Kao Q1 DT 8x24m CN 189m2 trệt 1L. Chỉ 110
                            tỷ tl" - Mã tin 34845360. Mọi thông tin, nội dung liên quan tới tin rao này là do người đăng tin đăng tải và chịu trách
                            nhiệm. Batdongsan.com.vn luôn cố gắng để các thông tin được hữu ích nhất cho quý vị tuy nhiên Batdongsan.com.vn không đảm
                            bảo và không chịu trách nhiệm về bất kỳ thông tin, nội dung nào liên quan tới tin rao này. Trường hợp phát hiện nội dung
                            tin đăng không chính xác, Quý vị hãy thông báo và cung cấp thông tin cho Ban quản trị Batdongsan.com.vn theo Hotline
                            19001881 để được hỗ trợ nhanh và kịp thời nhất.
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
