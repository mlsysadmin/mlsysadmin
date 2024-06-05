import React from 'react';
import { Outlet } from 'react-router-dom';
import { MainLayout } from '../components';
import { Layout } from 'antd';

const { Content } = Layout

const MainOutlet = () => {
  return (
    <>
    <Layout>
        <MainLayout/>
        <Content>
            <Outlet/>
        </Content>
    </Layout>
    </>
  )
}

export default MainOutlet