import React, { useContext, useRef } from 'react';
import './Dot.css'
import { Link } from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from "react";
import {
  DeleteRounded,UpdateRounded,MoreHoriz,MoreVertRounded
} from "@material-ui/icons";
import { AuthContext } from '../../context/AuthContext';


const Dot = ({x}) => {
      const DotContainerItem =useRef();
      const {user:currentuser} = useContext(AuthContext);
      const ShowItem=()=>{
        DotContainerItem.current.style.display === "flex"?DotContainerItem.current.style.display = "none":DotContainerItem.current.style.display = "flex"
      }

  const DeleteNotes= async()=>{
        try {
         await axios.delete(`https://handnoteapi.herokuapp.com/api/notes/${x._id}`,{userId:currentuser._id});
         window.location.reload();
        } catch (err) {
            console.log("unsuccess")
        }
        console.log(x,currentuser._id)
  }    
    return <>
      <div className='dot-container-post'>
      <ul className='dot-container-item' ref={DotContainerItem}>
               <li className='dot-container-item-1' onClick={DeleteNotes}>
               Delete
               <DeleteRounded ></DeleteRounded>
               </li>
               <li className='dot-container-item-2'>
               Update
               <UpdateRounded />
               </li>
           </ul>
       <div className="dot-container" onClick={ShowItem}>
        <MoreVertRounded className="dot-container-dot-icon"/>
       </div>
      </div>
    </>;
};

export default Dot;






 