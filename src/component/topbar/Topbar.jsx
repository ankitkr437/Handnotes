import React, { useContext, useEffect, useRef,Component } from "react";
import "./Topbar.css";
import { Link,useNavigate} from "react-router-dom";
import {
  Search,
  Person,
  Chat,
  Notifications,
  LibraryBooksTwoTone,
  ShoppingCart,
  ShoppingCartOutlined,
  CloseRounded,
  UpdateSharp
} from "@material-ui/icons";
import { useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Footer from '../footer/Footer';
import axios from "axios";
const Topbar = () => {

  const [search,setsearch] =useState("");
  const menu=useRef();
    
  const [placeholder, setplaceholder] = useState("..");
  
  const pf="https://handnoteapi.herokuapp.com/images/";

  const { user, isFetching, error, dispatch,searchedvalue,
    searchdispatch,issearched } = useContext(AuthContext);
 
  

   const MenuClickHandler=()=>{
    if(menu.current.style.display=="flex" )
    {
      menu.current.style.display="none";
    }
    else if(menu.current.style.display="none" && user._id)
        menu.current.style.display="flex";
   }

    
  
  const logouthandler=()=>{
    console.log("logout")
    localStorage.clear();
    window.location.reload();
  }
  
   const searchsubmit=(e)=>{
    e.preventDefault();
    searchdispatch({ type: "SEARCHING_NOTES", payload:search});
   }
  return (
    <>
      <div className="topbar">
        <div className="topbar-left">
          <span className="topbar-left-icon">
            <LibraryBooksTwoTone />{" "}
          </span>
          <Link to='/' style={{ textDecoration: "none" }}>
            <p className="topbar-title">HandNotes</p>
          </Link>
        </div>
        <div className="topbar-center">
        <form className="search-form" onSubmit={searchsubmit}>
        <input
            type="text"
            placeholder={`Search for notes ${placeholder}`}
            className="topbar-center-input"
           onChange={(e)=>setsearch(e.target.value)}
          ></input>
          <label htmlFor="sub">
          <img src="https://img.icons8.com/ios-filled/50/000000/search--v2.png"
          className="topbar-center-icon"
          /> 
           </label>
         
          <button type="submit" id="sub" style={{display:"none"}}>
          </button>
         
        </form>
        </div>
        <div className="topbar-right">
           
          <Link to={`/`} style={{ textDecoration: "none" }}>
            <img src={(user && user.profilePicture)?user.profilePicture:pf +"DefaultBoy.jpg"} className="topbar-right-Img" onClick={MenuClickHandler}  />
          </Link>
        </div>
      </div>


      <div className="menu" ref={menu} style={{height:"100vh"}}>
       <div className="profile">
     <div className="menu-img">
     <Link to={user ? `/profile/${user._id}` : `/`} style={{ textDecoration: "none" }}>
            <img src={(user && user.profilePicture)?user.profilePicture:pf +"DefaultBoy.jpg"} className="topbar-menu-Img" />
          </Link>
     </div>
    <div className="menu-desc">

    <div>
     {/* <p className="menu-username">{user?user.firstname+user.lastname:"Not Available"}</p> */}
     <p className="menu-username">{user?user.username:"Not Available"}</p>
     </div>

     <div>
     <Link to={user ? `/profile/${user._id}` : `/`} style={{ textDecoration: "none" }}>
      <p  className="menu-view-profile" onClick={MenuClickHandler}>View Profile</p>      
     </Link>
     </div>

    </div>

    <div className="menu-cut">
       <CloseRounded className="menu-cut-icon" onClick={MenuClickHandler} style={{fontSize:"55px"}} />
    </div>
       </div>
        <hr />
       <Link to={`/profile/update`} style={{textDecoration:"none"}} className="profile-update-menu" onClick={MenuClickHandler}>
          <p className="profile-update-link-tag">Complete Your Profile</p>
          <img src="https://img.icons8.com/ios/30/000000/settings--v2.png" className="topbar-setting"/>
            </Link>
        <div className="profile-update-menu" id="topbar-logout" onClick={logouthandler}>
         <p className="profile-update-link-tag">Logout</p>
         <img src="https://img.icons8.com/external-sbts2018-blue-sbts2018/38/000000/external-logout-social-media-basic-1-sbts2018-blue-sbts2018.png"
         className="topbar-setting"
         />
          </div> 
          <Footer></Footer>   
      </div>
     

    </>
  );
};

export default Topbar;
