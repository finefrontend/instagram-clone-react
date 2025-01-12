import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

export default function Feed({
  contentNo,
  nickname,
  country,
  profile,
  imageSrc,
  likeCount,
  text,
  handleDeleteFeed,
  handleUpdateFeed,
}) {
  const [isOpenMorePopup, setIsOpenMorePopup] = useState(false);
  const handleClickMoreButton = useCallback(() => {
    setIsOpenMorePopup(!isOpenMorePopup);
  }, [isOpenMorePopup]);

  return (
    <StyledFeed>
      <div className="feed_user_info">
        <div className="user_container">
          <div className="user_profile_img">
            <img src={profile} alt={profile} />
          </div>
          <div className="user_name">
            <div className="nick_name m_text">{nickname}</div>
            <div className="country s_text">{country}</div>
          </div>
        </div>

        <div className="feed_icon_more">
          <img
            src="/assets/images/icons/more.png"
            alt="more icon"
            onClick={handleClickMoreButton}
          />

          <ul className={`more_popup ${isOpenMorePopup && 'active'}`}>
            <li onClick={() => handleUpdateFeed(contentNo)}>수정</li>
            <li onClick={() => handleDeleteFeed(contentNo)}>삭제</li>
          </ul>
        </div>
      </div>

      <div className="feed_img">
        <img src={imageSrc} alt="피드 이미지" />
      </div>
      <div className="feed_details">
        <div className="feed_icons">
          <a href="#" className="icon">
            <img src="/assets/images/icons/like.png" alt="like Icon" />
          </a>
          <a href="#" className="icon">
            <img src="/assets/images/icons/comment.png" alt="comment Icon" />
          </a>
          <a href="#" className="icon">
            <img src="/assets/images/icons/msg.png" alt="share Icon" />
          </a>
          <a href="#" className="icon bookmark">
            <img src="/assets/images/icons/bookmark.png" alt="bookmark Icon" />
          </a>
        </div>

        <div className="feed_likes">
          <div className="likes_profile_img">
            <img src="/assets/images/thumb.png" alt="프로필이미지" />
          </div>
          <div className="likes m_text">
            좋아요
            <span id="like-count-39"> {likeCount}</span>
            <span id="bookmark-count-39"></span>개
          </div>
        </div>

        <div className="feed_text">
          <div className="user_name m_text">{nickname}</div>
          <div className="s_text">{text}</div>
        </div>
      </div>
    </StyledFeed>
  );
}

const StyledFeed = styled.article`
  margin-bottom: 30px;
  border-top: 1px solid #c6c6c8;

  &:first-child {
    border: none;
  }

  .feed_user_info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;

    .user_profile_img {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 10px;

      img {
        width: 100%;
      }
    }

    .user_container {
      display: flex;
      align-items: center;
    }
  }

  .feed_icon_more {
    width: 14px;
    position: relative;

    img {
      width: 100%;
    }

    .more_popup {
      position: absolute;
      top: calc(100% + 4px);
      width: 80px;
      right: 0;
      background: #fff;
      border: 1px solid #ccc;
      border-radius: 5px;
      padding: 8px 0;
      display: none;

      li {
        padding: 8px 16px;
        text-align: center;
        font-weight: bold;
      }
      &.active {
        display: block;
      }
    }
  }

  .feed_img img {
    width: 100%;
    display: block;
  }

  .feed_details {
    padding: 14px 14px 0 14px;

    .feed_icons {
      display: flex;
      align-items: center;
      margin-bottom: 10px;

      .icon {
        width: 23px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        margin-left: 18px;

        &.bookmark {
          width: 20px;
          margin-left: auto;
        }

        &:first-child {
          margin-left: 0;
        }

        img {
          width: 100%;
        }
      }
    }

    .feed_likes {
      display: flex;
      align-items: center;
      margin-bottom: 5px;

      .likes_profile_img {
        width: 17px;
        margin-right: 6px;

        img {
          width: 100%;
        }
      }
    }

    .feed_text {
      display: flex;

      .user_name {
        margin-right: 5px;
      }
    }
  }
`;
