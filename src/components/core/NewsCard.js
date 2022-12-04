import React, { useRef } from "react";
import { Heart, HeartFill, Image } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Row } from "reactstrap";
import DragToScroll from "./DragToScroll";

function NewsCard(props) {
    const { data, wrapItem } = props;
    const navigate = useNavigate()
    const handleClickCard = () => {
        navigate('/post/1')
    }
    return (
        <div className="news-card">
            <div className={`card-list__container ${wrapItem ? "card-list__container--row" : ""}`}>
                <DragToScroll>
                    <Row>
                        {data.map((item, index) => (
                            <Col md={3} key={index} className="mt-4">
                                <Card className="position-relative card__item">
                                    <img alt="recommended" src={item.image_url[0]} />
                                    <div className="image-count position-absolute d-flex align-items-center">
                                        {item.image_count}
                                        <Image className="ms-1" color="#fff" />
                                    </div>
                                    <div className="p-3">
                                        <h6 className="card__title cursor-pointer" onClick={handleClickCard}>{item.title}</h6>
                                        <div className="mt-1">
                                            <b>{item.price}</b> - <b>{item.areaSize}</b>
                                        </div>
                                        <div>{item.location}</div>
                                        <div className="d-flex justify-content-between align-items-center mt-3">
                                            <span>{item.created_at}</span>
                                            <Button outline>{item.liked ? <HeartFill /> : <Heart />}</Button>
                                        </div>
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </DragToScroll>
            </div>
        </div>
    );
}

export default NewsCard;
