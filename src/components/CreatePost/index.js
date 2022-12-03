import React from "react";
import { Col, Row } from "reactstrap";
import SideMenu from "./SideMenu";
import UserInfo from "./UserInfo";

function CreatePost(props) {
    return (
        <div className="create-post">
            <Row className="w-100">
                <Col md={2} className="side-bar">
                    <UserInfo />
                    <SideMenu />
                </Col>
                <Col md={10}></Col>
            </Row>
        </div>
    );
}

export default CreatePost;
