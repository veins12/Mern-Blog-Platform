import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import ErrorPage from './pages/ErrorPage';
import { RouterProvider } from 'react-router-dom';
import Home from "./pages/Home";
import PostDetail from './pages/PostDetail';
import Register from './pages/Register';
import Login from "./pages/Login";
import UserProfile from './pages/UserProfile';
import CreatePost from './pages/CreatePost';
import EditPost from "./pages/EditPost";
import DeletePost from "./pages/DeletePost";
import CategoryPosts from "./pages/CategoryPosts";
import AuthorPosts from "./pages/AuthorPosts";
import Dashboard from "./pages/Dashboard";
import Logout from "./pages/Logout";
import Authors from './pages/Authors';
import UserProvider from './context/userContext';



const router = createBrowserRouter([
  {
    path:"/",
    element: <UserProvider><Layout/></UserProvider>,
    errorElement: <ErrorPage/>,
    children : [
{index: true, element: <Home/>},
{path: "posts/:id", element:<PostDetail/>},
{path: "register", element:<Register/>},
{path: "login", element:<Login/>},
{path: "profile/:id", element:<UserProfile/>},
{path: "authors", element:<Authors/>},
{path: "create", element:<CreatePost/>},
{path: "posts/:id/edit", element:<EditPost/>},
{path: "posts/:id/delete", element:<DeletePost/>},
{path: "posts/categories/:category", element:<CategoryPosts/>},
{path: "dashboard/:id", element:<Dashboard/>},
{path: "myposts/:id", element:<AuthorPosts/>},
{path: "logout", element:<Logout/>}

    ]
    }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router ={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
