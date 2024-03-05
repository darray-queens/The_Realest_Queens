import React from 'react';

import axios from 'axios';

import styled from 'styled-components';

import Review from './Review';

import Sort from './Sort';

import { Grid, Row, Col } from '../shared/containers';

const { useState, useEffect } = React;

function ReviewList({ currentProduct }) {
  const [reviews, setReviews] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [relevantReviews, setRelevantReviews] = useState([]);
  const [renderedReviews, setRenderedReviews] = useState(2);

  useEffect(() => {
    if (currentProduct && currentProduct.id) {
      const productId = currentProduct.id;
      axios.get(`reviews?product_id=${productId}&page=${pageNumber}&sort=relevant`)
        .then((response) => {
          if (response.data.results.length !== 0) {
            setRelevantReviews((prevReviews) => prevReviews.concat(response.data.results));
            setReviews((prevReviews) => prevReviews.concat(response.data.results));
            setPageNumber((prevPageNumber) => prevPageNumber + 1);
          }
        })
        .catch((err) => {
          console.error('failed to set list: ', err);
        });
    }
  }, [currentProduct, pageNumber]);

  if (reviews.length === 0) {
    return <div>No reviews loaded</div>;
  }

  const moreReviews = () => {
    setRenderedReviews((prevRenderedReviews) => prevRenderedReviews + 2);
  };

  return (
    <div id="reviews">
      <h2>Ratings & Reviews</h2>
      <Sort reviews={reviews} setReviews={setReviews} relevantReviews={relevantReviews} />
      <StylesDiv>
        {reviews.slice(0, renderedReviews).map((review) => (
          <Review key={review.review_id} entry={review} />
        ))}
      </StylesDiv>
      {renderedReviews < reviews.length && (
      <button
        type="button"
        onClick={moreReviews}
      >
        More Reviews
      </button>
      )}
    </div>
  );
}

const StylesDiv = styled.div`
  overflow: auto;
  max-height: 650px;
`;

export default ReviewList;
