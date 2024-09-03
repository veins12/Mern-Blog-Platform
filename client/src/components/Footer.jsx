import React from 'react'
import {Link} from 'react-router-dom'

const Footer = () => {
  return(
    <footer>
      <ul className="footer__categories">
        <li><Link to="/posts/categories/Agriculture ">Agriculture</Link></li>
        <li><Link to="/posts/categories/Technology ">Technology</Link></li>
        <li><Link to="/posts/categories/Lifestyle ">Lifestyle</Link></li>
        <li><Link to="/posts/categories/Education ">Education</Link></li>
        <li><Link to="/posts/categories/Art ">Art</Link></li>
        <li><Link to="/posts/categories/Weather ">Weather</Link></li>
      </ul>
      <div className='footer__copyright'>
        <small>All Rights Reserved &copy; Copyright, Prajwal.</small>
      </div>
    </footer>
  )

  
}

export default Footer