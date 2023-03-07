import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchNews = createAsyncThunk(
    'news/fetchNews',
    async (_, { rejectWithValue }) => {
        try {
        const response = await fetch('')

        const data = await response.json()
        return data.data

        } catch(e) {
            return rejectWithValue(e)
        }
    }
)

const initialState = {
    news: [],
    isLoading: false,
    globalCounter: 0
}

const newsSlice = createSlice({
    name: 'ships',
    initialState,
    reducers: {
        repeatFetchNews(state) {
            
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchNews.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(fetchNews.fulfilled, (state, action) => {
            
            state.isLoading = false
        })
        builder.addCase(fetchNews.rejected, (state) => {
            state.isLoading = false
        })
    }
})

export const {repeatFetchNews} = newsSlice.actions

export default newsSlice.reducer