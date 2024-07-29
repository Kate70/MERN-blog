import React, { useState } from 'react';
import { fakePosts } from '../data';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [posts, setPosts] = useState(fakePosts)
  return (
    <section className="dashboard">
      {
        posts.length ? <div className="container dashboard__container">
          {posts.map(post => {
            return <article key={post.id} className='dashboard__post'>
              <div className="dashbord__post-info">
                <div className="dashbord__post-thumbnail">
                  <img src={post.thumbnail} alt="" />
                </div>
                <h5>{ post.title}</h5>
              </div>
              <div className="dashbord__post-actions">
                <Link to={`/posts/${post.id}`} className='btn sm'>View</Link>
                <Link to={`/posts/${post.id}/edit`} className='btn sm primary'>Edit</Link>
                <Link to={`/posts/${post.id}/delete`} className='btn sm danger'>Delete</Link>
              </div>
            </article>
          })}
        </div>:<h2 className='center'>You have no posts</h2>
      }
    </section>
  )
}

export default Dashboard
