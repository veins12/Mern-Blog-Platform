/* import React, {useEffect, useState} from 'react'
import {Link,} from 'react-router-dom'
import Avatar from '../images/avatar1.jpg'
import axios from 'axios'
import ReactTimeAgo from 'react-time-ago'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'


TimeAgo.addDefaultLocale(en)

TimeAgo.addDefaultLocale(ru)


const PostAuthor = ({authorID, createdAt}) => {
const [author, setAuthor] =useState({})
  useEffect (() => {
    const getAuthor = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URI}/users/${authorID}`)
      setAuthor(response?.data);
    } catch (error) {
      console.log(error)
      
    }
  }
  getAuthor();
}, [])
  return (
    <Link to={`/posts/users`} className='post__author'>
        <div className='post__author-avatar'>
            <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${author?.avatar}`} alt=""/>
        </div>
        <div className='post__author-details'>
            <h5>By:{author?.name}</h5>
            <small><ReactTimeAgo date = {new Date(createdAt)} locale='en-US'/></small>
        </div>
    </Link>
  )
}

export default PostAuthor  */

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../images/avatar1.jpg'; // Fallback avatar image
import axios from 'axios';
import ReactTimeAgo from 'react-time-ago';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import ru from 'javascript-time-ago/locale/ru.json';

// Add time-ago locales
TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

const PostAuthor = ({ authorID, createdAt }) => {
  const [author, setAuthor] = useState(null); // Initially set to null
  const [error, setError] = useState(false); // Track error state

  useEffect(() => {
    const getAuthor = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URI}/users/${authorID}`);
        setAuthor(response?.data);
      } catch (error) {
        console.error("Error fetching author:", error);
        setError(true); // Set error state if fetching fails
      }
    };
    getAuthor();
  }, [authorID]); // Include authorID as a dependency

  // Validate createdAt and convert it to a valid date object
  const validDate = createdAt ? new Date(createdAt) : null;

  return (
    <Link to={`/posts/users/${authorID}`} className="post__author">
      <div className="post__author-avatar">
        <img 
          src={author?.avatar 
                ? `${process.env.REACT_APP_ASSETS_URL}/uploads/${author.avatar}` 
                : Avatar} // Use fallback avatar if no avatar exists
          alt={author?.name || 'Author avatar'} // Set alt text based on author name
        />
      </div>
      <div className="post__author-details">
        <h5>By: {author?.name || 'Unknown Author'}</h5> {/* Fallback to "Unknown Author" if no name */}
        <small>
          {validDate ? (
            <ReactTimeAgo date={validDate} locale="en-US" />
          ) : (
            "Date not available" // Fallback message if createdAt is invalid
          )}
        </small>
      </div>
    </Link>
  );
};

export default PostAuthor;

