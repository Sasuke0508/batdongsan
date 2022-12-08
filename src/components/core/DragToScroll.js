import React, { useRef, useState } from "react";

function DragToScroll(props) {
    const ref = useRef();
    const [xPosition, setXPosition] = useState(0);
    const handleMouseDown = (e) => {
        if (e.clientX !== 0) {
            setXPosition(e.pageX);
        }
    };
    const handleDrag = (e) => {
        let scrollValue = e.pageX - xPosition;
        if (e.clientX !== 0) {
            props.containerRef.current.scrollLeft -= scrollValue;
        }
    };

    return (
        <div onMouseDown={handleMouseDown} onDrag={handleDrag} ref={ref}>
            {props.children}
        </div>
    );
}

export default DragToScroll;
