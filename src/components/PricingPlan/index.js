import React, { useState } from "react";
import { Fonts, List } from "react-bootstrap-icons";
import { Button } from "reactstrap";
import { postTypePlan } from "../../constants";
import { formatCurrency } from "../../utils";
function PricingPlan(props) {
    const [postPlan, setPostPlan] = useState(1);
    const handleClickPostPlan = (id) => {
        setPostPlan(id);
    };
    return (
        <div className="container-sm pricing-plan p-5 mt-2">
            <div className="d-flex post-plan__container mt-2">
                {postTypePlan.map((plan, index) => (
                    <div
                        style={{ flex: "1" }}
                        className={`post-plan__item has-border text-center cursor-pointer mx-3 p-2 ${postPlan === index ? "post-plan__item--selected" : ""}`}
                        key={index}
                        onClick={() => handleClickPostPlan(index)}
                    >
                        <div className={`mt-2 plan__tag plan__tag--${index}`}>X{plan.performance} hiệu quả</div>
                        <h6 className="mb-4 mt-3">{plan.title}</h6>
                        <Button color="info" outline={postPlan !== plan.id}>
                            {postPlan !== plan.id ? "Chọn" : "Đã chọn"}
                        </Button>
                        <hr />
                        <Fonts />
                        <div>
                            Tiêu đề chữ {plan.id > 1 ? "hoa" : "thường"} <span style={{ color: plan.titleColor.color }}>{plan.titleColor.label}</span>
                        </div>
                        <hr />
                        <List />
                        <div style={{ minHeight: "52px" }} className="mt-3">
                            {plan.position}
                        </div>
                        <hr />
                        <div className="mt-3">{plan.postDays}</div>
                        <hr />
                        <div className="mt-3 pb-3">
                            Từ{" "}
                            <b>
                                {formatCurrency(plan.price)}đ <br />
                            </b>
                            ngày
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PricingPlan;
