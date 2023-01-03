import { useEffect, useState } from "react";

function usePaging(_paging) {

    const [paging, setPaging] = useState(_paging);
    const [totalPage, setTotalPage] = useState(0);
    useEffect(() => {
        paging && setTotalPage(Math.ceil(paging.total / paging.size));
    }, [paging]);

    return {
        ...paging,
        totalPage,
        setPaging,
        pages: Array(totalPage || 0).fill(0).map((value, index) => index + 1),
    }
}

export default usePaging;