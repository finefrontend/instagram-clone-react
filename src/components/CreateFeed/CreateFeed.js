import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Header';
import SelectedBox from './SelectedBox';
import Library from './Library';
import InputArea from './InputArea';

const CreateFeed = ({ isUpdatePage }) => {
  const [selectedImage, setSelectedImage] = useState('');
  const [step, setStep] = useState(0);
  const [textareaValue, setTextareaValue] = useState('');

  const { id } = useParams();
  const updateItemId = useMemo(() => id, [id]);

  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  const setInitialFeedData = useCallback(() => {
    const index = state.findIndex(
      (item) => item.contentNo === Number(updateItemId)
    );

    if (index !== -1) {
      const { imageSrc, text } = state[index];

      setSelectedImage(imageSrc);
      setTextareaValue(text);
    }
  }, [state, updateItemId]);

  const handleChangeImage = useCallback((image) => {
    setSelectedImage(`/assets/images/library/${image}`);
  }, []);

  const handleChangeStep = useCallback((value) => {
    setStep(value);
  }, []);

  const handleChageTextarea = useCallback((e) => {
    setTextareaValue(e.target.value);
  }, []);

  const createFeed = useCallback(() => {
    const newContentNo = state[0].contentNo + 1;

    navigate('/', {
      state: [
        {
          contentNo: newContentNo,
          nickname: 'user1',
          country: 'Seoul, South Korea',
          profile: '/assets/images/thumb.png',
          imageSrc: selectedImage,
          likeCount: 2346,
          text: textareaValue,
        },
        ...state,
      ],
    });
  }, [navigate, selectedImage, state, textareaValue]);

  const updateFeed = useCallback(() => {
    const newState = state.map((feed) =>
      feed.contentNo === Number(updateItemId)
        ? {
            ...feed,
            imageSrc: selectedImage,
            text: textareaValue,
          }
        : feed
    );

    navigate('/', {
      state: newState,
    });
  }, [navigate, selectedImage, state, textareaValue, updateItemId]);

  const handleSubmit = useCallback(() => {
    if (isUpdatePage && updateItemId) {
      updateFeed();

      return;
    }

    createFeed();
  }, [createFeed, isUpdatePage, updateFeed, updateItemId]);

  useEffect(() => {
    if (!isUpdatePage || !updateItemId) return;

    setInitialFeedData();
  }, [isUpdatePage, setInitialFeedData, updateItemId]);

  return (
    <CreateFeedWrapper>
      <Header
        handleChangeStep={handleChangeStep}
        handleSubmit={handleSubmit}
        step={step}
        isSelectedImage={!!selectedImage}
      />
      {step == 0 && (
        <>
          <SelectedBox selectedImage={selectedImage} />
          <Library handleChangeImage={handleChangeImage} />
        </>
      )}
      {step == 1 && (
        <InputArea
          handleChageTextarea={handleChageTextarea}
          textareaValue={textareaValue}
        />
      )}
    </CreateFeedWrapper>
  );
};

const CreateFeedWrapper = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100dvh;
  background: linear-gradient(135deg, #f3f4f6, #e8eaed);
`;

export default CreateFeed;
