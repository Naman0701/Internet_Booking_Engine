import React, { FC, useState } from "react";
import { Rating } from "@mui/material";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import { ratingLabels } from "../../utils/constants/Constants";
import "./ReviewAndRating.scss";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  postRatingResponse,
  ratingErrorStatus,
  ratingSubmitted,
} from "../../redux/slice/ratingsSlice";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { landingPageConfigData } from "../../redux/slice/configurationsSlice";
import { useLocation } from 'react-router-dom';



const ReviewAndRating: FC = () => {
  const [value, setValue] = useState<number | null>(2.5);
  const [hover, setHover] = useState<number | -1>(-1);
  const [review, setReview] = useState<string>("");
  const location = useLocation();


  const getLabelText = (value: number) => {
    return `${value} Star${value !== 1 ? "s" : ""}`;
  };

  const labels = ratingLabels;

  const handleReviewChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReview(event.target.value);
  };
  const dispatch = useAppDispatch();

  const errorStatus = useAppSelector(ratingErrorStatus);

  const isSubmitted = useAppSelector(ratingSubmitted);
  const hotelBanner: String = useAppSelector(landingPageConfigData).hotelBanner;

  const handleSubmit = () => {

    const searchParams = new URLSearchParams(location.search);
    const paramsBookingId = searchParams.get("bookingId");
    
    const requestBody = {
      bookingId: `${paramsBookingId}`,
      rating: value === null ? 1 : value,
      review: review,
    };
    dispatch(postRatingResponse(requestBody));
  };

  return (
    <div
      className="rating-wrapper"
      style={{
        backgroundImage: `url(${hotelBanner})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      {isSubmitted ? (
        <div className="thank-you-message">
          Thank you for your valuable feedback &nbsp;<CheckCircleIcon/>
        </div>
      ) : errorStatus === false ? (
        <div className="rating-review-page">
          <span className="rating-review-page__title">
            We hope you enjoyed the stay. Kindly provide your valuable review &nbsp; <ThumbUpAltIcon/>
          </span>
          <span>
            <Rating
              name="hover-feedback"
              className="rating-input"
              value={value}
              precision={0.5}
              getLabelText={getLabelText}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
              emptyIcon={
                <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
              }
            />
            {value !== null && (
              <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
            )}
          </span>
          <input
            type="text"
            className="review-input"
            value={review}
            onChange={handleReviewChange}
          />

          <button
            type="submit"
            className="review-submit-buttom"
            onClick={handleSubmit}
          >
            Submit Review
          </button>
        </div>
      ) : (
        <div className="already-reviewed">The feedback is already recorded&nbsp; <CheckCircleIcon /></div>
      )}
    </div>
  );
};

export default ReviewAndRating;
