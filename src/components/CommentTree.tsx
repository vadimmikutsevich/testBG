import React, {useCallback, useEffect, useState} from "react";
import { Tree, Button } from "antd";
import { CommentOutlined, DownOutlined, LoadingOutlined, ReloadOutlined, MessageOutlined } from "@ant-design/icons";
import { baseUrl } from "../store/reducers/NewsSlice";
import { CommentsTree } from "../models";
import { EventDataNode } from "antd/es/tree";

const CommentTree: React.FC<
    {ids: undefined | number[]}
> = ({ids}) => {
    const [comments, setComments] = useState<CommentsTree[]>([])
    const [refreshTree, setRefreshTree] = useState(false)

    const commentDataHandler = async (ids: number[]) => {
        const result = await Promise.all(
                    ids.map((id) => fetch(baseUrl + 'item/' + id + '.json?print=pretty')
                        .then((res) => res.json())
                        .then((data) => {
                            data.key = data.id
                            data.title = data.text
                            data.children = [{title: <LoadingOutlined />, key: 'loading-key' + data.id, kids: data.kids}]
                            data.isLeaf = data.kids ? false : true
                            return data
                        }))
                )
        return result
    }

    const initialComments = useCallback(async () => {
        setRefreshTree(false)
        if(ids && ids?.length) {

            setComments([{
                icon: <LoadingOutlined />,
                key: 'main',
                title: ids?.length && ids ? ids.length : 0,
                children: []
            }])

            const firstComments = await commentDataHandler(ids)
            
            setComments(prev => [{...prev[0], children: firstComments, icon: <CommentOutlined />}])
        } 
        setComments(prev => [{...prev[0], icon: <MessageOutlined /> }])
        setRefreshTree(true)
    }, [ids])

    useEffect(() => {
        setComments([])
        console.log('lox')
        initialComments()
    }, [initialComments, ids])

    const fetchComments = useCallback(async(node: EventDataNode<CommentsTree>) => {
        if(node.key === 'main') {
            return
        }      
        const newChildren = await commentDataHandler(node.children[0].kids)

        const findRecurse = (key: string | number, children: CommentsTree['children']) => {

            return children.map((comment) => {
                if(comment.key === key) {
                    comment.children = newChildren
                } else if(comment.hasOwnProperty('children')) {
                    findRecurse(key, comment.children as CommentsTree['children'])
                }

                return comment
            })
        }

        setComments(prev => [{...prev[0], children: findRecurse(node.key, prev[0].children), title: prev[0].title + newChildren.length}])
    }, [])

    return (
        <div style={{position: 'relative'}}>
            {refreshTree && (
            <Tree
                style={{marginTop: '40px'}}
                disabled={!ids}
                showIcon
                blockNode
                showLine
                autoExpandParent={false}
                defaultExpandAll={false}
                defaultExpandParent={false}
                loadData={fetchComments}
                switcherIcon={<DownOutlined />}
                treeData={comments}
                titleRender={
                    (node) => {
                        if(typeof node.title === 'string') {
                            return <div style={{display: 'inline-block'}} dangerouslySetInnerHTML={{ __html: node.title }}></div>
                        } else {
                            return node.title
                        }
                    } 
                }
                selectable={false}
            />
            )}

            <Button onClick={initialComments} disabled={!ids} type="dashed" style={{position: 'absolute', top: 0, right: 0}}>
                Refresh comments
                    <ReloadOutlined />
            </Button>
        </div>
    )
}

export default CommentTree