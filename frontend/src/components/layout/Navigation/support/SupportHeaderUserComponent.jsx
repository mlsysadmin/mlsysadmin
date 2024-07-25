import React, { useState } from 'react';

import TextBtn from '../../../custom/buttons/TextBtn.custom';
import { Button, Dropdown, Menu, Space } from 'antd';
import { CaretDownFilled, DownCircleFilled, DownOutlined } from '@ant-design/icons';

const SupportHeaderUserComponent = () => {

    const MenuItems = [
        {
            label: "Logout",
            key: "logout",
        },
    ]

    const MenuProps = {
        items: MenuItems
    }

    return (
        <>
            <Dropdown
                menu={MenuProps}
                trigger={['click']}
                className='header-user--profile'
            >
                <Space>
                    Ran Takahashi
                    <CaretDownFilled />
                </Space>
            </Dropdown>
        </>
    )
}

export default SupportHeaderUserComponent;