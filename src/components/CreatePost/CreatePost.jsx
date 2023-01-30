import { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';
import { FileUploader } from 'react-drag-drop-files';

import postsApi from '../../api/posts';
import { getPosts } from '../../redux/actions/posts';

import Button from '../UI/Button';

import './CreatePost.scss';
import image from '../../assets/upload.svg';
import spinner from '../../assets/spinner.svg';

const fileTypes = ['JPG', 'PNG', 'GIF'];

const CreatePost = () => {
  const textareaRef = useRef(null);

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  console.log(file);

  const uploadHandler = (e) => {
    setFile(e.target.files[0]);
  };

  const handleChange = (file) => {
    setFile(file);
  };

  const postHandler = () => {
    setLoading(true);

    let formData = new FormData();

    formData.append('image', file);
    formData.append('content', textareaRef.current.value);

    postsApi
      .createPost(formData) // this is the same as above
      .then((res) => {
        setOpen(false);
      })
      .finally(() => {
        setLoading(false);
        dispatch(getPosts());
      });
  };

  // class if from PostOverlay component
  const overlay = (
    <div
      className='create-overlay__backdrop'
      onClick={() => {
        setOpen(false);
      }}
    ></div>
  );

  const postOverlay = (
    <div className='create-overlay'>
      <div className='create-overlay__preview'>
        {file && (
          <img
            src={file ? URL.createObjectURL(file) : image}
            alt=''
            className='create-overlay__preview-img'
          />
        )}
      </div>

      <div className='file-input'>
        <input
          type='file'
          name='file-input'
          id='file-input'
          className='file-input__input'
          onChange={uploadHandler}
        />
        <label className='file-input__label' htmlFor='file-input'>
          <svg
            aria-hidden='true'
            focusable='false'
            data-prefix='fas'
            data-icon='upload'
            className='svg-inline--fa fa-upload fa-w-16'
            role='img'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 512 512'
          >
            <path
              fill='currentColor'
              d='M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z'
            ></path>
          </svg>
          <span>Upload file</span>
        </label>
      </div>

      <textarea
        ref={textareaRef}
        name='content'
        placeholder='Whats on your mind?'
        minLength='138'
        maxLength='150'
      ></textarea>

      <Button onClick={postHandler}>Post your image</Button>
    </div>
  );

  return (
    <>
      <button
        className='create-overlay__btn'
        onClick={() => {
          setOpen(true);
        }}
      >
        Post
      </button>
      {open && createPortal(overlay, document.querySelector('#post-portal'))}
      {open &&
        createPortal(postOverlay, document.querySelector('#post-portal'))}
    </>
  );
};

export default CreatePost;
