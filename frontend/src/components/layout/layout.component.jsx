import React, { useState } from 'react';
import HeaderContainer from './Navigation/HeaderContainer';
import SideBar from './Navigation/SideBar';
import { Layout } from 'antd';

const MainLayout = () => {

    const [openDrawer, setOpenDrawer] = useState(false)

    const showDrawer = () => {
        console.log("sadsf");
        setOpenDrawer(true)
    }

    const onClose = () => {
        setOpenDrawer(false);
    };

    return (
        <>
            <HeaderContainer showDrawer={showDrawer}/>
            <Layout>
                <SideBar openDrawer={openDrawer} onClose={onClose}/>
            </Layout>
        </>
    )
}

export default MainLayout