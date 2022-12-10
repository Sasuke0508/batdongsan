import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Heart, HeartFill, Image } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { Button, ButtonGroup, Card, Col, Row } from "reactstrap";
import DragToScroll from "./DragToScroll";

function NewsCard(props) {
    const { data, wrapItem, title } = props;
    const navigate = useNavigate();
    const handleClickCard = () => {
        navigate("/post/1");
    };
    const containerRef = useRef();

    const handleClickNavButton = (type) => {
        const itemWidth = document.querySelector(".card__item-wrapper")?.clientWidth;
        if (type === "next") {
            containerRef.current.scrollLeft += itemWidth || 0;
        } else {
            containerRef.current.scrollLeft -= itemWidth || 0;
        }
    };

    return (
        <div>
            <div className="mt-5 d-flex align-items-center justify-content-between">
                {!!title && <h5>{title}</h5>}
                {wrapItem && (
                    <div className="d-flex">
                        <div>
                            <ButtonGroup>
                                <Button outline onClick={() => handleClickNavButton("prev")}>
                                    <ArrowLeft />
                                </Button>
                                <Button outline onClick={() => handleClickNavButton("next")}>
                                    <ArrowRight />
                                </Button>
                            </ButtonGroup>
                        </div>
                    </div>
                )}
            </div>
            <div className="news-card">
                <div className={`card-list__container ${wrapItem ? "card-list__container--row" : ""}`} ref={containerRef}>
                    <DragToScroll containerRef={containerRef.current} childrenClassName={"card__item-wrapper"}>
                    <Row>
                        {data.map((item, index) => (
                            <Col md={3} key={index} className="mt-4 card__item-wrapper" >
                                <Card className="position-relative card__item">
                                    <img alt="recommended" src={item.image_url[0]} />
                                    <div className="image-count position-absolute d-flex align-items-center">
                                        {item.image_count}
                                        <Image className="ms-1" color="#fff" />
                                    </div>
                                    <div className="p-3">
                                        <h6 className="card__title cursor-pointer" onClick={handleClickCard}>
                                            {item.title}
                                        </h6>
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
        </div>
    );
}

export default NewsCard;
