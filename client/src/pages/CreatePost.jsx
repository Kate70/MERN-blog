import React, { useState ,useContext, useEffect} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import { UserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Uncategorized');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbdnail] = useState('');
  const [error, setError] = useState('')

  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  },[])

  const modules = {
    toolbar: [
      [{ 'header':  [1,2, false] }],
     
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, 
       {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']                                         
    ],
  };

  const formats = [
   'header', 'bold', 'italic', 'underline', 'strike', 'blockquote'
  ]

  const POST_CATEGORIES=["Technology",
  "Health",
  "Travel",
  "Finance",
  "Education",
  "Lifestyle",
  "Food",
  "Entertainment",
  "Business",
    "Sports"]
  const createPost = async (e) => {
    e.preventDefault();
    const postData = new FormData();
    postData.set('title', title)
    postData.set('category', category)
    postData.set('description', description)
    postData.set('thumbnail', thumbnail)

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/posts`, postData, { withCredentials: true, headers: { Authorization: `Bearer ${token}` } })
      console.log(postData);
      
      if (response.status == 201) {
        return navigate('/')
      }
      
    } catch (error) {
      setError(error.response.data.message);
      
    }
  }
  
  return (
    <section className="create-post">
      <div className="container">
        <h2>Create Post</h2>
        {error && <p className="form__error-message">{ error}</p>}
        
        <form action="" className='form form create-post__form' onSubmit={createPost}>
          <input type="text" placeholder='Title' value={title } onChange={e=> setTitle(e.target.value)} autoFocus />
          <select name="category" value={category} id="" onChange={e => setCategory(e.target.value)}>
            {
              POST_CATEGORIES.map(cat => <option key={cat}>{cat}</option>)
            }
         
          </select>
          <ReactQuill value={description} onChange={setDescription} modules={modules} formats={formats} />
            <input type="file" onChange={e => setThumbdnail(e.target.files[0])} accept='png,jpg,jpeg' />
            <button type='submit' className='btn primary'>Create post</button>
        </form>
      </div>
   </section>
  )
}

export default CreatePost
