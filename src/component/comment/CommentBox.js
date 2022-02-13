 import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { useState, useEffect } from "react";
 import './CommentBox.css'
 const CommentBox = ({userinfo,text}) => {

  const { user } = useContext(AuthContext);
  const pf="https://handnoteapi.herokuapp.com/images/";

   
  
   return (
   <>
     <div className='comment-box-container'>
     <img src={pf + "DefaultPic.png"} className="comment-box-img" ></img>
    <p className='comment-box-message'>
        {text}
    </p>
   </div>
   </>
   );
 };
 
 export default CommentBox;
 
 