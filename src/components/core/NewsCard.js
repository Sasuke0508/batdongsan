import React, { useRef } from "react";
import { Heart, HeartFill, Image } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Row } from "reactstrap";
import { postService } from "../../services";
import { settingsDispatch } from "../../store/slices/settingsSlice";
import DragToScroll from "./DragToScroll";

function NewsCard(props) {
    const { data, wrapItem, title, isShowMore, searchFunc } = props;
    
    const navigate = useNavigate();
    const token = useSelector(store => store.tokenSlice.user);
    const dispatch = useDispatch();

    const handleClickCard = (postId) => {
        navigate(`/post/${postId}`);
    };

    const handleShowMore = () => {
        navigate('/post');
    }

    const handleLikeOrUnlike = async (post) => {
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
        <div>
            <div className="news-card">
                <div className={`card-list__container ${wrapItem ? "card-list__container--row" : ""}`}>
                    <DragToScroll active={wrapItem} enableNav={wrapItem} title={title} childrenClassName={"card__item-wrapper"}>
                    <Row>
                        {data?.map((item) => (
                            <Col md={3} key={item.id} className="mt-4 card__item-wrapper" >
                                <Card className="position-relative card__item">
                                    <img alt="recommended" src={item.images?.[0]?.link} />
                                    <div className="image-count position-absolute d-flex align-items-center">
                                        {item.images?.length ?? 0}
                                        <Image className="ms-1" color="#fff" />
                                    </div>
                                    <div className="p-3">
                                        <h6 className="card__title cursor-pointer" onClick={() => handleClickCard(item.id)}>
                                            {item.title}
                                        </h6>
                                        <div className="mt-1">
                                            <b>{item.price}</b> - <b>{item.area}</b>
                                        </div>
                                        <div>{item.address.addressDetail}</div>
                                        <div className="d-flex justify-content-between align-items-center mt-3">
                                            <span>{item.createdDate}</span>
                                            <Button outline onClick={() => handleLikeOrUnlike(item)}>{item.liked ? <HeartFill /> : <Heart />}</Button>
                                        </div>
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    {
                        isShowMore && 
                        <div className="d-flex justify-content-center mt-3">
                            <Button outline onClick={handleShowMore}>
                                Xem thêm
                            </Button>
                        </div>
                    }
                    </DragToScroll>
                </div>
            </div>
        </div>
    );
}

export default NewsCard;
