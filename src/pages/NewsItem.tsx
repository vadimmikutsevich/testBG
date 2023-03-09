import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeftOutlined, SwapRightOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";
import CommentTree from "../components/CommentTree";
import { News } from "../models";

const { Text } = Typography;

const NewsItem = () => {
    const data: News = useLocation().state
    const navigate = useNavigate()

    const toRootPath = () => {
        navigate('/')
    }

    return (
        <div>
            <Button type="default" onClick={toRootPath}>
                <ArrowLeftOutlined />
            </Button>
            <h2>{data.title}</h2>
            <h4>
                <a href={data.url} target="_blank" rel="noreferrer" style={{fontSize: '1rem'}}>
                    link to source
                    <SwapRightOutlined style={{color: 'blue'}}/>
                </a>
            </h4>

            <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
                <p style={{marginRight: '5%'}}><Text italic>by {data.by}</Text></p>
                <p><Text type="secondary">{new Date(data.time * 1000).toUTCString().replace('GMT', '')}</Text></p>
            </div>
            <CommentTree ids={data.kids}/>
        </div>
    )
}

export default NewsItem