import React, {useState, useContext} from 'react'
import { Link } from 'react-router-dom'
import Logo from '../images/logo.jpg'
import {FaBars} from "react-icons/fa"
import {AiOutlineClose} from "react-icons/ai"

import { UserContext } from '../context/userContext'

const Header = () => {
  const [isNavShowing, setIsNavShowing] = useState(window.innerWidth>800 ? true: false);
  const {currentUser} = useContext(UserContext)
  return (
    <nav>
     <div className='container nav__container'>
      <Link to="/" className='nav__logo'>
      <img src= {Logo} alt="Navbar logo"/>
      </Link>
      {currentUser?.id && isNavShowing && <ul className="nav__menu">
      <li><Link to ={`/profile/${currentUser.id}`}>{currentUser?.name}</Link></li>
      <li><Link to ="/create">Create Post</Link></li>
      <li><Link to ="/authors">Authors</Link></li>
      <li><Link to ="/logout">Logout</Link></li>
      </ul>}
      {!currentUser?.id && isNavShowing && <ul className="nav__menu">
    
      <li><Link to ="/authors">Authors</Link></li>
      <li><Link to ="/login">Login</Link></li>
      </ul>}
      <button className ="nav__toggle-btn">
        <AiOutlineClose/>

      </button>

     </div>
    </nav>
  )
}

export default Header