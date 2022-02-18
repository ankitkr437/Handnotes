import React, { useContext } from "react";
import "./Profile.css";
import Right from '../home/right/Right';
import Profilepost from '../home/left/Profilepost'
import {Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import {Spinner} from 'react-bootstrap';
import Footer from '../../component/footer/Footer'
import Sell from '../../component/sell/Sell'
import { AuthContext } from "../../context/AuthContext";
import {
 Add,Remove
} from "@material-ui/icons";
const Profile = () => {

  const {userId}=useParams();
 
  const pf="https://handnoteapi.herokuapp.com/images/";
    
  const [user,setuser]=useState({})
  const [isfetchuser,setisfetchuser]=useState(false)
  const [isfetchpost,setisfetchpost]=useState(false)
  const [post,setpost] =useState([])
  const [isfollow,setisfollow]=useState(false)
  const {user:currentuser, dispatch ,searchedvalue} =useContext(AuthContext);

  
const audio= new Audio();
audio.src = "/music/follow.wav";
 
 
     useEffect(()=>{
       const fetchuser = async ()=>{
        const res= await axios.get(`https://handnoteapi.herokuapp.com/api/users/${userId}`);
      
        setuser(res.data);
        setisfetchuser(true);
       }
       const fetchpost = async ()=>{
        const res= await axios.get(`https://handnoteapi.herokuapp.com/api/notes/profile/${userId}`);
        setpost(res.data);
        setisfetchpost(true);
       }
     
       fetchuser();
       fetchpost();
       
     },[userId])
     
     useEffect(()=>{
      setisfollow(currentuser.followings.includes(user?._id))
    },[currentuser,user._id])
   const FollowHandle= async ()=>{
     audio.play();
     try{
       if(isfollow)
       {
        await  axios.put(`https://handnoteapi.herokuapp.com/api/users/${userId}/follow`,{userId:currentuser._id});
        dispatch({ type: "UNFOLLOW", payload: user._id });
       }
       else{
        await  axios.put(`https://handnoteapi.herokuapp.com/api/users/${userId}/unfollow`,{userId:currentuser._id});
        dispatch({ type: "FOLLOW", payload: user._id });
       }
     }
     catch(err){
        console.log(err);
     }
     setisfollow(!isfollow)
   }  
  return (
    <>
     {
          isfetchuser && user.username? (
      <div className="profile-container">
        <div className="profile-top">
          <div className="profile-top-img-container">
            <img  src={ user.profilePicture?user.profilePicture:pf + "DefaultBoy.jpg"} ></img>
            
          </div>
         
          <div className="profile-top-followers-container">
            <p className="number">{user.followers.length || 0}</p>
            <p className="number-below">followers</p>
          </div>
          <div className="profile-top-folloeings-container">
            <p className="number">{user.followings.length || 0}</p>
            <p className="number-below">followings</p>
          </div>
          <div className="profile-top-notes-container">
            <p className="number">{isfetchpost && post.length}</p>
            <p className="number-below">Notes Upload</p>
          </div>
        </div>
       <div>
         <div className="user-desc">
         {
           currentuser._id!==userId &&(
             <button className="follow" onClick={FollowHandle} >
             {isfollow?"unfollow":"follow"}
            {isfollow?<Remove className="follow-icon" />:<Add className="follow-icon"/>}
             </button> )
           }
           <p> {}</p>
        <div className="profile-desc">
         <div className="profile-desc-name">
         <p className="desc">
            {user && user.desc}
          </p>
         <p style={{fontSize:"22px",fontWeight:"600"}}>
            {user && user.username}
          </p>
          <p className="residing-second">{user.firstname+" "+user.lastname}</p>
         
          <p style={{fontSize:"20px",fontWeight:"300"}}>
            {user && user.institution}  
          </p>
          <div className="residing">
           <p className="residing-first"> {user.country +" || "}  </p>
           <p style={{marginTop:"4px"}}>{" "+user.city}</p>
          </div>
         
         {
          !( user.firstname && user.lastname && user.profilePicture && user.desc &&user.country) &&
             <p>
             <Link to={`/profile/update`} style={{fontSize:"25px",fontWeight:"600"}}
              className="complete-your-profile">
             {
               currentuser._id==userId &&
               "Complete Your Profile"
             }
   
               </Link>
             </p>
         }

         </div>
        </div>
         </div>
       </div>
        {/* <Sell /> */}
        <div className="user-timeline">
        <div className="user-post">


       { 
       isfetchpost ?post.map((y)=>(
        <Profilepost x={y} key={y._id}/>

       )) :<Spinner animation="grow"  style={{width:"20vw",height:"10vw",marginTop:"30vh",color:"yellowgreen",marginLeft:"10vw"}}/>}
        </div>
         <div className="user-right">
         <Right />
         </div>
        </div>
        </div>
        
          ):<Spinner animation="grow"  style={{width:"15vw",height:"15vw",marginTop:"10vh",color:"yellowgreen",marginLeft:"40vw"}}/>
     }

    </>
  );
};

export default Profile;
