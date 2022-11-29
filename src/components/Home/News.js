import React, { useState } from "react";
import {
  Arrow90degRight,
  ArrowBarRight,
  ArrowRight,
  Clock,
} from "react-bootstrap-icons";
import { Col, Container, NavLink, Row } from "reactstrap";

function News(props) {
  const tabs = [
    {
      id: 0,
      title: "Tin nổi bật",
      content: [
        {
          id: 0,
          title: "Có Nên Mua Chung Cư Quận Tân Bình Giá 1 Tỷ?",
          image_url:
            "https://file4.batdongsan.com.vn/crop/610x342/2022/11/24/PHJN6Zw0/20221124160930-e605.jpg",
          created_at: "1 ngày trước",
        },
        {
          id: 1,
          title: 'Có Tiền Nên Gửi Ngân Hàng Hay Chờ "Bắt Đáy" Bất Động Sản?',
          image_url:
            "https://file4.batdongsan.com.vn/crop/610x342/2022/11/24/wxbwknn6/20221124162951-ca79.jpg",
          created_at: "1 ngày trước",
        },
        {
          id: 2,
          title: "Cập Nhật Giá Chung Cư Quận 5 Mới Nhất Tháng 12/2022",
          image_url:
            "https://file4.batdongsan.com.vn/crop/610x342/2022/11/23/wxbwknn6/20221123151428-109e.jpg",
          created_at: "1 ngày trước",
        },
        {
          id: 3,
          title: "Giá Thuê Căn Hộ Chung Cư Tiếp Tục Tăng Mạnh",
          image_url:
            "https://file4.batdongsan.com.vn/crop/610x342/2022/11/24/PHJN6Zw0/20221124160930-e605.jpg",
          created_at: "1 ngày trước",
        },
      ],
    },
    {
      id: 1,
      title: "Tin tức",
      content: [
        {
          id: 0,
          title:
            "Các Chủ Đầu Tư BĐS Ưu Tú Sẽ Tranh Tài Tại Giải Thưởng BĐS Châu Á - APA",
          image_url:
            "https://file4.batdongsan.com.vn/crop/610x342/2022/11/24/wxbwknn6/20221124103420-78d5.jpg",
          created_at: "1 ngày trước",
        },
        {
          id: 1,
          title: "Thuê Chung Cư Quận 10 Giá 5 Triệu Có Khả Thi Không?",
          image_url:
            "https://file4.batdongsan.com.vn/crop/610x342/2022/11/24/wxbwknn6/20221124162951-ca79.jpg",
          created_at: "1 ngày trước",
        },
        {
          id: 2,
          title: "Doanh Nghiệp Bất Động Sản: Củng Cố Nội Lực Để Tồn Tại",
          image_url:
            "https://file4.batdongsan.com.vn/crop/610x342/2022/11/23/wxbwknn6/20221123151428-109e.jpg",
          created_at: "1 ngày trước",
        },
        {
          id: 3,
          title: 'Giang Ơi "Mách Nước" Người Trẻ Mua Nhà Và Đầu Tư BĐS',
          image_url:
            "https://file4.batdongsan.com.vn/crop/610x342/2022/11/24/PHJN6Zw0/20221124160930-e605.jpg",
          created_at: "1 ngày trước",
        },
      ],
    },
    {
      id: 2,
      title: "BĐS TPHCM",
      content: [
        {
          id: 0,
          title: "Có Nên Mua Chung Cư Quận Tân Bình Giá 1 Tỷ?",
          image_url:
            "https://file4.batdongsan.com.vn/crop/610x342/2022/11/24/PHJN6Zw0/20221124160930-e605.jpg",
          created_at: "1 ngày trước",
        },
        {
          id: 1,
          title: 'Có Tiền Nên Gửi Ngân Hàng Hay Chờ "Bắt Đáy" Bất Động Sản?',
          image_url:
            "https://file4.batdongsan.com.vn/crop/610x342/2022/11/24/wxbwknn6/20221124162951-ca79.jpg",
          created_at: "1 ngày trước",
        },
        {
          id: 2,
          title: "Cập Nhật Giá Chung Cư Quận 5 Mới Nhất Tháng 12/2022",
          image_url:
            "https://file4.batdongsan.com.vn/crop/610x342/2022/11/23/wxbwknn6/20221123151428-109e.jpg",
          created_at: "1 ngày trước",
        },
        {
          id: 3,
          title: "Giá Thuê Căn Hộ Chung Cư Tiếp Tục Tăng Mạnh",
          image_url:
            "https://file4.batdongsan.com.vn/crop/610x342/2022/11/24/PHJN6Zw0/20221124160930-e605.jpg",
          created_at: "1 ngày trước",
        },
      ],
    },
    {
      id: 3,
      title: "BĐS Hà Nội",
      content: [
        {
          id: 0,
          title: "Có Nên Mua Chung Cư Quận Tân Bình Giá 1 Tỷ?",
          image_url:
            "https://file4.batdongsan.com.vn/crop/610x342/2022/11/24/PHJN6Zw0/20221124160930-e605.jpg",
          created_at: "1 ngày trước",
        },
        {
          id: 1,
          title: 'Có Tiền Nên Gửi Ngân Hàng Hay Chờ "Bắt Đáy" Bất Động Sản?',
          image_url:
            "https://file4.batdongsan.com.vn/crop/610x342/2022/11/24/wxbwknn6/20221124162951-ca79.jpg",
          created_at: "1 ngày trước",
        },
        {
          id: 2,
          title: "Cập Nhật Giá Chung Cư Quận 5 Mới Nhất Tháng 12/2022",
          image_url:
            "https://file4.batdongsan.com.vn/crop/610x342/2022/11/23/wxbwknn6/20221123151428-109e.jpg",
          created_at: "1 ngày trước",
        },
        {
          id: 3,
          title: "Giá Thuê Căn Hộ Chung Cư Tiếp Tục Tăng Mạnh",
          image_url:
            "https://file4.batdongsan.com.vn/crop/610x342/2022/11/24/PHJN6Zw0/20221124160930-e605.jpg",
          created_at: "1 ngày trước",
        },
      ],
    },
  ];

  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedContent, setSelectedContent] = useState(0);

  const handleClickTab = (id) => {
    setSelectedTab(id);
    setSelectedContent(0);
  };

  const handleClickContent = (id) => {
    setSelectedContent(id);
  };

  return (
    <div className="news page-container-sm mt-5">
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex">
          {tabs.map((item, index) => (
            <div
              className={`mx-2 news__tab ${
                selectedTab === item.id ? "news__tab--selected" : ""
              }`}
              key={index}
              onClick={() => handleClickTab(item.id)}
            >
              <h4>{item.title}</h4>
            </div>
          ))}
        </div>
        <div>
          <span className="news__more-button">
            Xem thêm <ArrowRight />
          </span>
        </div>
      </div>
      <div className="mt-3 news__content">
        <Row>
          <Col md={6}>
            <div>
              <img
                alt="product-demo"
                src={tabs[selectedTab].content[selectedContent].image_url}
              />
              <h5 className="mt-3">
                {tabs[selectedTab].content[selectedContent].title}
              </h5>
              <div>
                <Clock className="me-2" />
                {tabs[selectedTab].content[selectedContent].created_at}
              </div>
            </div>
          </Col>
          <Col md={6}>
            {tabs[selectedTab].content.map((item, index) => (
              <div
                key={index}
                className="news__content-header"
                onMouseOver={() => handleClickContent(item.id)}
              >
                <div>
                  <h6>{item.title}</h6>
                </div>
                <hr />
              </div>
            ))}
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default News;
