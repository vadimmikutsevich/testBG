import React, {useEffect} from "react";
import { useAppSelector, useAppDispatch } from "../hooks";
import { fetchNews } from "../store/reducers/NewsSlice";

const MainLayout = () => {
    const state = useAppSelector(state => state.newsSlice)
    const dispatch = useAppDispatch()

    useEffect(() => {
        // dispatch(fetchNews())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <></>
    )
}

export default MainLayout