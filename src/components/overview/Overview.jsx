import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

import Images from './Images';
import StarRating from './StarRating';
import ProductInfo from './ProductInfo';
import Share from './Share';
import Styles from './Styles';
import Selection from './Selection';
import ProductDescription from './ProductDescription';
import Loading from './Loading';

import { Grid, Row, Col } from '../shared/containers';

const { useState, useEffect } = React;

function Overview({ currentProduct }) {
  const [styles, setStyles] = useState([]);
  const [currentSku, setCurrentSku] = useState();
  const [currentStyle, setCurrentStyle] = useState({});
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  async function getStyles() {
    const response = await axios.get(`/products/${currentProduct.id}/styles`)
      .catch((error) => console.error(error));

    setStyles(response.data.results);
    setCurrentStyle(response.data.results[0]);
    setMainImageIndex(0);
    setCurrentSku();
    setIsLoading(false);
  }

  useEffect(() => {
    if (Object.keys(currentProduct).length > 0) {
      getStyles();
    }
  }, [currentProduct]);

  return (
    <OverviewGrid>
      <Row id="image-info-row">
        <ImgCol size={3}>
          <div>
            {isLoading ? (
              <Loading />
            ) : (
              <Images
                styleImages={currentStyle.photos}
                mainImageIndex={mainImageIndex}
                changeMainImageIndex={setMainImageIndex}
              />
            )}
          </div>
        </ImgCol>
        <Col id="info-col" size={1}>
          <StarRating />
          <ProductInfo product={currentProduct} style={currentStyle} />
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <Share
                currentProduct={currentProduct}
                styleImage={styles[0].photos[0].thumbnail_url}
              />
              <Styles
                currentStyles={styles}
                currentStyle={currentStyle}
                changeStyle={setCurrentStyle}
                changeMainImageIndex={setMainImageIndex}
              />
              <Selection
                style={currentStyle}
                sku={currentSku}
                changeSku={setCurrentSku}
              />
            </>
          )}
        </Col>
      </Row>
      <Row>
        <ProductDescription
          description={currentProduct.description}
          features={currentProduct.features}
        />
      </Row>
    </OverviewGrid>
  );
}

const OverviewGrid = styled(Grid)`
  margin-left: auto;
  margin-right: auto;
  max-width: 1100px;
`;

const ImgCol = styled(Col)`
  margin-right: 20px;
`;

export default Overview;
