import React from 'react'
import './Footer.css';

const Footer = () => {
    return (
        <>
         <div className='footer-complete-container'> 
         <div className='footer-container'>
              <div className='contact-upper'>
              <p>all rights reserved</p>
              <p>contact us</p>
              </div>
              <div className='contact-text'>
              <a href="mailto:ankitloharshi@gmail.com">  <img src="https://img.icons8.com/ios/50/000000/email-open.png" className='contact-img'/>
             </a>
              <a href="https://github.com/ankitkr437/Handnotes"> <img src="https://img.icons8.com/ios-glyphs/50/000000/github.png" className='contact-img'/></a>
              </div>
              
          </div> 
         </div> 
        </>
    )
}

export default Footer
