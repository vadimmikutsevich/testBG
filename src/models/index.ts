export interface News {
    id: number
    by: string
    descendants: number
    score: number
    time: number
    title: string
    type: string
    url: string
}

export interface NewsSlice {
    isLoading: boolean
    news: News[]
}