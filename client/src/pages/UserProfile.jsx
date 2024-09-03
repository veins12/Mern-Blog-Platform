/* import React, {useState, useContext, useEffect} from 'react'
import { Link , useNavigate} from 'react-router-dom'
import Avatar from '../images/avatar15.jpg'
import {FaEdit} from "react-icons/fa";
import {FaCheck} from "react-icons/fa";
import { UserContext } from '../context/userContext';



const UserProfile = () => {
  const[avatar, setAvatar] = useState(Avatar)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const navigate = useNavigate();
  const {currentUser} = useContext(UserContext)
  const token = currentUser?.token;
  const [setCurrentUser] = useState("John Doe"); // Example user name








useEffect(() => {
  if(!token) {
    navigate('/login')
  }
}, [])






  return (
    <section className="profile">
      <div className="container profile__container">
        <Link to ={`/myposts/${currentUser.id}`} className='btn'>My Posts</Link>

        <div className="profile__details">
          <div className="avatar__wrapper">
            <div className="profile__avatar">
              <img src={avatar} alt=""/>

            </div>
            <form className="avatar__form">
              <input type="file" name="avatar" id="avatar" onChange={e => setAvatar (e.target.files[0])} accept="png, jpg, jpeg" />
              <label htmlFor='avatar'><FaEdit/></label>
            </form>
            <button className='profile__avatar-btn'><FaCheck/></button>
          </div>
        
    <h1>{`${currentUser}`}</h1>
  
          

          <form className="form profile__form">
            <p className='"form__error-message'>
              This is an error message.
            </p>
            <input type="text" placeholder='Full Name' value={name} onChange={e => setName(e.target.value)}/>
            <input type="email" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)}/>
            <input type="password" placeholder='Current password' value={currentPassword} onChange={e => setCurrentPassword(e.target.value)}/>
            <input type="password" placeholder='New password' value={newPassword} onChange={e => setNewPassword(e.target.value)}/>
            <input type="password" placeholder='Confirm new password' value={confirmNewPassword} onChange={e => setConfirmNewPassword(e.target.value)}/>
          <button type='submit' className='btn primary'>Update Details</button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default UserProfile */



import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaEdit, FaCheck } from 'react-icons/fa';
import { UserContext } from '../context/userContext';

const UserProfile = () => {
  const [avatar, setAvatar] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isAvatarTouched, setIsAvatarTouched] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;
  const { id } = useParams();
  const [error, setError]= useState();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      const getUser = async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/users/${id}`,
            { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
          );
          const { name, email, avatar } = response.data;
          setName(name);
          setEmail(email);
          setAvatar(avatar);
        } catch (error) {
          console.error('Error fetching user data:', error.response?.data || error.message);
        }
      };

      getUser();
    }
  }, [token, navigate, id]);

  const changeAvatarHandler = async () => {
    if (!avatar) return;

    const formData = new FormData();
    formData.append('avatar', avatar);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/users/change-avatar`,
        formData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      console.log('Avatar uploaded successfully:', response.data);
      setAvatar(response.data.avatar);
    } catch (error) {
      console.error('Error uploading avatar:', error.response?.data || error.message);
    }
  };

  const updateUserDetails = async (e) => {
    e.preventDefault();
    try {
      const userData = new FormData ();
    userData.set('name', name);
    userData.set('email', email);
    userData.set('currentPassword', currentPassword)
    userData.set('newPassword', newPassword)
    userData.set('confirmNewPassword', confirmNewPassword)

    const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}/users/edit-user`, 
      userData, {withCredentials: true, headers: {Authorization: `Bearer ${token}`}}
    )
    if(response.status == 200){
      navigate('/logout')

    }
    } catch (error) {
      setError(error.response.data.message);
    }

  }

  return (
    <section className="profile">
      <div className="container profile__container">
        {currentUser && currentUser.id && (
          <Link to={`/myposts/${currentUser.id}`} className="btn">My Posts</Link>
        )}

        <div className="profile__details">
          <div className="avatar__wrapper">
            <div className="profile__avatar">
              <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${avatar}`} alt="User Avatar" />
            </div>
            <form className="avatar__form">
              <input
                type="file"
                name="avatar"
                id="avatar"
                onChange={(e) => setAvatar(e.target.files[0])}
                accept="image/png, image/jpeg, image/jpg"
              />
              <label htmlFor="avatar" onClick={() => setIsAvatarTouched(true)}>
                <FaEdit />
              </label>
            </form>
            {isAvatarTouched && (
              <button className="profile__avatar-btn" onClick={changeAvatarHandler}>
                <FaCheck />
              </button>
            )}
          </div>

          <h1>{currentUser?.name}</h1>

          <form className="form profile__form" onSubmit={updateUserDetails}>
            {error && <p className="form__error-message">(error)</p>}
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
            <button type="submit" className="btn primary">Update Details</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;

