import React, { useState } from 'react';

import PropTypes from 'prop-types';
import './Feed.css';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import LikeIconOutlined from '@mui/icons-material/ThumbUpOutlined';
import LikeIconFilled from '@mui/icons-material/ThumbUp';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import PostDetail from './PostDetail';
import { likePosts } from '../api/axios';

import sendIcon from '../icons/Send.svg';
// import post1 from '../images/post1.jpg';

function Feed(props) {
  Feed.propTypes = {
    author: PropTypes.string.isRequired,
    img: PropTypes.string,
    avatar: PropTypes.string,
    likes: PropTypes.number.isRequired,
    likedBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired,
    commentIds: PropTypes.arrayOf(PropTypes.string),
    postId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    handlePostChange: PropTypes.func.isRequired
  };

  Feed.defaultProps = {
    img: '/',
    avatar: '/',
    commentIds: []
  };

  const {
    avatar,
    author,
    img,
    likes,
    commentIds,
    title,
    postId,
    userId,
    handlePostChange,
    likedBy
  } = props;

  const curUserId = '63899e8d4bd2e0bd159d0e10';

  const [detailOpen, setDetailOpen] = useState(false);
  const [postLiked, setPostLiked] = useState(likedBy.includes(curUserId));
  const [numLikes, setNumLikes] = useState(likes);

  const handleClick = () => {
    setDetailOpen(true);
  };

  const handleLikeClick = () => {
    setPostLiked((currentLike) => !currentLike);
    if (postLiked) setNumLikes(numLikes - 1);
    else setNumLikes(numLikes + 1);
    likePosts(postId, userId);
  };

  return (
    <div>
      <div style={{ display: 'none' }}>
        <PostDetail
          open={detailOpen}
          setOpen={setDetailOpen}
          author={author}
          avatar={avatar}
          img={img}
          likes={likes}
          likedBy={likedBy}
          commentIds={commentIds}
          title={title}
          commentNum={commentIds.length}
          postId={postId}
          userId={userId}
          handlePostChange={handlePostChange}
          handleLikeClickFeed={handleLikeClick}
        />
      </div>
      <div>
        <div className="post">
          <div className="postHead">
            <Avatar
              alt="me"
              className="Avatar"
              src={avatar}
              sx={{ width: 50, height: 50, marginTop: 1, marginBottom: 1 }}
            />
            <div className="post-head-detail">
              <p className="postUsername">{author}</p>
              <p className="postTime">20 minutes ago</p>
            </div>
          </div>
          <button type="button" onClick={handleClick}>
            <img src={img} alt="post" />
          </button>
          <div className="postActions">
            <div className="postStats">
              <div className="stats">
                <IconButton
                  onClick={handleLikeClick}
                  aria-label="like"
                  sx={{ curser: 'pointer' }}
                >
                  {postLiked ? (
                    <LikeIconFilled sx={{ color: 'orange!important' }} />
                  ) : (
                    <LikeIconOutlined />
                  )}
                </IconButton>
                <p>
                  {numLikes <= 1 ? `${numLikes} Like` : `${numLikes} Likes`}
                </p>
              </div>
              <div className="stats">
                <ForumOutlinedIcon />
                <p>{commentIds.length} Comments</p>
              </div>
            </div>
            <div className="postComment">
              <button type="submit" onClick={handleClick}>
                <img src={sendIcon} alt="send comment" />
              </button>
              <input
                type="text"
                placeholder="Post a comment"
                name="postComment"
                onClick={handleClick}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feed;
