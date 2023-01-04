import React, { useEffect, useState } from "react";
import { Dot, Heart, HeartFill, Image } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Row } from "reactstrap";
import { areaSizeOptions, locationSearchOptions, priceOptions, sortOptions, utilityLinkOptions } from "../../constants";
import { postService } from "../../services";
import { searchDispatch } from "../../store/slices/searchSlice";
import { settingsDispatch } from "../../store/slices/settingsSlice";
import { formatCurrency } from "../../utils";
import SearchBox from '../SearchBox';
import Paging from "./Paging";
import Select from "./Select";

function PostList(props) {

    const {
		title,
		listPost,
		total,
		searchFunc,
	} = props;

    useEffect(() => {
        return () => {
            dispatch(
                searchDispatch.resetSort()
            );
        }
    }, [])

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [sortType, setSortType] = useState("default");

    const handleChangeSort = (e) => {
        setSortType(e.target.value);
        dispatch(
            searchDispatch.updateSort(e.target.value)
        );
    };

    const handleClickPost = (event, postId) => {
        event.stopPropagation();
        navigate(`/post/${postId}`);
    }

    const handleLikeOrUnlike = async (event, post) => {
        event.stopPropagation();
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
            searchFunc?.();
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

    return (
        <div className="post-list">
            <SearchBox layout='row' />
            <div className="container-sm mt-3">
                
                <Row>
                    <Col md={9}>
                        <div>Tất cả phòng trọ trên toàn quốc</div>
                        <div className="d-flex justify-content-between align-items-center">
                            <h4 className="mt-2">{ title }</h4>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <div>Hiện có { total ?? 0 } tin đăng.</div>
                            <div className="w-25">
                                <Select options={sortOptions} value={sortType} onChange={handleChangeSort} />
                            </div>
                        </div>
                        <div className="list-post__container">
                            {listPost.map((post) => (
                                <div key={post.id} className="list-post__item my-2 cursor-pointer" onClick={(e) => handleClickPost(e, post.id)}>
                                    <Card>
                                        <div className="d-flex">
                                            <div className="position-relative">
                                                <img className="position-relative item__image" src={post.images?.[0]?.link} alt={post.title} />
                                                <div className="image__count position-absolute d-flex align-items-center">
                                                    <Image className="me-1" color="#fff" />
                                                    <div className="cl-white">{post.images?.length}</div>
                                                </div>
                                            </div>
                                            <div className="p-3 flex-grow-1">
                                                <h6 className="post__title">{post.title}</h6>
                                                <div className="mt-3 d-flex align-items-center">
                                                    <div>
                                                        <h6>{formatCurrency(post.price)} VNĐ</h6>
                                                    </div>
                                                    <div className="mx-2 d-flex align-items-center">
                                                        <Dot />
                                                    </div>
                                                    <div>
                                                        <h6>{post.area} m²</h6>
                                                    </div>
                                                    <div className="mx-2 d-flex align-items-center">
                                                        <Dot />
                                                    </div>
                                                    <div className="mb-2">{post.address.addressDetail}</div>
                                                </div>
                                                <div className="mt-2">{post.content}</div>
                                                <div className="d-flex justify-content-between">
                                                    <div className="mt-2 cl-dark-gray">{post.createdDate}</div>
                                                    <div className="d-flex gap-2">
                                                        <Button outline onClick={(e) => handleLikeOrUnlike(e, post)}>
                                                            {post.liked ? <HeartFill /> : <Heart />}
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            ))}
                        </div>
                        <Paging {...props} />
                    </Col>
                    <Col md={3}>
                        <Card className="p-3 mt-4">
                            <h6>Lọc theo khoảng giá</h6>
                            <div className="price__filter">
                                {priceOptions.map((item, index) => (
                                    <div className="my-1 p-1 hover-bg cursor-pointer" key={index}>{item.label}</div>
                                ))}
                            </div>
                        </Card>
                        <Card className="p-3 mt-4">
                            <h6>Lọc theo diện tích</h6>
                            <div className="price__filter">
                                {areaSizeOptions.map((item, index) => (
                                    <div className="my-1 p-1 hover-bg cursor-pointer" key={index}>{item.label}</div>
                                ))}
                            </div>
                        </Card>
                        <Card className="p-3 mt-4 bg-gray">
                            <h6>Phòng trọ cho thuê</h6>
                            <div className="price__filter">
                                {locationSearchOptions.map((item, index) => (
                                    <div className="my-1 p-1 hover-bg-white cursor-pointer" key={index}>{item.label} ({item.count})</div>
                                ))}
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default PostList;
