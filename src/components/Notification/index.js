import React from "react";
import { ArrowRight } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { notiList } from "../../constants";
import useClickOutside from "../core/useClickOutside";

function Notification({ open, setOpen }) {
    const navigate = useNavigate()

    const handleClickViewMore = () => {
        setOpen(false)
        navigate('/post/saved')
    }
    const closeModal = () => {
        setOpen(false)
    }
    const ref = useClickOutside(closeModal)

    return (
        open && (
            <div ref={ref} className="notification p-2 bg-white position-absolute">
                <h6 className="mt-2 text-center">Thông báo</h6>
                <hr />
                <div className="noti__list">
                    {notiList.map((item, index) => (
                        <div className="noti__item py-2" key={index}>
                            <div className="p-2 d-flex justify-content-between">
                                <div className="noti__text">{item.title}</div>
                                <div className="noti__date">{item.date}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-2 text-center noti__view-more p-2" onClick={handleClickViewMore}>
                    Xem tất cả <ArrowRight />
                </div>
            </div>
        )
    );
}

export default Notification;
