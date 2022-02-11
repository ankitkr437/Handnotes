
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
const Posttime = ({x}) => {
    const { user } = useContext(AuthContext);
    const pf="https://handnoteapi.herokuapp.com/images/";
     
    const [isfetchcomment,setisfetchcomment]=useState();
    const [like, setlike] = useState(x.likes.length);
    const [allcomment,setallcomment]=useState(0)
    const [islike, setislike] = useState(false);
    const [isbuy, setisbuy] = useState(true);
    const [users,setusers] =useState([])
    const [isfetchusers,setisfetchusers] =useState(false)
    const navigate = useNavigate()
   useEffect(() => {
    setislike(x.likes.includes(user._id));
   }, [user._id, x.likes]);
    useEffect(()=>{
        const fetchalluser= async()=>{
            const res =await axios.get("https://handnoteapi.herokuapp.com/api/users/");
            setusers(res.data)
            setisfetchusers(true)
        }
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
      fetchComment();
     fetchalluser();
      },[]) 
   
      const likehandler = () => {
        try {
          axios.put("https://handnoteapi.herokuapp.com/api/notes/" + x._id + "/like", { userId: user._id });
        } catch (err) {}
        setlike(islike? like - 1 : like + 1);
        setislike(!islike);
      }; 
    
    return <>
        <div className="post-container" key={x._id} style={{ marginLeft: "3vw" }}>
            <div className="post-topbar">
                <Link to={`/profile/${x.userId}`} style={{ textDecoration: "none" }}>
                
                    <img src={user.profilePicture ?pf+user.profilePicture :pf + "DefaultPic.png"} className="post-topbar-img" ></img>
                </Link>
                <div>
                    <p className="post-topbar-name">{isfetchusers?users.find(obj=>obj._id===x.userId).username:user.username}</p>
                    <div className="post-topbar-name-below">
                        <p className="post-topbar-followers">
                            {user.followers.length} Followers <span style={{ visibility: "hidden" }}>#</span>
                        </p>
                        <p className="post-topbar-ago">
                            {format(x.createdAt)}
                        </p>
                    </div>
                </div>
                
              <div className="post-topbar-dot-container">
                 <Dot x={x}/>
              </div>
            </div>

            <div className="main-post" style={{ height: "57vh" }}>
                <div className="main-post-about">
                    <p className="main-post-notename">{x.notename}</p>
                    <p className="main-post-desc">
                        {x.desc}
                    </p>
                    <p className="main-post-note-price">Notes Price:{x.price || 0}USD</p>
                    <div className="post-likes-comment">
                        <div className="main-post-likes">
                            <ThumbUpAltOutlined onClick={likehandler}/>

                            <GradeOutlined />{like} likes
                        </div>
                        <div className="main-post-buy">
                            <ShoppingBasketOutlined /> {x.buy.length} buy
                        </div>
                    </div>
                </div>
                <Link to={`/notes/${x._id}`} style={{ textDecoration: "none" }}>
                    <div className="main-post-img-container">
                        <img src={x.thumbnailfilename?pf+x.thumbnailfilename:pf+"post-img-2.jpg"} className="main-post-image"></img>
                    </div>
                </Link>
            </div>

            <div className="post-last">
            <Link to={`/viewcomment/${x._id}`} className="link-in-comment">

            {/* //onSubmit={CommentHandler}  onChange={(e)=>setcomment(e.target.value)}*/}
                   <form className="post-last-comment-form">
                   <input
                        className="post-last-input"
                        type="text"
                       placeholder="Add a comment"
                    ></input>
                     {/* <label for="submit-comment"
                      className="comment-submit-icon"> < ArrowForward
           className="icon-arrow-comment"
          /></label>
                    <input type="submit" id="submit-comment" className="post-last-input-submit"></input> */}
                   </form>
                    <p className="main-post-comment"
                    >{allcomment.length} comments</p>
                </Link>
            </div>
        </div>

    </>;
};

export default Posttime;
