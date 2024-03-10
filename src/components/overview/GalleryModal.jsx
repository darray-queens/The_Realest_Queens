import React from 'react';
import styled from 'styled-components';

import ThumbnailMenu from './ThumbnailMenu';

import { Row } from '../shared/containers';
import {
  PrevThumb,
  NextThumb,
  PrevMain,
  NextMain,
} from './imageNavButtons';
import galleryHandlers from './galleryHandlers';

const { useState, useCallback } = React;

const {
  handleNextThumb,
  handlePrevThumb,
  handleNextMain,
  handlePrevMain,
  handleZoom,
  onMovement,
} = galleryHandlers;

const ModalContainer = styled.div`
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  height: 100vh;
  width: 100%;
  overflow: hidden;
  z-index: 98;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ModalImage = styled.div`
  position: fixed;
  background-repeat: no-repeat;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  z-index: 93;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ModalMenuCol = styled(Row)`
  position: absolute;
  z-index: 1;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const ModalNavContainer = styled(Row)`
  height: 50px;
  width: 50px;
  justify-content: center;
`;

const ModalPrevThumb = styled(PrevThumb)`
  z-index: 98;
`;

const ModalNextThumb = styled(NextThumb)`
  z-index: 97;
`;

const ModalPrevMain = styled(PrevMain)`
  z-index: 96;
`;

const ModalNextMain = styled(NextMain)`
  z-index: 95;
`;

const ModalClose = styled(NextMain)`
  z-index: 94;
  top: 70px;
`;

function GalleryModal({
  styleImages,
  mainImageIndex,
  changeMainImageIndex,
  maxThumbIndex,
  changeMaxThumbIndex,
  minThumbIndex,
  changeMinThumbIndex,
  toggleGalleryModal,
}) {
  const [isZoomed, setIsZoomed] = useState(false);

  const handleMovement = useCallback(onMovement, []);

  const imageCount = styleImages.length;

  const styles = {
    backgroundImage: `url(${styleImages[mainImageIndex].url})`,
    backgroundPosition: !isZoomed && 'center',
    backgroundSize: isZoomed ? '125%' : 'contain',
  };

  return (
    <ModalContainer>
      <ModalMenuCol>
        <ModalNavContainer>
          <ModalPrevThumb
            style={{ display: minThumbIndex === 0 ? 'none' : 'inherit', zIndex: '99' }}
            onClick={() => {
              changeMinThumbIndex((prevIndex) => handlePrevThumb(minThumbIndex, prevIndex));
              changeMaxThumbIndex((prevIndex) => handlePrevThumb(minThumbIndex, prevIndex));
            }}
          >
            &#x2c4;
          </ModalPrevThumb>
        </ModalNavContainer>
        <ThumbnailMenu
          styleImages={styleImages}
          minThumbIndex={minThumbIndex}
          maxThumbIndex={maxThumbIndex}
          changeMainImageIndex={changeMainImageIndex}
        />
        <ModalNavContainer>
          <ModalNextThumb
            style={{ display: maxThumbIndex === imageCount - 1 ? 'none' : 'inherit' }}
            onClick={() => {
              changeMinThumbIndex(
                (prevIndex) => handleNextThumb(maxThumbIndex, prevIndex, imageCount),
              );
              changeMaxThumbIndex(
                (prevIndex) => handleNextThumb(maxThumbIndex, prevIndex, imageCount),
              );
            }}
          >
            &#x2c5;
          </ModalNextThumb>
        </ModalNavContainer>
      </ModalMenuCol>
      <ModalImage
        id="modal-main-image"
        style={styles}
        onClick={() => setIsZoomed((prevState) => handleZoom(prevState, handleMovement))}
      />
      <ModalPrevMain
        style={{ display: mainImageIndex === 0 ? 'none' : 'inherit' }}
        onClick={() => changeMainImageIndex(
          (prevIndex) => handlePrevMain(mainImageIndex, prevIndex, imageCount),
        )}
      >
        &#10094;
      </ModalPrevMain>
      <ModalNextMain
        style={{ display: mainImageIndex === imageCount - 1 ? 'none' : 'inherit' }}
        onClick={() => changeMainImageIndex(
          (prevIndex) => handleNextMain(mainImageIndex, prevIndex, imageCount),
        )}
      >
        &#10095;
      </ModalNextMain>
      <ModalClose
        onClick={() => toggleGalleryModal(false)}
      >
        &#10005;
      </ModalClose>
    </ModalContainer>
  );
}

export default GalleryModal;
