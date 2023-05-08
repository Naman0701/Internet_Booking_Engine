/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  bookingId,
  getBookingStatus,
  getStatusErrorStatus,
  getStatusLoadingStatus,
  pushBookingErrorStatus,
  pushBookingLoadingStatus,
} from "../../redux/slice/checkoutSlice";
import Loaders from "../Loaders/Loaders";
import "./BookingProcessing.scss";
import BookingStatus from "./BookingStatus";

const BookingProcessing: FC = () => {
  const dispatch = useAppDispatch();
  const pushBookingLoading:boolean=useAppSelector(pushBookingLoadingStatus);
  const pushBookingError:boolean=useAppSelector(pushBookingErrorStatus);
  const getStatusLoading:boolean=useAppSelector(getStatusLoadingStatus);
  const getStatusError:boolean=useAppSelector(getStatusErrorStatus);
  const bookingID:string=useAppSelector(bookingId);  
  useEffect(() => {
    
    dispatch(getBookingStatus(bookingID));
  }, [dispatch]);
  return (
    <div className="booking-processing">
      {(pushBookingLoading || getStatusLoading) && <Loaders />}
      {!(pushBookingLoading) && !(getStatusLoading) && (pushBookingError || getStatusError) && <BookingStatus status={false}/>}
      {!(pushBookingLoading) && !(getStatusLoading) && !(pushBookingError || getStatusError) && <BookingStatus status={true}/>}
    </div>
  );
};

export default BookingProcessing;
