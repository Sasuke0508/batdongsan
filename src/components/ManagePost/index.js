import { Navigate, Route, Routes } from "react-router-dom";
import { Col, Row } from "reactstrap";
import CreateNewPost from "./CreateNewPost";
import ListPost from "./ListPost";
import SideMenu from "./SideMenu";
import UserInfo from "./UserInfo";

function CreatePost(props) {
    return (
        <div className="manager-post">
            <Row className="w-100">
                <Col md={2} className="side-bar">
                    <div className="side-bar__container">
                        <UserInfo />
                        <SideMenu />
                    </div>
                </Col>
                <Col md={10}>
                    <Routes>
                        <Route path="/create-new-post" element={<CreateNewPost />} />
                        <Route path="/list-post" element={<ListPost />} />
                        <Route path="*" element={<Navigate to="create-new-post" />} />
                    </Routes>
                </Col>
            </Row>
        </div>
    );
}

export default CreatePost;
