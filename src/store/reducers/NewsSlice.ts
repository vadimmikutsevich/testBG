import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { News, NewsSlice } from "../../models";

export const baseUrl = 'https://hacker-news.firebaseio.com/v0/'
const limit100 = '&limitToFirst=100'
const orderBySort = '&orderBy="$key"'

export const fetchNews = createAsyncThunk(
    'news/fetchNews',
    async (_, { rejectWithValue }) => {
        try {
        const response: Response = await fetch(baseUrl + 'newstories.json?print=pretty' + orderBySort + limit100)

        const data: number[] = await response.json()

        const items = await Promise.all(
            data.map((id) => fetch(baseUrl + 'item/' + id + '.json').then((res) => res.json()))
        )
        return items

        } catch(e) {
            return rejectWithValue(e)
        }
    }
)

const initialState: NewsSlice = {
    news: [],
    isLoading: false,
}

const newsSlice = createSlice({
    name: 'ships',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchNews.pending, (state) => {
            state.news = []
            state.isLoading = true
        })
        builder.addCase(fetchNews.fulfilled, (state, action) => {
            state.news = action.payload as News[]
            state.isLoading = false
        })
        builder.addCase(fetchNews.rejected, (state) => {
            console.log('Error fetch news')

            state.isLoading = false
        })
    }
})

// export const {} = newsSlice.actions

export default newsSlice.reducer