import React,{useEffect, useContext,useState } from 'react';
import { Link, useNavigate,useLocation } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import Loader from '../components/Loader';
import axios from 'axios';


const DeletePost = ({postId:id}) => {
  const [isLoading, setIsLoading]=useState(false)
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;
  const navigate = useNavigate();
  const location = useLocation()
  
  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [])
  if (isLoading) {
    return <Loader/>
  }
  const removePost = async () => {
    setIsLoading(true)
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/posts/${id}`, { withCredentials: true, headers: { Authorization: `Bearer ${token}` } });
      if (response.status == 200) {
        if (location.pathname == `/myposts/${currentUser.id}`) {
          navigate(0)
        } else {
          navigate('/')

        }
      }
      setIsLoading(false)
    } catch (error) {
      console.log("Couldnot delete post.");
      
    }
  }
  return (
    <div>
      <Link className='btn sm danger' onClick={()=>removePost(id)}>Delete</Link>
    </div>
  )
}

export default DeletePost
