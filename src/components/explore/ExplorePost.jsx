import { useState } from 'react';

import PostOverlay from '../posts/PostOverlay';

import './ExplorePost.scss';

const ExplorePost = (props) => {
  const [open, setOpen] = useState(false);

  const closeOverlay = () => {
    setOpen(false);
  };

  return (
    <div className="explore-post">
      <img src={props.src} alt="" onClick={() => setOpen(true)} />

      {open && (
        <PostOverlay
          id={props.id}
          user_id={props.user_id}
          closeOverlay={closeOverlay}
        />
      )}
    </div>
  );
};

export default ExplorePost;

