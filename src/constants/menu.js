import { BoxArrowLeft, CreditCard, ListUl, Lock, Person } from "react-bootstrap-icons";

export const listMenuItem = [
    {
        id: 1,
        title: "Nhà đất cho thuê",
        path: "/post",
        subMenu: [
            {
                title: "Cho thuê căn hộ chung cư",
                path: "",
            },
            {
                title: "Cho thuê nhà riêng",
                path: "",
            },
            {
                title: "Biệt thự liền kề",
                path: "",
            },
            {
                title: "Cho thuê nhà mặt phố",
                path: "",
            },
        ],
    },
    {
        id: 2,
        title: "Tin tức",
        path: "",
        subMenu: [
            {
                title: "Thuê căn hộ chung cư",
                path: "",
            },
            {
                title: "Cho thuê nhà riêng",
                path: "",
            },
            {
                title: "Biệt thự liền kề",
                path: "",
            },
            {
                title: "Cho thuê nhà mặt phố",
                path: "",
            },
        ],
    },
    {
        id: 3,
        title: "Bảng giá",
        path: "/pricing-plan",
    },
];

export const sellTypes = [
    {
        label: "Cho thuê căn hộ, chung cư",
        value: 1,
    },
    {
        label: "Cho thuê nhà riêng",
        value: 2,
    },
    {
        label: "Cho thuê nhà biệt thự, liền kề",
        value: 3,
    },
    {
        label: "Cho thuê nhà mặt phố",
        value: 4,
    },
    {
        label: "Cho thuê shophouse, nhà phố thương mại",
        value: 5,
    },
    {
        label: "Cho thuê đất nền dự án",
        value: 6,
    },
    {
        label: "Cho thuê đất",
        value: 7,
    },
    {
        label: "Cho thuê trang trại, khu nghỉ dưỡng",
        value: 8,
    },
    {
        label: "Cho thuê condotel",
        value: 9,
    },
    {
        label: "Cho thuê loại bất động sản khác",
        value: 10,
    },
];

export const utilityList = [
    {
        label: "Điều hoà",
        value: "dieu_hoa",
    },
    {
        label: "Bình nóng lạnh",
        value: "binh_nong_lanh",
    },
];

export const sellUnits = [
    { value: "vnd", label: "VND" },
    { value: "gia_m2", label: "Giá/ m2" },
    { value: "thoa_thuan", label: "Thoả thuận" },
];

export const postTypePlan = [
    {
        id: 0,
        performance: "0",
        title: "Tin thường",
        titleColor: {
            color: "#004e7f",
            label: "màu xanh",
        },
        position: "Hiện dưới cùng",
        postDays: "Đăng tối thiểu 7 ngày",
        price: 2727,
    },
    {
        id: 1,
        performance: "11",
        title: "VIP 3",
        titleColor: {
            color: "#ff661f",
            label: "màu cam",
        },
        position: "Hiện dưới VIP 2",
        postDays: "Đăng tối thiểu 7 ngày",
        price: 50000,
    },
    {
        id: 2,
        performance: "18",
        title: "VIP 2",
        titleColor: {
            color: "#ff661f",
            label: "MÀU CAM",
        },
        position: "Hiện dưới VIP 1",
        postDays: "Đăng tối thiểu 7 ngày",
        price: 63636,
    },
    {
        id: 3,
        performance: "36",
        title: "VIP 1",
        titleColor: {
            color: "#e03c31",
            label: "MÀU ĐỎ",
        },
        position: "Hiện dưới VIP Đặc Biệt",
        postDays: "Đăng tối thiểu 7 ngày",
        price: 90909,
    },
    {
        id: 4,
        performance: "90",
        title: "VIP Đặc Biệt",
        titleColor: {
            color: "#e03c31",
            label: "MÀU ĐỎ",
        },
        position: "Luôn hiện đầu danh sách tin",
        postDays: "Đăng tối thiểu 10 ngày",
        price: 200000,
    },
];

export const reportReasonList = [
    {
        value: "dia_chi",
        label: "Địa chỉ của bất động sản",
    },
    {
        value: "thong_tin",
        label: "Các thông tin về: giá, diện tích, mô tả,..",
    },
    {
        value: "anh",
        label: "Ảnh",
    },
    {
        value: "trung",
        label: "Trùng với tin rao khác",
    },
    {
        value: "khong_lien_lac",
        label: "Không liên lạc được",
    },
    {
        value: "khong_co_that",
        label: "Tin không có thật",
    },
    {
        value: "da_ban",
        label: "Bất động sản đã Cho thuê",
    },
];

export const notiList = [
    { title: "Mở thông báo để nhận tài liệu mới nhất về Digital Marketing bất động sản", date: "1/12/2022", is_read: false },
    { title: 'Trở thành "chuyên gia" trong lĩnh vực thổ cư với Podcast #29', date: "2/12/2022", is_read: false },
    { title: "Ebook miễn phí - Những Điều Cần Biết Về Hoa Hồng Dành Cho Môi Giới BĐS", date: "3/12/2022", is_read: false },
    { title: "VRES 2022 - Cơ hội kết nối & giao lưu dành riêng cho các lãnh đạo, quản lý doanh n", date: "5/12/2022", is_read: false },
];

export const priceOptions = [
    { label: "Tất cả các mức giá", from: 0, to: 0 },
    { label: "Dưới 500 triệu", from: 0, to: 500 },
    {
        label: "500 - 800 triệu",
        from: 500,
        to: 800,
    },
    {
        label: "800 triệu - 1 tỷ",
        from: 800,
        to: 1000,
    },
];
export const areaSizeOptions = [
    { label: "Dưới 30m2", from: 0, to: 30 },
    { label: "30 - 50m2", from: 30, to: 50 },
    {
        label: "50 - 80m2",
        from: 50,
        to: 80,
    },
    {
        label: "80 - 100m2",
        from: 80,
        to: 100,
    },
    {
        label: "100 - 150m2",
        from: 100,
        to: 150,
    },
    {
        label: "150 - 200m2",
        from: 150,
        to: 200,
    },
    {
        label: "Trên 500m2",
        from: "",
        to: 500,
    },
];

export const bedRoomOptions = [
    {
        label: 1,
        value: 1,
    },
    {
        label: 2,
        value: 2,
    },
    {
        label: 3,
        value: 3,
    },
    {
        label: 3,
        value: 1,
    },
    {
        label: 4,
        value: 4,
    },
    {
        label: "5+",
        value: "5",
    },
];

export const utilityOptions = [
    {
        value: "binh_nuoc_nong",
        label: "Bình nước nóng",
    },
    {
        value: "dieu_hoa",
        label: "Điều hoà",
    },
];
export const mediaOptions = [
    {
        value: "picture",
        label: "Hình ảnh",
    },
    {
        value: "video",
        label: "Video",
    },
];

export const sortOptions = [
    {
        label: "Thông thường",
        value: "default",
    },
    {
        label: "Tin mới nhất",
        value: "newest",
    },
    {
        label: "Giá từ thấp đến cao",
        value: "price_asc",
    },
    {
        label: "Giá từ cao đến thấp",
        value: "price_desc",
    },
    {
        label: "Diện tích từ bé đến lớn",
        value: "area_asc",
    },
    {
        label: "Diện tích từ lớn đến bé",
        value: "area_desc",
    },
];

export const listPost = [
    {
        title: "Cho thuê Nhà nguyên căn đa dạng diện tích 80m2, 150m2",
        price: "6-15 triệu/tháng",
        areaSize: "80-150m2",
        address: "Tây Mỗ - Hà Nội",
        description:
            "Pháp lý: Bảo đảm, thông tin minh bạch, làm việc trực tiếp, giá thỏa thuận. Cho thuê xưởng 1 và 2. * Tiêu chuẩn: + Nhà nguyên căn mới dựng khung thép tiền chế Zamil tiêu chuẩn, cao thoáng từ sàn nhà lên trần 7 - 9m, có mái tôn chống nóng, cách nhiệt, cách âm. + Sàn nhà nguyên căn tiêu chuẩn, nền bê tông chịu lực. + Hạ tầng giao thông, cấp thoát nước trạm điện, bảo vệ đầy...",
        updatedAt: "1 tuần trước",
        isLiked: false,
        imageUrl: "https://file4.batdongsan.com.vn/2021/10/09/20211009103745-e620_wm.jpg",
        imageCount: 5,
    },
    {
        title: "Cho thuê Nhà nguyên căn đa dạng diện tích 80m2, 150m2",
        price: "6-15 triệu/tháng",
        areaSize: "80-150m2",
        address: "Tây Mỗ - Hà Nội",
        description:
            "Pháp lý: Bảo đảm, thông tin minh bạch, làm việc trực tiếp, giá thỏa thuận. Cho thuê xưởng 1 và 2. * Tiêu chuẩn: + Nhà nguyên căn mới dựng khung thép tiền chế Zamil tiêu chuẩn, cao thoáng từ sàn nhà lên trần 7 - 9m, có mái tôn chống nóng, cách nhiệt, cách âm. + Sàn nhà nguyên căn tiêu chuẩn, nền bê tông chịu lực. + Hạ tầng giao thông, cấp thoát nước trạm điện, bảo vệ đầy...",
        updatedAt: "1 tuần trước",
        isLiked: true,
        imageUrl: "https://file4.batdongsan.com.vn/crop/350x232/2022/12/20/20221220170635-9dbc_wm.jpg",
        imageCount: 9,
    },
    {
        title: "Cho thuê Nhà nguyên căn đa dạng diện tích 80m2, 150m2",
        price: "6-15 triệu/tháng",
        areaSize: "80-150m2",
        address: "Tây Mỗ - Hà Nội",
        description:
            "Pháp lý: Bảo đảm, thông tin minh bạch, làm việc trực tiếp, giá thỏa thuận. Cho thuê xưởng 1 và 2. * Tiêu chuẩn: + Nhà nguyên căn mới dựng khung thép tiền chế Zamil tiêu chuẩn, cao thoáng từ sàn nhà lên trần 7 - 9m, có mái tôn chống nóng, cách nhiệt, cách âm. + Sàn nhà nguyên căn tiêu chuẩn, nền bê tông chịu lực. + Hạ tầng giao thông, cấp thoát nước trạm điện, bảo vệ đầy...",
        updatedAt: "1 tuần trước",
        isLiked: false,
        imageUrl: "https://file4.batdongsan.com.vn/2021/10/09/20211009104140-ac50_wm.jpg",
        imageCount: 5,
    },
    {
        title: "Cho thuê Nhà nguyên căn đa dạng diện tích 80m2, 150m2",
        price: "6-15 triệu/tháng",
        areaSize: "80-150m2",
        address: "Tây Mỗ - Hà Nội",
        description:
            "Pháp lý: Bảo đảm, thông tin minh bạch, làm việc trực tiếp, giá thỏa thuận. Cho thuê xưởng 1 và 2. * Tiêu chuẩn: + Nhà nguyên căn mới dựng khung thép tiền chế Zamil tiêu chuẩn, cao thoáng từ sàn nhà lên trần 7 - 9m, có mái tôn chống nóng, cách nhiệt, cách âm. + Sàn nhà nguyên căn tiêu chuẩn, nền bê tông chịu lực. + Hạ tầng giao thông, cấp thoát nước trạm điện, bảo vệ đầy...",
        updatedAt: "1 tuần trước",
        isLiked: false,
        imageUrl: "https://file4.batdongsan.com.vn/2021/10/09/20211009103746-2cc8_wm.jpg",
        imageCount: 5,
    },
    {
        title: "Cho thuê Nhà nguyên căn đa dạng diện tích 80m2, 150m2",
        price: "6-15 triệu/tháng",
        areaSize: "80-150m2",
        address: "Tây Mỗ - Hà Nội",
        description:
            "Pháp lý: Bảo đảm, thông tin minh bạch, làm việc trực tiếp, giá thỏa thuận. Cho thuê xưởng 1 và 2. * Tiêu chuẩn: + Nhà nguyên căn mới dựng khung thép tiền chế Zamil tiêu chuẩn, cao thoáng từ sàn nhà lên trần 7 - 9m, có mái tôn chống nóng, cách nhiệt, cách âm. + Sàn nhà nguyên căn tiêu chuẩn, nền bê tông chịu lực. + Hạ tầng giao thông, cấp thoát nước trạm điện, bảo vệ đầy...",
        updatedAt: "1 tuần trước",
        isLiked: false,
        imageUrl: "https://file4.batdongsan.com.vn/2021/10/09/20211009103745-4969_wm.jpg",
        imageCount: 5,
    },
];

export const locationSearchOptions = [
    {
        label: "Hồ chí minh",
        count: 45720,
        value: "01",
    },
    {
        label: "Hà Nội",
        count: 12473,
        value: "02",
    },
    {
        label: "Bình Dương",
        count: 1306,
        value: "03",
    },
    {
        label: "Đà Nẵng",
        count: 612,
        value: "04",
    },
    {
        label: "Đồng Nai",
        count: 431,
        value: "05",
    },
    {
        label: "Hải Phòng",
        count: 365,
        value: "06",
    },
    {
        label: "Long An",
        count: 245,
        value: "06",
    },
];

export const utilityLinkOptions = [
    {
        label: "Tư vấn phong thủy",
        path: "",
    },
    {
        label: "Dự tính chi phí làm nhà",
        path: "",
    },
    {
        label: "Tính lãi suất",
        path: "",
    },
    {
        label: "Quy trình xây nhà",
        path: "",
    },
    {
        label: "Xem tuổi làm nhà",
        path: "",
    },
];

export const userSettingsOptions = [
    {
        title: "Quản lý tin đăng",
        icon: <ListUl />,
        path: "/manager-post/list-post",
    },
    {
        title: "Thay đổi thông tin cá nhân",
        icon: <Person />,
        path: "/user-settings",
    },
    {
        title: "Thay đổi mật khẩu",
        icon: <Lock />,
        path: "/login",
    },
    {
        title: "Nạp tiền",
        icon: <CreditCard />,
        path: "",
    },
    {
        title: "Đăng xuất",
        icon: <BoxArrowLeft />,
        path: "/logout",
    },
];

export const houseTypeOptions = [
    {
        label : 'Tất cả nhà đất',
        value : 'all'
    },
    {
        label : 'Căn hộ chung cư',
        value : 'can_ho'
    },
    {
        label : 'Nhà riêng',
        value : 'nha_rieng'
    },
    {
        label : 'Nhà biệt thự, liền kề',
        value : 'nha_biet_thu'
    },
    {
        label : 'Nhà mặt phố',
        value : 'nha_mat_pho'
    },
]