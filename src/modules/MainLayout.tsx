import React from "react";
import Counter from "../components/Counter";
import { Layout } from 'antd';
import { Outlet } from "react-router-dom";
import Loading from "../components/Loading";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../hooks";

const { Header, Content, Footer } = Layout;

const MainLayout: React.FC = () => {
    const state = useAppSelector(state => state.newsSlice)
    const location = useLocation()

    return (
        <Layout style={{height: '100vh'}}>
            <Header style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%' }}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%'}}>
                    <h1 style={{color: 'white'}}>News List</h1>
                    <Counter />
                </div>
            </Header>
            <Content
                className="site-layout"
                style={{ position: 'relative', padding: '24px 50px', height: '100%', backgroundColor: 'white', overflow: 'auto'}}>
                <Outlet />

                {state.isLoading && location.pathname === '/' && <Loading />}
            </Content>

            <Footer style={{ textAlign: 'center' }}>Vadzim Mikutsevich ©2023 Created by huge developer's mind</Footer>
        </Layout>
    );
};

export default MainLayout