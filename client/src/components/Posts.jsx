import React, { useEffect } from 'react';
import { useState } from 'react';
import PostItem from './PostItem';
import Loader from './Loader';
import axios from 'axios';



 
  

const Posts = () => {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsloading] = useState(false)
 
  
  useEffect(() => {
    const featchPosts = async () => {
      setIsloading(true)
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts`);
        setPosts(response?.data)
      } catch (err) {
        console.log(err);
        
      }
      setIsloading(false)
    }
    featchPosts()
  },[])
  if (isLoading) {
    return<Loader/>
  }
  return (
      <section className="posts">
      {posts.length > 0 ? <div className="container posts__container">
        {
          posts.map(({ _id:id, thumbnail, category, title, description, creator, createdAt }) => <PostItem key={id}
            postID={id} thumbnail={thumbnail} category={category} title={title} description={description} authorID={creator} createdAt={ createdAt } />)
        }
      </div>: <h2 className='center'> No posts founded</h2>}
    </section>
  )
}

export default Posts