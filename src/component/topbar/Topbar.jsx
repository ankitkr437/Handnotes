import React, { useContext, useRef } from "react";
import "./Topbar.css";
import { Link } from "react-router-dom";
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
const Topbar = () => {

  const search=useRef();
  const menu=useRef();

  const [placeholder, setplaceholder] = useState("..");
  const pf="https://handnoteapi.herokuapp.com/images/";

  const { user } = useContext(AuthContext);
  //  const clickhandler=()=>{

  //   if(search.current.style.display=="flex")
  //   {
  //     search.current.style.display="none";
  //   }
  //   else if(search.current.style.display="none")
  //       search.current.style.display="flex";
  //  }

   const MenuClickHandler=()=>{
    if(menu.current.style.display=="flex" )
    {
      menu.current.style.display="none";
    }
    else if(menu.current.style.display="none" && user._id)
        menu.current.style.display="flex";
   }


   const searchsubmit=(e)=>{
       e.preventDefault();
       console.log("submited")
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
           ref={search}
          ></input>
          <label for="sub"> <Search
            className="topbar-center-icon"
          /></label>
          <input type="submit" id="sub" style={{display:"none"}}></input>
         
        </form>
        </div>
        <div className="topbar-right">
           
          {/* <Link to={`/notifications/1`} style={{ textDecoration: "none" }} className="link-notification">
            <Notifications className="topbar-right-notification" />
          </Link>
          <span className="topbar-right-notification-number" >+3</span>
          <Link to={`/cart/1`} style={{ textDecoration: "none" }} className="link-cart">
            <ShoppingCartOutlined className="topbar-right-cart" />
          </Link>
          <span className="topbar-right-cart-number" >0</span> */}
          <Link to={`/`} style={{ textDecoration: "none" }}>
            <img src={user ? (user.profilePicture || pf + "DefaultPic.png") : pf + "DefaultPic.png"} className="topbar-right-Img" onClick={MenuClickHandler}  />
          </Link>
        </div>
      </div>


      <div className="menu" ref={menu}>
       <div className="profile">
     <div className="menu-img">
     <Link to={user ? `/profile/${user._id}` : `/`} style={{ textDecoration: "none" }}>
            <img src={user ? (user.profilePicture || pf + "DefaultPic.png") : pf + "DefaultPic.png"} className="topbar-menu-Img" />
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

       <Link to={`/profile/update`} style={{textDecoration:"none"}} className="profile-update-menu" onClick={MenuClickHandler}>
          <p className="profile-update-link-tag">Complete Your Profile</p>
          <UpdateSharp className="profile-update-menu-icon"/>
            </Link>
           
      </div>
     

    </>
  );
};

export default Topbar;
