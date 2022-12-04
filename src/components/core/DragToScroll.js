import React, { useRef } from "react";

function DragToScroll(props) {
    // const { props.children } = props;
    let isDown = false;
    let startX;
    let scrollLeft;
    const ref = useRef();

    return <div onMouseDown={e => console.log(e)} onScroll={e=> console.log(e)} onDrag={e => console.log(e)} ref={ref}>{props.children}</div>;
}

export default DragToScroll;
