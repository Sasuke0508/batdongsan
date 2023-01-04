import React, { useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight } from "react-bootstrap-icons";
import { Button, ButtonGroup } from "reactstrap";

function DragToScroll(props) {
    const { active, enableNav, children, childrenClassName, title } = props;
    const containerRefWrapper = useRef();
    useEffect(() => {
        const containerRef = containerRefWrapper.current;
        const preventClick = (e) => {
            e.preventDefault();
            e.stopImmediatePropagation();
        };
        let isDown = false;
        let isDragged = false;
        let startX;
        let scrollLeft;
        if (containerRef && active) {
            containerRef.addEventListener("mousewheel", (e) => {
                containerRef.classList.add("scroll-smooth");
                containerRef.scrollLeft -= e.deltaY * 3;
                e.preventDefault();
            });
            containerRef.addEventListener("mousedown", (e) => {
                isDown = true;
                containerRef.classList.remove("scroll-smooth");
                startX = e.pageX - containerRef.offsetLeft;
                scrollLeft = containerRef.scrollLeft;
            });
            containerRef.addEventListener("mouseleave", () => {
                isDown = false;
                containerRef.classList.add("scroll-smooth");
            });
            containerRef.addEventListener("mouseup", (e) => {
                isDown = false;
                const elements = document.querySelectorAll(childrenClassName);
                if (isDragged) {
                    for (let i = 0; i < elements.length; i++) {
                        elements[i].addEventListener("click", preventClick);
                    }
                } else {
                    for (let i = 0; i < elements.length; i++) {
                        elements[i].removeEventListener("click", preventClick);
                    }
                }
                containerRef.classList.add("scroll-smooth");
                isDragged = false;
            });
            containerRef.addEventListener("mousemove", (e) => {
                if (!isDown) return;
                isDragged = true;
                e.preventDefault();
                const x = e.pageX - containerRef.offsetLeft;
                const walk = (x - startX) * 2;
                containerRef.scrollLeft = scrollLeft - walk;
            });
        }
    }, [childrenClassName, containerRefWrapper.current]);
    const handleClickNavButton = (type) => {
        const itemWidth = document.querySelector(".card__item-wrapper")?.clientWidth;
        if (type === "next") {
            containerRefWrapper.current.scrollLeft += itemWidth || 0;
        } else {
            containerRefWrapper.current.scrollLeft -= itemWidth || 0;
        }
    };

    return (
        <div>
            <div className="d-flex align-items-center justify-content-between">
                {!!title && <h5>{title}</h5>}
                {enableNav && (
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
            <div className={`${active ? "overflow-x-scroll" : ""}`} ref={containerRefWrapper}>
                {children}
            </div>
        </div>
    );
}

export default DragToScroll;
