import { Layout } from 'antd';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { MainLayout } from '../components';
import { Content } from 'antd/es/layout/layout';


const MainOutlet = () => {
  return (
    <>
      <Layout>
        <MainLayout />
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </>
  )
}

export default MainOutlet