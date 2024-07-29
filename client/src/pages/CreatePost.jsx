import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 


const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Uncategorized');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbdnail] = useState('');

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
  return (
    <section className="create-post">
      <div className="container">
        <h2>Create Post</h2>
        <p className="form__error-message">This is an error messs</p>
        <form action="" className='form form create-post__form'>
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
