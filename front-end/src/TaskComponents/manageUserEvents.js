import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { store } from './taskApp'

function ManageUserPost() {

  const {LoginStatus, setLoginStatus} = useContext(store)

  useEffect(()=>{
    let token = JSON.parse(sessionStorage.getItem("Token"))
     
      let headers = {
          "Authorization": `${token}`
      }
      if(token){
        axios.get("https://swissmote-assignment.onrender.com/getLoginUserEventsData",{headers}).then((res)=>{
          setUserPostsData(res.data.userEventsData )
         // console.log(res.data.userPostsData)
        })
      }
  },[])


  
  const [postData , setPostData] = useState({eventName:"",eventDescription:"",eventImage:""})
  const [postStatus,setPostStatus] = useState()
  const [postBtnStatus,setBtnStatus] = useState()
  const [userPostsData, setUserPostsData] = useState([])
  const [deleteBtnStatus,setDeleteBtnStatus] = useState()
  const [editPostData, setEditPostData] = useState();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false); 
  const [imageFile,setImageFiles] = useState({Photo:""})
  const [fileSizeError,setFileSizeError] = useState()
  

  const handleChangeImage = (field,value)=>{
    setFileSizeError()
  //  console.log(value)
    if(value.size <= 262144){
         
 //   console.log(value)
    setImageFiles({[field]:value})
    }else{
      setFileSizeError(true)
      setTimeout(()=>{
        setFileSizeError()
      },2000)
     
       setImageFiles({Photo:""})
       
    }
  }
         


  const handleChange = (field,value)=>{
        setPostData({...postData,[field]:value})
  }

  const createPostFun = async(e)=>{
      e.preventDefault()
      setBtnStatus(true)
      setPostStatus()
      let token = JSON.parse(sessionStorage.getItem("Token"))
      //console.log(token)
      let headers = {
          "Authorization": `${token}`
      }


      if(imageFile.Photo){
    
     
          
            const imageFormData = new FormData()
           imageFormData.append('file', imageFile.Photo);
          imageFormData.append('upload_preset', 'myrr_image_upload');
     
         let imageURL= await axios.post('https://api.cloudinary.com/v1_1/dvfy5rpzk/image/upload', imageFormData).then((res)=>{
           return res.data.secure_url
          
          })
          //  console.log(imageURL)
          setPostData((prevData)=> ({...prevData,Photo:imageURL}))
           
           axios.post("https://swissmote-assignment.onrender.com/createEvent",{...postData,eventImage:imageURL},{headers}).then((res)=>{
            console.log(res)
               if(res.status==201){
                setPostData({eventName:"",eventDescription:"",eventImage:""})
                setImageFiles({Photo:""})
                setUserPostsData([res.data.newEventResult,...userPostsData])
                console.log(res.data.newEventResult)
                setBtnStatus()
                setPostStatus("Post Created Successfully")
                setTimeout(()=>{
                  setPostStatus()
                },3000)
               }     
          }).catch((err)=>{
              console.log(err)
              setBtnStatus()
              setPostStatus()
          })
        
      }else{

      axios.post("https://swissmote-assignment.onrender.com/createEvent",postData,{headers}).then((res)=>{
        console.log(res)
           if(res.status==201){
            setPostData({eventName:"",eventDescription:"",eventImage:""})
            setImageFiles({Photo:""})
            setUserPostsData([res.data.newEventResult,...userPostsData])
            setBtnStatus()
            setPostStatus("Post Created Successfully")
            setTimeout(()=>{
              setPostStatus()
            },3000)
           }     
      }).catch((err)=>{
          console.log(err)
          setBtnStatus()
          setPostStatus()
      })
    }
 }


 const deletePostFun = (id)=>{
            
      axios.delete(`https://swissmote-assignment.onrender.com/deleteUserEvent/${id}`).then((res)=>{
             // console.log(res)
            if(res.status==201){
              setDeleteBtnStatus()
              setUserPostsData((prev)=> prev.filter((post,i)=> post._id!=id))
            }
      }).catch((err)=>{
              console.log(err)
              setDeleteBtnStatus()
      })

 }

//  Edit  Part       

 const editPostFun = (post) => {
  setEditPostData(post);
  setIsEditModalVisible(true);
};

const handleEditChange = (field, value) => {
  setEditPostData({ ...editPostData, [field]: value });
};

const updatePostFun = (e) => {
  e.preventDefault();
  let token = JSON.parse(sessionStorage.getItem("Token"))
  let headers = {
      "Authorization": `${token}`
  }

  axios.put("https://swissmote-assignment.onrender.com/editUserEvent",editPostData,{headers}).then((res)=>{
       if(res.status==201){
        setUserPostsData((prev)=>prev.map((post,i)=> post._id === editPostData._id ? res.data.editedeventData : post ));
        setIsEditModalVisible(false);
        setEditPostData()
    }
  }).catch((err)=>{
       console.log(err)
  })


}



  return (
    
  <>
     {LoginStatus ? <>
   <div className='CreatePostContainer'>

       <h3>Create Your Event</h3>
      <div className='createPostInputDiv'>
        <form onSubmit={createPostFun}>
       <input type="text" class="form-control" placeholder="Event Name"  aria-describedby="addon-wrapping" required onChange={(e)=>{handleChange("eventName",e.target.value)}} value={postData.eventName}/>
       <textarea type='text' class="form-control postBody" placeholder="Event Description" aria-describedby="addon-wrapping" required onChange={(e)=>{handleChange("eventDescription",e.target.value)}} value={postData.eventDescription}/>
       <div style={{textAlign:"center"}}>
        <label>Event Image:</label>
            <input  type="file" accept="image/*" files = {imageFile.Photo}  onChange={(e)=>handleChangeImage("Photo",e.target.files[0])}/>
             {fileSizeError ? <b>Min File Size 256KB</b> :""}
             </div> 
      
       {postBtnStatus ? <button class="btn btn-primary" type="button" disabled>
  <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
  <span role="status">Loading...</span>
  
</button> : <button type="submit button" class="btn btn-primary">Create Event</button> } 
     <br></br>
     {postStatus ? <b>{postStatus}</b> : ""}
       </form>
       </div>
     </div>


     <div className='displayUserPostsContainer'>

     <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3  g-4">

  {userPostsData.length>0 ? userPostsData.map((post,index)=>{
          return(<>
           <div class="col">
    <div class="card h-100" aria-hidden="true">
   {post.eventImage ? <img style={{height:"200px" ,width:"100%"}} src={post.eventImage} class="card-img-top" alt="..."/> : <img style={{height:"200px" ,width:"100%"}} src="" class="card-img-top placeholder"  alt=""/> } 
      <div class="card-body">
        <h4 style={{color:"Highlight",textShadow: "2px 2px 5px rgba(0, 0, 0, 0.7)"}} class="card-title">{post.eventName}</h4>
        <p style={{color:"Highlight",textShadow: "2px 2px 5px rgba(0, 0, 0, 0.7)"}} class="card-text">{post.eventDescription}</p>
        <div style={{display:"flex",justifyContent:"space-around"}}>
       { post._id == deleteBtnStatus ? <button class="btn btn-primary" type="button" disabled>
  <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
  <span role="status">Deleting...</span>
</button> : <button type="button" class="btn btn-primary" onClick={()=>{deletePostFun(post._id);setDeleteBtnStatus(post._id)}}>Delete</button>}

<button type='button' className='btn btn-warning' onClick={() =>{ editPostFun(post)}}> Edit</button>
        </div>
      </div>
    </div>
  </div>
          </>)
  }) : "" }
 
  </div>

     </div></> : <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"}}><h1>Please Login</h1></div>}

   

   {isEditModalVisible ? 
    <div className='editPostModal'>
    <div className='modalContent'>
      <h3>Edit Post</h3>
      <form onSubmit={updatePostFun}>
        <input
          type='text'
          className='form-control'
          placeholder='Post Title'
          required
          value={editPostData.eventName}
          onChange={(e) => handleEditChange('eventName', e.target.value)}
        />
        <textarea
          className='form-control postBody'
          placeholder='Post Body'
          required
          value={editPostData.eventDescription}
          onChange={(e) => handleEditChange('eventDescription', e.target.value)}
        />
        <div style={{display:"flex" , justifyContent:"space-around"}}>
        <button type='submit' className='btn btn-success'>
          Update Event
        </button>
        <button
          type='button'
          className='btn btn-secondary'
          onClick={() => setIsEditModalVisible(false)}
        >
          Close
        </button>
        </div>
      </form>
    </div>
  </div> 

   :""}


       
  </>)

}

export default ManageUserPost