import React from "react";
import { useAppSelector } from "../../../redux/hooks";
import { bookingDetails } from "../../../redux/slice/bookingConfirmedSlice";
import { roomResultPageConfigData } from "../../../redux/slice/configurationsSlice";
import { selectedCurrency, selectedCurrencyFactor } from "../../../redux/slice/currencyConverterSlice";
import { bookingDetailsType } from "../../../types/DataTypes";
import RoomCrousal from "../../roomResultPage/AvailableRooms/RoomCrousal/RoomCrousal";
import "./BookedRoomDetail.scss";
import BookingDate from "./BookingDate/BookingDate";
import { useTranslation } from "react-i18next";

const BookedRoomDetail=()=> {
  const { t } = useTranslation();

  const currentCurrency=useAppSelector(selectedCurrency);
  const currencyFactor: number = useAppSelector(selectedCurrencyFactor);
  const roomType = useAppSelector(roomResultPageConfigData).roomTypes;

  const bookingData:bookingDetailsType = useAppSelector(bookingDetails);
  
  return (
    <div className="content-section__room-detail">
      <RoomCrousal
        images={
          roomType[bookingData.roomType.replace(" ", "_").toUpperCase()].images
        }
        height={"16rem"}
        width={"38%"}
      />
      <span className="content-section__room-detail__booking-data">
        <span className="booking-data__date">
          <BookingDate
            date={new Date(bookingData.checkInDate)}
            dateType="Check In"
          />
          <BookingDate
            date={new Date(bookingData.checkOutDate)}
            dateType="Check Out"
          />
        </span>
        <span className="booking-data__promo-details">
          <span className="promo-details__promo-title">
            {t(bookingData.promoTitle)}
          </span>
          {t(bookingData.promoDescription)}
        </span>
        <span className="booking-data__cancel">
          {t('Get 80% refund if you cancel before 2 days of your check-in date')}
          <span className="nightly-rate">{`${currentCurrency.currencyIcon} ${(
            currencyFactor * parseFloat(bookingData.nightlyRate)
          ).toFixed(2)}/${t('night total')}`}</span>
        </span>
      </span>
    </div>
  );
}

export default BookedRoomDetail;
