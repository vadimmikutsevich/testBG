import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks";
import { FireOutlined } from "@ant-design/icons";
import { Card, List, Typography } from 'antd';
import { News } from "../models";

const { Text } = Typography;

const NewsList: React.FC = () => {
    const navigate = useNavigate()
    const state = useAppSelector(state => state.newsSlice)

    const onItemClick = (item: News) => navigate('/' + item.id, {state: item})

    return (
        <List
            grid={{
                gutter: 16,
                xs: 1,
                sm: 1,
                md: 1,
                lg: 1,
                xl: 1,
                xxl: 3,
            }}
            style={{
                maxWidth: '75%',
                margin: 'auto',
            }}
            dataSource={state.news}
            renderItem={(item) => (
                <List.Item key={item.id} style={{cursor: 'pointer'}} onClick={() => onItemClick(item)}>
                    <Card
                        hoverable
                        extra={
                            <>
                                <Text strong type="danger" style={{marginRight: '8px'}}>{item.score}</Text>
                                <FireOutlined style={{color: 'orange', fontSize: '1.2rem'}}/>
                            </>
                        }
                        title={item.title}>
                        <p style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap'}}>
                            <Text italic>by {item.by}</Text>
                            <Text type="secondary">{new Date(item.time * 1000).toUTCString().replace('GMT', '')}</Text>
                        </p>
                    </Card>
                </List.Item>
            )}
        />
    )
}   

export default NewsList