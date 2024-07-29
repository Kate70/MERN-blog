import React from 'react';
import { useState } from 'react';
import { fakePosts } from '../data.js'
import PostItem from '../components/PostItem';


const AuthorPosts = () => {
  const [posts, setPosts] = useState(fakePosts )
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

export default AuthorPosts
