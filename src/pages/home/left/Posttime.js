
import React, { useContext, useRef } from "react";
import "./Homepost.css";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from "react";
import { format } from 'timeago.js';
import { useNavigate } from "react-router";
import Dot from "../../../component/dot/Dot";
import {
    ArrowForward,
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


const audio= new Audio();
  audio.src = "/music/like.wav";
  const audio1= new Audio();
  audio1.src = "/music/delete.wav";
  const audioerror= new Audio();
  audioerror.src = "/music/error.wav";
const Posttime = ({x}) => {
    const { user } = useContext(AuthContext);
    const pf="https://handnoteapi.herokuapp.com/images/";
     
    const [isfetchcomment,setisfetchcomment]=useState();
    const [like, setlike] = useState(x.likes.length);
    const [allcomment,setallcomment]=useState(0)
    const [islike, setislike] = useState(false);
    const [isseen, setisseen] = useState(false);
    const [seen,setseen] =useState(0);
    const [isfetchuser,setisfetchuser] =useState(false)
        const[postuser,setpostuser]=useState()
        
    const navigate = useNavigate()
   useEffect(() => {
    setislike(x.likes.includes(user._id));
   }, [user._id, x.likes]);
   useEffect(() => {
    setisseen(x.buy.includes(user._id));
   }, [user._id, x.seen]);
    useEffect(()=>{
        const fetchComment =async(req,res)=>{
            try{
               const res = await axios.get("https://handnoteapi.herokuapp.com/api/comments/" + x._id)
               setallcomment(res.data)
               setisfetchcomment(true);
            }
            catch(err){
              console.log(err);
            }
           }
           const fetchuser =async(req,res)=>{
            try{
               const res = await axios.get("https://handnoteapi.herokuapp.com/api/users/" + x.userId)
               setpostuser(res.data)
               setisfetchuser(true)
            }
            catch(err){
              console.log(err);
            }
           }
      fetchComment();
     fetchuser();
      },[]) 
   
      const likehandler = () => {
          audio.play();
        try {
          axios.put("https://handnoteapi.herokuapp.com/api/notes/" + x._id + "/like", { userId: user._id });
        } catch (err) {}
        setlike(islike? like - 1 : like + 1);
        setislike(!islike);
      }; 
      const seenhandler = () => {
      try {
        axios.put("https://handnoteapi.herokuapp.com/api/notes/" +x._id + "/buy", { userId: user._id });
      } catch (err) {}
      setseen(isseen? seen - 1 : seen + 1);
      setisseen(!isseen);
    }; 
      const DeleteNotes= async()=>{
        let response = prompt(`Do you really want to delete this note if yes the type "YES" or type "NO" `);
        console.log(response)
        audio1.play();
        
            try {
                response==="YES" && await axios.delete(`https://handnoteapi.herokuapp.com/api/notes/${x._id}`,{userId:user._id});
                response==="YES" && alert("notes deleted successfully")
             response==="YES" &&window.location.reload();
            } catch (err) {
              audioerror.play();
              alert("sorry you can not delete this note")
                console.log("unsuccess");
            }
        
      }     
    return <>
        <div className="post-container" key={x._id} style={{ marginLeft: "3vw" }}>
            <div className="post-topbar">
                <Link to={`/profile/${x.userId}`} style={{ textDecoration: "none" }}>
               
                    <img  src={isfetchuser && postuser.profilePicture?postuser.profilePicture:pf + "DefaultPic.png"} className="post-topbar-img" ></img>
                </Link>
                <div>
                    <p className="post-topbar-name">{isfetchuser && postuser.username}</p>
                    <div className="post-topbar-name-below">
                        <p className="post-topbar-followers">
                            {isfetchuser && postuser.followers.length} Followers <span style={{ visibility: "hidden" }}>#</span>
                        </p>
                        <p className="post-topbar-ago">
                            {format(x.createdAt)}
                        </p>
                    </div>
                </div>
                
               {
                   user && x && (x.userId === user._id) &&
                   <div className="post-topbar-edit-delete-container">
                        <Link to={`/note/update/${x._id}`} style={{ textDecoration: "none" }}>
                  <img src="https://img.icons8.com/material-outlined/48/000000/edit--v2.png" className="post-topbar-edit-img"/>
                  </Link>
                  <img src="https://img.icons8.com/fluency-systems-filled/48/000000/filled-trash.png" className="post-topbar-delete-img" onClick={DeleteNotes}/>
                   </div>
               }
            </div>

            <div className="main-post" style={{ height: "57vh" }}>
                <div className="main-post-about">
                    <p className="main-post-notename">{x.notename}</p>
                    <p className="main-post-desc">
                        {x.desc}
                    </p>
                    {/* <p className="main-post-note-price">Notes Price:{x.price || 0} $</p> */}
                    <div className="post-likes-comment">
                        <div className="main-post-likes">
                            
                            <img src="https://img.icons8.com/external-kmg-design-glyph-kmg-design/64/000000/external-like-feedback-kmg-design-glyph-kmg-design.png"
                            onClick={likehandler}
                            className="post-like-img"
                            />
                         <p className="post-like-count"> {like} likes</p>  
                        </div>
                        <div className="main-post-buy">
                        <img src="https://img.icons8.com/external-icongeek26-glyph-icongeek26/64/000000/external-view-user-interface-icongeek26-glyph-icongeek26.png" className="post-seen-img"/>
                        <p className="post-seen-count"> {x.buy.length} seen </p>
                        </div>
                    </div>
                </div>
                <Link to={`/notes/${x._id}`} style={{ textDecoration: "none" }}>
                    <div className="main-post-img-container" onClick={seenhandler}>
                  {
                      <img src={x.thumbnailfilename?x.thumbnailfilename:pf+"images-notes.jpg"} className="main-post-image" alt="note-thumbnail"></img>
                  }
                   </div>
                </Link>
            </div>

            <div className="post-last">
            <Link to={`/viewcomment/${x._id}`} className="link-in-comment">

           
                   <form className="post-last-comment-form">
                   <input
                        className="post-last-input"
                        type="text"
                       placeholder="Add a comment"
                    ></input>
                     
                   </form>
                    <p className="main-post-comment"
                    >{allcomment.length} comments</p>
                </Link>
            </div>
        </div>

    </>;
};

export default Posttime;
