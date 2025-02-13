import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { getAllThreads } from '../api/getAllThreads'
import Loading from '../components/Loading'
import Errorr from '../components/Error'
import ForumCard from '../components/forumCard'

export const Forum = () => {

    const [allForums,setAllForums] = useState([])
    
    const {data,isLoading,isError} = useQuery({
        queryKey:["allForums"],
        queryFn:getAllThreads
    })

    if(isLoading){
        return <Loading/>
    }

    if(isError){
        return <Errorr/>
    }

    console.log(data)

    return (
        <>
            {data.map(({name,upVotes,downVotes,modification}) => <ForumCard name={name} likes={upVotes} dislikes={downVotes} modification={modification}/>)}
        </>
        
    )
}
