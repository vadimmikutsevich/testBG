import React, {useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeftOutlined, SwapRightOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";
import { News } from "../models";

const { Text } = Typography;

const NewsItem = () => {
    const data: News = useLocation().state
    const navigate = useNavigate()

    useEffect(() => {
        if(!data) {
            toRootPath()
        }
    }, [data])

    const toRootPath = () => {
        navigate('/')
    }

    console.log(data)

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

            <div>

            </div>
        </div>
    )
}

export default NewsItem