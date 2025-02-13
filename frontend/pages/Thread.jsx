import React from 'react'
import Loading from '../components/Loading';
import Errorr from '../components/Error';
import { getThread } from '../api/getThread';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

const Thread = () => {
    const { name } = useParams();

    const {data,isLoading,isError} = useQuery({
        queryKey:["allForums"],
        queryFn:() => getThread(name)
    })

    if(isLoading){
        return <Loading/>
    }

    if(isError){
        return <Errorr/>
    }

    const {modification,downVotes,upVotes,comments} = data[0]

    return (
        <div style={{minHeight:"100vh", width:"80vw"}}>
            <div style={{display:"flex",border:"1px solid", width:"80vw",justifyContent:"space-between"}}>
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
            <div>
                <input type='text'/>
                {comments.map(item => <p>{item.text}</p>)}
            </div>
        </div>
    )
}

export default Thread