import React, { useState, useEffect} from 'react'
import { DUMMY_POSTS } from '../data'
import PostItem from '../components/PostItem'
import axios from 'axios'
import Loader from '../components/Loader'
import { useParams } from 'react-router-dom'


const CategoryPosts = () => {
 const[posts, setPosts] = useState(DUMMY_POSTS)
          const [isLoading, setIsLoading] = useState(false)
          const {category} = useParams()

          useEffect(() => {
            const fetchPosts = async () => {
              setIsLoading(true);
              try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/categories/${category}`)
                setPosts(response?.data)
              } catch (err) {
                console.log(err)
              }
              setIsLoading(false)

            }
            fetchPosts();
                      }, [category])

                      if(isLoading){
                        return <Loader/>
                      }
          return(
            <section className="posts">
           {posts.length >0 ? <div className="container posts__container">
           {
                posts.map(({_id: id, thumbnail, category, title, desc, creator, createdAt}) => 
                <PostItem key={id} postID ={id} thumbnail={thumbnail} category={category} title={title} desc={desc} authorID={creator} createdAt = {createdAt}/>)
              }
           </div> :<h2 className='center'> NO POSTS FOUND </h2>}
            </section>
          )
}

export default CategoryPosts