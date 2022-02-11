import React from 'react'
import Topbar from '../../component/topbar/Topbar';
import Banner from '../../component/banner/Banner';
import Right from './right/Right';
import Homepost from './left/Homepost.js';
import Footer from '../../component/footer/Footer';
import Profile from '../profile/Profile';
import './Home.css';

import SellHome from '../../component/sellhome/SellHome'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Link
} from "react-router-dom";
const Home = () => {
   

    return (
        <>
        <SellHome/>
           <p className='trending-author' style={{marginBottom:"0"}}>Trending Authors</p>
           <Banner />
           <div className='main'>
           <div className='left-container'>
          <Homepost />
           </div> 
           <div className='right-container'>
           <Right> </Right> 
           </div>
           </div>
          
        </>
    )
}

export default Home
