import React, { useContext } from 'react';
import './Comment.css';
import {Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CommentBox from './CommentBox';
import axios from 'axios';
import {Spinner} from 'react-bootstrap';
import {
  ArrowForward,
} from "@material-ui/icons";
import { AuthContext } from '../../context/AuthContext';
const Comment = () => {

  const {user}=useContext(AuthContext);
  const {notesid}=useParams();
  const [commenttext,setcommenttext] =useState();
  const [allcomment,setallcomment] =useState([]);
  const [isfetchcomment,setisfetchcomment] =useState(false);
  useEffect(()=>{
    const fetchComment =async(req,res)=>{
     try{
        const res = await axios.get("https://handnoteapi.herokuapp.com/api/comments/" + notesid)
        setallcomment(res.data)
        setisfetchcomment(true);
     }
     catch(err){
       console.log(err);
     }
    }
    fetchComment();
  },[notesid])

   
  const CommentHandler = async(e)=>{
        e.preventDefault();
       
        try {
           await axios.post("https://handnoteapi.herokuapp.com/api/comments/" + notesid, { 
                userId:user._id,
                text:commenttext,
             });
             window.location.reload();
          } catch (err) {}
          console.log("ajjkk")
      }
     
    
  return <>
  <div className='comment-container'>
     
        <div className='comment-info-container'>

        {
          isfetchcomment?allcomment.map((x,i)=>{
            return(
                <CommentBox userinfo={x.userId} text={x.text} key={i}></CommentBox>
            )
          })
          :<Spinner animation="grow"  style={{width:"20vw",height:"10vw",marginTop:"30vh",color:"yellowgreen",marginLeft:"10vw"}}/>
        }
       </div>
        <form className="comment-form" onSubmit={CommentHandler}>
                   <input
                        className="comment-input"
                        type="text"
                       placeholder="Add a comment"
                       onChange={(e)=>setcommenttext(e.target.value)}
                    ></input>
                     <label for="submit-comment-form"
                      className="comment-submit-icon-form"> 
                      < ArrowForward
                   className="icon-arrow-comment"
                    />
                    </label>
                    <input type="submit" id="submit-comment-form"></input>
                   </form>
         </div>
         </>;
};

export default Comment;
