import React from 'react';
import { useState } from 'react';
import PostItem from './PostItem';
import {fakePosts} from '../data.js'


 
  

const Posts = () => {
    const [posts, setPosts] = useState(fakePosts)
  return (
      <section className="posts">
      {posts.length > 0 ? <div className="container posts__container">
        {
          posts.map(({ id, thumbnail, category, title, desc, authorID }) => <PostItem key={id}
            postID={id} thumbnail={thumbnail} category={category} title={title} desc={desc} authorID={authorID} />)
        }
      </div>: <h2 className='center'> No posts founded</h2>}
    </section>
  )
}

export default Posts