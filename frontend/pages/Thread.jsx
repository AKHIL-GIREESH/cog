import React from 'react'
import Loading from '../components/Loading';
import Errorr from '../components/Error';
import { getThread } from '../api/getThread';
import { useQuery,useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import Comment from '../components/Comment';
import { editThread } from '../api/editThread';

const Thread = () => {
    const { name } = useParams();

    const {data,isFetching,isError,refetch} = useQuery({
        queryKey:["allForums"],
        queryFn:() => getThread(name)
    })

    const {mutate:addComment,isLoading} = useMutation({
        mutationFn: async (param) => {
                let addedComment = await editThread(name,param)
                if(addedComment){
                    refetch()
                }
                
        }
    })


    if(isFetching){
        return <Loading/>
    }

    if(isError){
        return <Errorr/>
    }



    const {modification,downVotes,upVotes,comments} = data[0]

    return (
        <div style={{minHeight:"100vh", width:"80vw"}}>
            <div style={{display:"flex", width:"80vw",justifyContent:"space-between"}}>
                <div>
                    <p style={{fontSize:"5rem",padding:0,margin:0,textTransform:"uppercase",fontWeight:800}}>{data[0].name}</p>
                    <div style={{display:"flex",gap:"50px"}}>
                        <p style={{fontSize:"2rem"}}>{upVotes} 👍</p>
                        <p style={{fontSize:"2rem"}}>{downVotes} 👎</p>
                    </div>
                </div>
                <div>
                    <p style={{padding:"5px 10px",color:"black",borderRadius:"5px",backgroundColor:modification?"orange":"green"}}>#{modification?"Change Request":"Addition Request"}</p>
                </div>

            </div>
            <div style={{width:"100%",display:"flex",flexDirection:"column",alignItems:"flex-start"}}>
                <Comment addComment={addComment}/>
                {comments.map(item => <p>{item.user} : {item.text}</p>)}
            </div>
        </div>
    )
}

export default Thread