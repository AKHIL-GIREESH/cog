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
            <div style={{width:"100%",border:"1px solid",display:"flex",flexDirection:"column",alignItems:"flex-start"}}>
                <div>
                    <h2 style={{textAlign:"left"}}>DROP YOUR VIEWS</h2>
                    <input type='text' placeholder='Type here' style={{padding:0,margin:0,width:"60vw",height:"5vh"}}/>
                    <button style={{height:"6vh",margin:0,padding:0,width:"3vw",borderRadius:"0 5px 5px 0"}}>🚀</button>
                </div>
                {comments.map(item => <p>{item.text}</p>)}
            </div>
        </div>
    )
}

export default Thread