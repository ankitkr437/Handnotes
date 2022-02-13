import React, { useContext } from "react";
import "./Sell.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
const Sell = () => {
    const {user}=useContext(AuthContext);
    const pf="https://handnoteapi.herokuapp.com/images/";
  return <>
      <div className="sell-container">
         <div className="sell-img">
      <img src={user.profilePicture?pf+user.profilePicture:pf +"DefaultBoy.jpg"}></img>
         </div>
         <div className="sell-post">
           <p>Upload a Note</p>
         </div>
      </div>
  </>;
};

export default Sell;
