import React, { useContext, useState ,useEffect } from 'react'
import { store } from './taskApp'
import axios from 'axios'


function DisplayAllPost() {

   // const {allPostData,setAllPostData} = useContext(store)
    const [commentContent,setcommentContent] = useState({content:""})
     const [allPostData,setAllPostData] = useState([])
     const [allCommentsData,setAllComentsData] = useState([])
    //console.log(allPostData)
   // console.log(commentContent)

   useEffect(()=>{

    axios.get("https://swissmote-assignment.onrender.com/getAllEventsData").then((res)=>{
         //console.log(res.data.allPostsData)
         setAllPostData(res.data.allEventsData)
          setAllComentsData(res.data.allCommentsData)
    }).catch((err)=>{
        console.log(err)
    })
    
},[])


   const postCommentFun = (e,id)=>{
    e.preventDefault()
    let token = JSON.parse(sessionStorage.getItem("Token"))
    let headers = {
        "Authorization": `${token}`
    }

    if(token){
           axios.post(`https://swissmote-assignment.onrender.com/postComment/${id}`,commentContent,{headers}).then((res)=>{
                 console.log(res)
                 if(res.status==201){
                    setAllComentsData([res.data.CreatedCommentResult,...allCommentsData])
                    setcommentContent({content:""})
                 }
           }).catch((err)=>{
               console.log(err)
           })
    }else{
          alert("You Did Not Login Please Login")
    }

   }



  return (<>

<div className='displayallPostsContainer'>

<div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">

{allPostData.length>0 ? allPostData.map((post,index)=>{
     return(<>
      <div class="col">

<div class="card h-100">
{post.eventImage ? <img style={{height:"200px" ,width:"100%"}} src={post.eventImage} class="card-img-top" alt="..."/> : <img style={{height:"200px" ,width:"100%"}} src="" class="card-img-top placeholder"  alt=""/> } 
 <div class="card-body">
   <h4 class="card-title">{post.eventName}</h4>
   <p class="card-text">{post.eventDescription}</p>
   </div>
     <div className='CommentsContainer'>
          <h6 style={{textAlign:"center"}}>Comments</h6>
          <form onSubmit={(e)=>{postCommentFun(e,post._id)}} style={{width:"100%"}}>
          
          <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
          <input style={{width:"50%",padding:"15px"}} type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping" onChange={(e)=>{setcommentContent({content:e.target.value})}}/>
          <button type="submit"  style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "14px 6px", }}  class="btn btn-primary" >Comment</button>
          </div>
       
          </form>
                   <div>
                       {allCommentsData.map((comment,i)=>{
                                 if(comment.post_id==post._id){
                                    return <><div style={{margin:"5px 15px" ,borderRadius:"10px",border:"2px solid black",padding:"2px 20px"}}><b>User Name : {comment.username}</b><p>User Comment : {comment.content}</p></div></>
                                 }
                       })}
                   </div>
         
     </div>
</div>
</div>
     </>)
}) : "" }

</div>

</div>

  </>)
}

export default DisplayAllPost