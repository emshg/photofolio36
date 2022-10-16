import React from 'react';
import PropTypes from 'prop-types';
import './HomePage.css';
import { Avatar } from '@mui/material';
import Fab from '@mui/material/Fab';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import FeedList from './FeedList';
import CreatePostModal from './CreatePostModal';
import FollowRecommendation from './FollowRecommendation';

import userMe from '../images/userMe.jpg';
import searchIcon from '../icons/Search.svg';
import NewIcon from '../icons/New.svg';

function HomePage(props) {
  HomePage.propTypes = {
    closePostModal: PropTypes.func.isRequired,
    postModalIsOpen: PropTypes.bool.isRequired,
    setPostModalOpen: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired
  };

  const { closePostModal, postModalIsOpen, setPostModalOpen, setAlert } = props;
  const orange = createTheme({
    status: {
      danger: '#e53e3e'
    },
    palette: {
      primary: {
        main: '#FFDD2B',
        darker: '#000'
      },
      neutral: {
        main: '#FFDD2B',
        contrastText: '#FFF'
      }
    }
  });

  return (
    <div className="flex1">
      <CreatePostModal
        closeModal={closePostModal}
        open={postModalIsOpen}
        setAlert={setAlert}
      />
      <div className="main">
        <div className="users-section">
          <div className="user">
            <Avatar
              alt="me"
              className="Avatar"
              src={userMe}
              sx={{ width: 100, height: 100 }}
            />
            <h3>Tatiana Dokidis</h3>
          </div>
          <div className="recommendations">
            <div style={{ marginBottom: '.5em' }}>Recommended for you</div>
            <FollowRecommendation />
          </div>
        </div>

        <div className="right-section">
          <div className="right-top">
            <div className="searchbar">
              <input
                type="text"
                placeholder="Tag, user, etc..."
                name="search"
              />
              <button type="submit">
                <img src={searchIcon} alt="search" /> Search{' '}
              </button>
            </div>
            <div className="newpost">
              <ThemeProvider theme={orange}>
                <Fab
                  variant="extended"
                  color="primary"
                  sx={{ mb: 20 }}
                  onClick={() => setPostModalOpen((o) => !o)}
                >
                  <img src={NewIcon} className="newPostSign" alt="new" />
                  New Post
                </Fab>
              </ThemeProvider>
            </div>
          </div>

          <div className="feed">
            <FeedList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;