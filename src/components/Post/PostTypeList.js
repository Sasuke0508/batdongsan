import { useEffect, useState } from "react";
import { Button } from "reactstrap";
import { postTypeService } from "../../services";
import { formatCurrency } from "../../utils";

function PostTypeList({setPostPlan, postPlan}) {

    useEffect(() => {
        loadPostType();
    }, []);

    const [postTypes, setPostTypes] = useState([]);

    const loadPostType = async () => {
        const result = await postTypeService.findAll();
        setPostTypes(result.data);
        setPostPlan(postPlan ?? result.data[0]);
    }

    return (
        <div className='d-flex post-plan__container mt-2'>
            {postTypes.map((plan) => (
                <div
                    style={{ flex: "1" }}
                    className={`post-plan__item text-center cursor-pointer p-2 ${postPlan.id === plan.id ? "post-plan__item--selected" : ""}`}
                    key={plan.id}
                    onClick={() => setPostPlan(plan)}
                >
                    <h6 className="mb-4 mt-3">{plan.type}</h6>
                    <Button color="info" outline={postPlan.id !== plan.id}>
                        {postPlan.id !== plan.id ? "Chọn" : "Đã chọn"}
                    </Button>
                    <div style={{ minHeight: "52px" }} className="mt-3">
                        Độ ưu tiên: {plan.priority}
                    </div>
                    <hr />
                    <div className="mt-3">{plan.duration} ngày</div>
                    <hr />
                    <div className="mt-3 pb-3">
                        <b>
                            {formatCurrency(plan.price)}đ <br />
                        </b>
                    </div>
                </div>
            ))}
        </div>
    )

}
export default PostTypeList;