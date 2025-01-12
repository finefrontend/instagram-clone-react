import React, { useCallback, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Feed from './Feed';
import Story from './Story';

const storyData = [
  {
    isNew: true,
    profile: '/assets/images/thumb.png',
    nickname: 'frontend1',
  },
  {
    isNew: false,
    profile: '/assets/images/thumb.png',
    nickname: 'frontend2',
  },
  {
    isNew: true,
    profile: '/assets/images/thumb.png',
    nickname: 'frontend3',
  },
];

const feedData = [
  {
    contentNo: 3,
    nickname: 'joshua_l1',
    country: 'Seoul, South Korea',
    profile: '/assets/images/thumb.png',
    imageSrc: '/assets/images/posting_img.png',
    likeCount: 2346,
    text: 'The game in Japan was amazing and I want to share some photos1',
  },
  {
    contentNo: 2,
    nickname: 'joshua_l2',
    country: 'Seoul, South Korea',
    profile: '/assets/images/thumb.png',
    imageSrc: '/assets/images/posting_img.png',
    likeCount: 2346,
    text: 'The game in Japan was amazing and I want to share some photos2',
  },
  {
    contentNo: 1,
    nickname: 'joshua_l3',
    country: 'Seoul, South Korea',
    profile: '/assets/images/thumb.png',
    imageSrc: '/assets/images/posting_img.png',
    likeCount: 2346,
    text: 'The game in Japan was amazing and I want to share some photos3',
  },
];

const Main = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state: newFeedList } = location;

  const initialFeedList = useMemo(() => newFeedList || feedData, [newFeedList]);

  const [feedList, setFeedList] = useState(initialFeedList);

  const handleDeleteFeed = useCallback(
    (contentNo) => {
      const newArr = feedList.filter((feed) => {
        return feed.contentNo !== contentNo;
      });

      setFeedList(newArr);
    },
    [feedList]
  );

  const handleUpdateFeed = useCallback(
    (id) => {
      navigate(`/update-feed/${id}`, {
        state: [...feedList],
      });
    },
    [feedList, navigate]
  );

  return (
    <section id="container">
      <header id="header_section">
        <nav className="header_inner">
          <div className="icon">
            <img src="/assets/images/icons/camera.png" alt="Camera Icon" />
          </div>

          <div className="logo">
            <img src="/assets/images/logo.png" alt="Instagram Logo" />
          </div>

          <div className="icons">
            <div className="icon">
              <img src="/assets/images/icons/igtv.png" alt="IGTV Icon" />
            </div>
            <div className="icon">
              <img src="/assets/images/icons/msg.png" alt="Message Icon" />
            </div>
          </div>
        </nav>
      </header>

      <main>
        <section id="story_section">
          <div className="story_scroll">
            {storyData.map(({ isNew, profile, nickname }, index) => (
              <Story
                key={`story_${profile}_${nickname}_${index}`}
                isNew={isNew}
                profile={profile}
                nickname={nickname}
              />
            ))}
          </div>
        </section>

        <section id="feed_section">
          {feedList.map(
            (
              {
                contentNo,
                nickname,
                profile,
                country,
                imageSrc,
                likeCount,
                text,
              },
              index
            ) => (
              <Feed
                key={`feed_${profile}_${nickname}_${index}`}
                handleDeleteFeed={handleDeleteFeed}
                handleUpdateFeed={handleUpdateFeed}
                contentNo={contentNo}
                nickname={nickname}
                profile={profile}
                country={country}
                imageSrc={imageSrc}
                likeCount={likeCount}
                text={text}
              />
            )
          )}
        </section>
      </main>

      <footer id="bnb_section">
        <nav className="bnb_inner">
          <div className="bnb_icon">
            <img src="/assets/images/icons/home.png" alt="home Icon" />
          </div>
          <div className="bnb_icon">
            <img src="/assets/images/icons/search.png" alt="search Icon" />
          </div>
          <div
            className="bnb_icon"
            onClick={() => navigate('/create-feed', { state: feedList })}
          >
            <img src="/assets/images/icons/add.png" alt="add Icon" />
          </div>
          <div className="bnb_icon">
            <img src="/assets/images/icons/like.png" alt="like Icon" />
          </div>
          <div className="bnb_icon">
            <img
              src="/assets/images/thumb.png"
              alt="Profile Icon"
              className="profile-icon"
            />
          </div>
        </nav>
      </footer>
    </section>
  );
};

export default Main;
