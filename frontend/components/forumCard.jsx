import { Link } from "react-router-dom"

const ForumCard = ({name,likes,dislikes,modification}) => {
  return (
    <Link to={`./${name}`} style={{color:"white"}}>
        <div style={{border:"1px solid grey",width:"60vw",padding:"1vh 2.5vw",display:"flex",justifyContent:"space-between",borderRadius:"10px"}}>
            <div style={{display:"flex",alignItems:"center",gap:30}}>
                <p style={{fontSize:"2rem",margin:0,padding:0,textTransform:"uppercase",fontWeight:800}}>{name}</p>
                <p style={{padding:"5px 10px",color:"black",borderRadius:"5px",backgroundColor:modification?"orange":"green"}}>#{modification?"Change Request":"Addition Request"}</p>
            </div>
            <div>
                <p>{likes}👍</p>
                <p>{dislikes}👎</p>
            </div>
        </div>
    </Link>
  )
}

export default ForumCard