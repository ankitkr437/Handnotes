import React, { useContext, useRef } from "react";
import "./SellHome.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

import { CloseRounded } from "@material-ui/icons";
import "./Sellform.css";


const Sell = () => {

 
  const { user } = useContext(AuthContext);
  const pf="https://handnoteapi.herokuapp.com/images/";

  const ShowForm = useRef();
  const notename = useRef();
  const descritpion = useRef();
  const price = useRef();
  const [notefile,setnotefile]=useState(null)
  const [fileimg,setfileimg]=useState(null)
  const ShowFormHandler = () => {
    if ((ShowForm.current.style.display = "flex"))
      ShowForm.current.style.display = "none";
  };
  const audio= new Audio();
  audio.src = "/music/update.wav";
  const SellFormSubmitHandler = async (e) => {

     alert("notes uploading started...")
    e.preventDefault();
    audio.play();
    
    const newNote = {
      userId: user._id,
      desc: descritpion.current.value,
      price:price.current.value,
      notename:notename.current.value,
    };
    if (fileimg) {
      const data = new FormData();
      const fileName = Date.now() + fileimg.name;
      data.append("name", fileName);
      data.append("file", fileimg);
      newNote.thumbnailfilename = fileName;
     
      try {
        await axios.post("https://handnoteapi.herokuapp.com/api/upload", data);
       
      } catch (err) {}
    }
    if(notefile){
      const data = new FormData();
      const fileName = Date.now() + notefile.name;
      data.append("pdfname", fileName);
      data.append("pdffile", notefile);
      newNote.notefilename = fileName;

      try {
        await axios.post("https://handnoteapi.herokuapp.com/api/upload/pdf", data);
      } catch (err) {}
    }
    try {
      await axios.post("https://handnoteapi.herokuapp.com/api/notes", newNote);
      window.location.reload();
      alert("successfully uploaded notes")
    } catch (err) {}
  };

  const UpFormHandler = () => {
    if (ShowForm.current.style.display == "none")
      ShowForm.current.style.display = "flex";
  };
  return (
    <>
      <div className="sell-container-home">
        <div className="sell-img-home">
          <img
           src={user.profilePicture?pf+user.profilePicture:pf +"DefaultBoy.jpg"}
          ></img>
        </div>
        <div className="sell-post-home" onClick={UpFormHandler}>
          <p onClick={UpFormHandler} className="sell-post-home-text">
            Upload a Note
          </p>
        </div>
 
        <div className="sell-form-container" ref={ShowForm}>
        <img src="https://img.icons8.com/ios-filled/50/000000/delete-sign--v2.png"
         className="sell-form-cut-icon"
         onClick={ShowFormHandler}
        />

          <form onSubmit={SellFormSubmitHandler} className="sell-form">
            <input
              type="text"
              placeholder="Notename"
              className="sell-form-note-name"
              ref={notename}
              required
            ></input>
            <input
              type="text"
              placeholder="Descritpion"
              className="sell-form-descritpion"
              ref={descritpion}
              required
            ></input>
            <input
              type="number"
              placeholder="Price"
              className="sell-form-price"
              ref={price}
              required
            ></input>
            <label for="thumbnail-file-upload" class="custom-file-upload">
             Thumbnail for notes
            </label>
            <input
              type="file"
              id="thumbnail-file-upload"
             accept=".png,.jpeg,.jpg"
             //for uploading just single file i have done files[0]
             onChange={(e)=>setfileimg(e.target.files[0])}
            >
            </input>
            <label for="pdf-file-upload" class="custom-file-upload">
             File of notes(in pdf)
            </label>
            <input
              type="file"
              id="pdf-file-upload"
              accept=".pdf"
              onChange={(e)=>setnotefile(e.target.files[0])}
            ></input>
            <button type="submit" className="sellform-submit-button">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Sell;
