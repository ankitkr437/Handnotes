import React, { useContext } from "react";
import Posttime from "./Posttime";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useState , useEffect} from "react";
import { format } from 'timeago.js';
import {
  Search,
  Person,
  Chat,
  Notifications,
  LibraryBooksTwoTone,
  ShoppingCart,
  ShoppingCartOutlined,
  ThumbUpAltOutlined,
  ThumbDownAlt,
  GradeOutlined,
  ShoppingBasketOutlined,
  ShareOutlined,
  RadioButtonUncheckedSharp,
  PostAddTwoTone,
} from "@material-ui/icons";
import { AuthContext } from "../../../context/AuthContext";
const Post = () => {
 
  
  const pf="https://handnoteapi.herokuapp.com/images/";

  const [users,setusers]=useState([]);
  const [isfetchusers,setisfetchusers]=useState(false)
  const [isfetchtimeline,setisfetchtimeline]=useState(false)
  const [timeline,settimeline] =useState([])
  const [notes,setnotes]=useState([]);
  const [isnotes,setisnotes]=useState(false);


  const {user}=useContext(AuthContext);

  const User=user;
  useEffect(()=>{
    const fetchallusers= async()=>{
        const res =await axios.get("https://handnoteapi.herokuapp.com/api/users/");
        setusers(res.data);
        setisfetchusers(true)
    }
    const fetchtimeline = async ()=>{
        const res= await axios.get(`https://handnoteapi.herokuapp.com/api/notes/timeline/${User._id}`);
        //since when we upload a file then it should be in first of all post not in last so baically we sort all notes according to thir time 
        settimeline(res.data.sort((n1,n2)=>{
          return new Date(n2.createdAt) -new Date(n1.createdAt)
        }));
        setisfetchtimeline(true);
       }
       const fetchallnotes= async()=>{
        const res =await axios.get("https://handnoteapi.herokuapp.com/api/notes/");
        setnotes(res.data.sort((n1,n2)=>{
          return new Date(n2.createdAt) -new Date(n1.createdAt)
        }));
        setisnotes(true);
        
    }

    fetchallnotes();
 fetchallusers();
 fetchtimeline();
 
  },[User._id]) 
 

  return (
    <>
        {notes.map((p,i) => (
          <Posttime x={p}  key={i} />
        ))}
      </>
  );
};

export default Post;