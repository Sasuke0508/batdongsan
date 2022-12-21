import React, { useState } from "react";
import { Dot } from "react-bootstrap-icons";
import { Card, Col, Row } from "reactstrap";
import { listPost, sortOptions } from "../../constants";
import SearchBar from "../core/SearchBar";
import Select from "../core/Select";

function PostList(props) {
    const [sortType, setSortType] = useState("default");
    const handleChangeSort = (e) => {
        setSortType(e.target.value);
    };
    return (
        <div className="post-list">
            <SearchBar />
            <div className="container-sm mt-3">
                <Row>
                    <Col md={9}>
                        <div>Cho thuê/Tất cả BĐS trên toàn quốc</div>
                        <h4 className="mt-2">Cho thuê nhà đất trên toàn quốc</h4>
                        <div className="d-flex justify-content-between align-items-center">
                            <div>Hiện có 63,746 bất động sản.</div>
                            <div className="w-25">
                                <Select options={sortOptions} value={sortType} onChange={handleChangeSort} />
                            </div>
                        </div>
                        <div className="list-post__container">
                            {listPost.map((post, indexPost) => (
                                <div key={indexPost} className="list-post__item my-2">
                                    <Card>
                                        <div className="d-flex">
                                            <img className="position-relative item__image" src={post.imageUrl} alt={post.title} />
                                            <div className="p-3">
                                                <h6 className="post__title">{post.title}</h6>
                                                <div className="mt-3 d-flex align-items-center">
                                                    <div>
                                                        <h6>{post.price}</h6>
                                                    </div>
                                                    <div className="mx-2">
                                                        <Dot />
                                                    </div>
                                                    <div>
                                                        <h6>{post.areaSize}</h6>
                                                    </div>
                                                    <div className="mx-2">
                                                        <Dot />
                                                    </div>
                                                    <div>{post.address}</div>
                                                </div>
                                                <div className="mt-2">
                                                    {post.description}
                                                </div>
                                                <div className="mt-2">
                                                    {post.updatedAt}
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    </Col>
                    <Col md={3}></Col>
                </Row>
            </div>
        </div>
    );
}

export default PostList;
