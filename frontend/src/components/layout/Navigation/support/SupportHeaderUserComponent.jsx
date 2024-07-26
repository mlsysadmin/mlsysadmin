import React, { useEffect, useState } from 'react';

import TextBtn from '../../../custom/buttons/TextBtn.custom';
import { Button, Dropdown, Menu, Space } from 'antd';
import { CaretDownFilled, DownCircleFilled, DownOutlined } from '@ant-design/icons';
import { useAuth } from '../../../../Context/AuthContext';

const SupportHeaderUserComponent = () => {
    const { userDetails } = useAuth();
    const [ userName, setUserName ] = useState(null);
    
    useEffect(() => {
        if (userDetails) {
            const user = JSON.parse(userDetails);
            const user_name = `${user.last_name}, ${user.first_name} ${user.middle_name}`;

            setUserName(user_name);
        }
    }, [])
    

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
                    { userName }
                    <CaretDownFilled />
                </Space>
            </Dropdown>
        </>
    )
}

export default SupportHeaderUserComponent;