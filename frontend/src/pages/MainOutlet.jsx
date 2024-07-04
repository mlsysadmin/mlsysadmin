import { Layout } from 'antd';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Layout, { Content } from 'antd/es/layout/layout';
import { MainLayout } from '../components';


const MainOutlet = () => {
  return (
    <Layout>
        <MainLayout/>
        <Content>
            <Outlet/>
        </Content>
    </Layout>
  )
}

export default MainOutlet