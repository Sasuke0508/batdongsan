import React, { useState } from "react";
import { Dot, HeartFill, Image } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Pagination, PaginationItem, PaginationLink, Row } from "reactstrap";
import { listPost, sortOptions, utilityLinkOptions } from "../../constants";
import SearchBar from "../core/SearchBar";
import Select from "../core/Select";

function PostSaved(props) {
    const navigate = useNavigate()
    const [sortType, setSortType] = useState("default");
    const handleChangeSort = (e) => {
        setSortType(e.target.value);
    };
    const handleClickPost = () => {
        navigate('/post/1')
    }
    return (
        <div className="post-list">
            <SearchBar />
            <div className="container-sm mt-3">
                <Row>
                    <Col md={9}>
                        <h4 className="mt-2">Tin đăng đã lưu</h4>
                        <div className="d-flex justify-content-between align-items-center">
                            <div>Tổng số 1 tin đăng</div>
                            <div className="w-25">
                                <Select options={sortOptions} value={sortType} onChange={handleChangeSort} />
                            </div>
                        </div>
                        <div className="list-post__container">
                            {listPost.map((post, indexPost) => (
                                <div key={indexPost} className="list-post__item my-2 cursor-pointer" onClick={handleClickPost}>
                                    <Card>
                                        <div className="d-flex">
                                            <div className="position-relative">
                                                <img className="position-relative item__image" src={post.imageUrl} alt={post.title} />
                                                <div className="image__count position-absolute d-flex align-items-center">
                                                    <Image className="me-1" color="#fff" />
                                                    <div className="cl-white">{post.imageCount}</div>
                                                </div>
                                            </div>
                                            <div className="p-3">
                                                <h6 className="post__title">{post.title}</h6>
                                                <div className="mt-3 d-flex align-items-center">
                                                    <div>
                                                        <h6>{post.price}</h6>
                                                    </div>
                                                    <div className="mx-2 d-flex align-items-center">
                                                        <Dot />
                                                    </div>
                                                    <div>
                                                        <h6>{post.areaSize}</h6>
                                                    </div>
                                                    <div className="mx-2 d-flex align-items-center">
                                                        <Dot />
                                                    </div>
                                                    <div className="mb-2">{post.address}</div>
                                                </div>
                                                <div className="mt-2">{post.description}</div>
                                                <div className="d-flex justify-content-between">
                                                    <div className="mt-2 cl-dark-gray">{post.updatedAt}</div>
                                                    <Button outline>
                                                        <HeartFill />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            ))}
                        </div>
                        <div className="list__pagination mt-3">
                            <Pagination>
                                <PaginationItem>
                                    <PaginationLink first href="#" />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href="#" previous />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href="#">1</PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href="#">2</PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href="#">3</PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href="#">4</PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href="#">5</PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href="#" next />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href="#" last />
                                </PaginationItem>
                            </Pagination>
                        </div>
                    </Col>
                    <Col md={3}>
                        <Card className="p-3 mt-4">
                            <h6>Hỗ trợ tiện ích</h6>
                            <div className="price__filter">
                                {utilityLinkOptions.map((item, index) => (
                                    <div className="my-1 p-1 hover-bg-white cursor-pointer" key={index}>
                                        {item.label}
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default PostSaved;
