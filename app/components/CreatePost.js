import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Page from './Page';
import axios from 'axios';
import ExampleContext from '../ExampleContext';

const CreatePost = props => {
  const [title, setTitle] = useState();
  const [body, setBody] = useState();
  const navigate = useNavigate();

  const { addFlashMessage } = useContext(ExampleContext);

  async function submitHandler(e) {
    e.preventDefault();

    try {
      const response = await axios.post('/create-post', { title, body, token: localStorage.getItem('complexappToken') });
      // redirect to new post URL
      addFlashMessage('Congrats, you created a new post!');
      navigate(`/post/${response.data}`);
      console.log('New Post was created.');
    } catch (e) {
      console.log('There was a problem.');
    }
  }
  return (
    <Page title='Create New Post'>
      <form onSubmit={submitHandler}>
        <div className='form-group'>
          <label htmlFor='post-title' className='text-muted mb-1'>
            <small>Title</small>
          </label>
          <input value={title} onChange={e => setTitle(e.target.value)} autoFocus name='title' id='post-title' className='form-control form-control-lg form-control-title' type='text' placeholder='' autoComplete='off' />
        </div>

        <div className='form-group'>
          <label htmlFor='post-body' className='text-muted mb-1 d-block'>
            <small>Body Content</small>
          </label>
          <textarea onChange={e => setBody(e.target.value)} name='body' id='post-body' className='body-content tall-textarea form-control' type='text' value={body}></textarea>
        </div>

        <button className='btn btn-primary'>Save New Post</button>
      </form>
    </Page>
  );
};

export default CreatePost;
