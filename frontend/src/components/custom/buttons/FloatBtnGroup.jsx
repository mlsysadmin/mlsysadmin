import React from "react";
import { MoreOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";

import '../../../styles/floatBtnGroup.css';

const FloatBtnGroup = ({children}) => {
    return (
        <div className="float-btn-group">
            <FloatButton.Group
                // trigger="click"
                type="primary"
                style={{
                    insetInlineEnd: 24,
                }}
                // icon={<MoreOutlined />}
                className="float__btn-group"
                shape="circle"
            >
                {
                    children
                }
            </FloatButton.Group>
        </div>
    )
}

export default FloatBtnGroup;