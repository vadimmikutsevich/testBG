import {ReactElement} from "react"

export interface News {
    id: number
    by: string
    descendants: number
    score: number
    time: number
    title: string
    type: string
    url: string,
    kids?: number[]
}

export interface Comment {
    by: string
    id: number | string
    kids: number[]
    parent: number
    text: string
    time: number
    type: string

    key?: string
    title?: string
    children?: CommentsTree[] 
}

export interface CommentsTree {
    key: string | number
    title: number
    icon?: ReactElement
    selectable?: boolean
    children: [] | Comment[]
}

export interface NewsSlice {
    isLoading: boolean
    news: News[]
}