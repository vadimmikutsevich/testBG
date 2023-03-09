import React, {useEffect, useState} from "react";
import { useAppSelector, useAppDispatch } from "../hooks";
import { Typography, Button } from 'antd';
import { fetchNews } from "../store/reducers/NewsSlice";

const { Text } = Typography;

const Counter = () => {
    const state = useAppSelector(state => state.newsSlice)
    const dispatch = useAppDispatch()
    const [counter, setCounter] = useState(60)

    useEffect(() => {
        if(state.news.length && counter >= 0) {
            const intervalId = setInterval(() => {
                setCounter(prev => prev - 1)
            }, 1000)

            if(counter === 0) {
                dispatch(fetchNews())
                setCounter(60)
            }

            return () => clearInterval(intervalId);
        }
    }, [counter, dispatch, state.news])

    const onRefresh = () => {
        dispatch(fetchNews())
        setCounter(60)
    }

    return (
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <Text style={{color: 'white', fontSize: '1.2rem', marginRight: '10px'}} strong>{counter} s</Text>

            <Button onClick={onRefresh} type="dashed" disabled={!state.news.length}>
                Refresh
            </Button>
        </div>
    )
}

export default Counter