import React, { useState } from 'react'

const Comment = ({addComment}) => {

    const [comment,setComment] = useState("")
    console.log(comment)
  return (
    <div>
        <h2 style={{textAlign:"left"}}>DROP YOUR VIEWS</h2>
        <input value={comment} onChange={(e) => setComment(e.target.value)} type='text' placeholder='Type here' style={{padding:0,margin:0,width:"60vw",height:"5vh"}}/>
        <button style={{height:"6vh",margin:0,padding:0,width:"3vw",borderRadius:"0 5px 5px 0"}} onClick={() => addComment({user:"user1",text:comment})}>🚀</button>
    </div>
  )
}

export default Comment