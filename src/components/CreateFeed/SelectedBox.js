import React from 'react';
import styled from 'styled-components';

const SelectedBox = ({ selectedImage }) => {
  return (
    <SelectedBoxWrapper>
      {selectedImage && <img src={selectedImage} />}
    </SelectedBoxWrapper>
  );
};

const SelectedBoxWrapper = styled.section`
  width: 100%;
  aspect-ratio: 1 / 1;
  background-color: lightgray;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

export default SelectedBox;
