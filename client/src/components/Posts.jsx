import React, {useEffect, useState} from 'react'
import axios from 'axios'
import PostItem from './PostItem'
import PostAuthor from './PostAuthor'
import { DUMMY_POSTS } from '../data'
import Loader from './Loader'



/* const Posts = ({}) => {
    const[posts, setPosts] = useState(DUMMY_POSTS)
  const images = 'src/images/blog1.jpg'; // Correctly defined variable
  const Education = 'Education'; // Correctly defined variable
  const Title = 'Title of first post';
    return(
        <div>
        {posts.map(post => (
          <div key={1}>
            <img src={Thumbnail1} alt={images} />
            <h2>{Education}</h2>
            <p>{Title}</p>
            <small>Author ID: {3}</small>
          </div>
    )
)
}
</div>
    );

        }

        export default Posts */

        const Posts = () => {
          const[posts, setPosts] = useState(DUMMY_POSTS)
          const [isLoading, setIsLoading] = useState(false)

          useEffect(() => {
            const fetchPosts = async () => {
              setIsLoading(true);
              try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts`)
                setPosts(response?.data)
              } catch (err) {
                console.log(err)
              }
              setIsLoading(false)

            }
            fetchPosts();
                      }, [])

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

        export default Posts
