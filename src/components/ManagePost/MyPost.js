import React, { useEffect, useState } from "react";
import { Calendar, Filter, Search, Sliders } from "react-bootstrap-icons";
import { Button, Input } from "reactstrap";
import { postService } from "../../services";
import Select from "../core/Select";
import ListPostItem from './ListPostItem'

const daysOption = [
    { label: "Mặc định", value: '' },
    { label: "1 tuần qua", value: 7 },
    { label: "30 ngày qua", value: 30 },
];

const postTypes = [
    { label: "Tất cả", value: "" },
    { label: "Hết hạn", value: "EXPIRED" },
    { label: "Đang hiển thị", value: "ACTIVE" },
    { label: "Chờ duyệt", value: "INACTIVE" },
    { label: "Không duyệt", value: "REJECT" },
    { label: "Đã hạ", value: "HIDDEN" },
];

function MyPost(props) {

    const [filter, setFilter] = useState({
        text: "",
        days: '',
        type: "",
    });
    const [paging, setPaging] = useState({
        pageNumber: 1,
        total: 0,
        size: 16
    });
    const [listPost, setListPost] = useState([]);
    const [sort, setSort] = useState('-');
    const [pages, setPages] = useState([]);

    const handleSearchPost = async () => {
        try {

            const result = await postService.findAll({
                page: paging.pageNumber,
                limit: 16,
            }, {
                keyWord: filter.text,
                day: filter.days,
                status: filter.type,
                sort: `${sort}created`
            })
            setListPost(result.data.content);
            setPaging(result.data.paging);
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        handleSearchPost();
    }, [filter.type, sort, paging.pageNumber])

    useEffect(() => {
        const numberPage = Math.ceil(paging.total / paging.size);
        setPages(Array.from({ length: numberPage }, (_, i) => i + 1));
    }, [paging]);

    const handleChangeFilter = (type, value) => {
        setFilter({
            ...filter,
            [type]: value,
        });
    };

    const checkSelectedType = (value) => filter.type === value;

    const handleClickType = (value) => {
        setFilter({
            ...filter,
            type: value,
        });
    };

    const handleGoToPage = (page) => {
        setPaging({
            ...paging,
            pageNumber: page
        });
    }

    const handleNextPage = () => {
        if (paging.pageNumber === pages.length) return;
        handleGoToPage(paging.pageNumber + 1);
    }

    const handlePreviousPage = () => {
        if (paging.pageNumber == 1) return;
        handleGoToPage(paging.pageNumber - 1);
    }

    return (
        <div className="list-post">
            <div className="list__header bg-white mt-2 p-5 pb-1">
                <h3>Danh sách tin</h3>
                <div className="d-flex align-items-center mt-3">
                    <div className="d-flex align-items-center me-2">
                        <Button outline onClick={handleSearchPost}>
                            <Search />
                        </Button>
                        <Input value={filter.text} onChange={(e) => handleChangeFilter("text", e.target.value)} placeholder="Theo mã tin, tiêu đề" />
                    </div>
                    <div className="d-flex align-items-center me-2 w-25">
                        <Button outline disabled>
                            <Calendar />
                        </Button>
                        <Select options={daysOption} value={filter.days} onChange={(e) => handleChangeFilter("days", e.target.value)} />
                    </div>
                </div>
                <div className="list__type mt-3 d-flex">
                    {postTypes.map((item, index) => (
                        <div
                            className={`type__item ${checkSelectedType(item.value) ? "type__item--selected" : ""} cursor-pointer p-2 mx-1`}
                            key={index}
                            onClick={() => handleClickType(item.value)}
                        >
                            {item.label}
                        </div>
                    ))}
                </div>
            </div>
            <div className="list__content px-5">
                <div className="content__action d-flex justify-content-between my-2">
                    <div className="d-flex align-items-center">
                        <Input className="me-2" type="checkbox" />
                        <label>Chọn tất cả</label>
                    </div>
                    <div className="d-flex align-items-center">
                        <Button outline onClick={() => setSort(sort === '+' ? '-' : '+')}>
                            <Filter className="me-2" />
                            Sắp xếp
                        </Button>
                    </div>
                </div>
                <div className="mt-3">
                    <ListPostItem 
                        postList={listPost} 
                        pages={pages}
                        first={() => handleGoToPage(1)}
                        last={() => handleGoToPage(pages.length)}
                        next={handleNextPage}
                        previous={handlePreviousPage}
                        goToPage={handleGoToPage}
                    />
                </div>
            </div>
        </div>
    );
}

export default MyPost;