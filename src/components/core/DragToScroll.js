import React, { useEffect } from "react";

function DragToScroll(props) {
    const { children, containerRef, childrenClassName } = props;
    useEffect(() => {
        const preventClick = (e) => {
            e.preventDefault();
            e.stopImmediatePropagation();
        };
        let isDown = false;
        let isDragged = false;
        let startX;
        let scrollLeft;
        if (containerRef) {
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
    }, [containerRef, childrenClassName]);
    return <div>{children}</div>;
}

export default DragToScroll;
