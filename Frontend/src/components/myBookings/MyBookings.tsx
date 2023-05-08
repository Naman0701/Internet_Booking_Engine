import React, { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  errorStatus,
  getMyBookings,
  loadingStatus,
  myBookings,
} from "../../redux/slice/myBookingsSlice";
import { authUser } from "../../redux/slice/userSlice";
import { bookingDetailsType } from "../../types/DataTypes";
import "./MyBookings.scss";
import Snackbar from "../SnackBar/SnackBar";
import Loaders from "../Loaders/Loaders";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import {
  fetchRoomResultPageConfig,
  roomResultPageConfigData,
} from "../../redux/slice/configurationsSlice";
import RoomCrousal from "../roomResultPage/AvailableRooms/RoomCrousal/RoomCrousal";
import BookingDate from "../bookingConfirmationPage/BookedRoomDetail/BookingDate/BookingDate";
import {
  selectedCurrency,
  selectedCurrencyFactor,
} from "../../redux/slice/currencyConverterSlice";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const MyBookings: FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(authUser);
  const userBookings: bookingDetailsType[] = useAppSelector(myBookings);
  const loading = useAppSelector(loadingStatus);
  const error: boolean = useAppSelector(errorStatus);
  const currentCurrency = useAppSelector(selectedCurrency);
  const currencyFactor: number = useAppSelector(selectedCurrencyFactor);
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getMyBookings(user.id));
    dispatch(fetchRoomResultPageConfig());
  }, []);

  const roomtype = useAppSelector(roomResultPageConfigData).roomTypes;
  const status=false;

  const handleCardClick = (bookingId: string) => {
    navigate(`/bookingConfirmed?bookingId=${bookingId}`);
  };

  return (
    <>
      <div className="my-bookings">
        {error && <Snackbar errorStatus={error} errorType={"Data"} />}
        {loading && <Loaders />}
        {!loading && (
          <div className="my-bookings-content">
            
            {userBookings.length === 0 && (
              <div className="booking-status">
              {" "}
              <span className="emoji">{status ? "❌" : "❌"}</span>
              <h2 className="title">
                {status ? t("No Bookings Available") : t("No Bookings Available")}
              </h2>
              <p className="message">
                <a
                  href={
                      "/"
                  }
                  className="navigate"
                >
                  {" "}
                  {t("Click here")}
                </a>{" "}
                {status
                  ? t("to go back to the home page.")
                  : t("to go back to the home page.")}
              </p>
            </div>
            )}

            {userBookings.length > 0 &&
              userBookings.map((bookingData: bookingDetailsType) => (
                <span
                  key={bookingData.bookingId}
                  className={`my-bookings-card ${
                    bookingData.isDeleted ? "booking-cancel-div" : ""
                  }`}
                  onClick={() => handleCardClick(bookingData.bookingId)}
                >
                  <span className="my-bookings-crousal">
                    <RoomCrousal
                      images={
                        roomtype?.[
                          bookingData.roomType?.replace(" ", "_")?.toUpperCase()
                        ]?.images ?? []
                      }
                      height={"14rem"}
                      width={"100%"}
                    />
                  </span>

                  <div
                    className="my-content-section__room-detail"
                    key={bookingData.bookingId}
                  >
                    <span className="my-content-section__room-detail__booking-data">
                      <span className="my-bookings-details">
                        <span className="my-bookings-rooms">
                          {t("Room")} {bookingData.roomsList.join(",")} :{" "}
                          {t(
                            `${bookingData.roomType
                              .replace("_", " ")
                              ?.toUpperCase()}`
                          )}
                        </span>
                        <span className="my-booking-guest">
                          <PersonOutlineOutlinedIcon className="guest-icon" />{" "}
                          {t(`${bookingData.guests}`)}
                        </span>
                      </span>
                      <span
                        className="my-booking-data__date"
                        key={bookingData.bookingId}
                      >
                        <BookingDate
                          date={new Date(bookingData.checkInDate)}
                          dateType="Check In"
                        />
                        <BookingDate
                          date={new Date(bookingData.checkOutDate)}
                          dateType="Check Out"
                        />
                      </span>
                      <span className="my-booking-nightly-rate">{`${
                        currentCurrency.currencyIcon
                      } ${(
                        currencyFactor * parseFloat(bookingData.nightlyRate)
                      ).toFixed(2)}/${t("night total")}`}</span>

                      <span className="my-total-forstay">{`${t(
                        "Total for stay"
                      )}: ${currentCurrency.currencyIcon} ${(
                        currencyFactor * parseFloat(bookingData.totalForStay)
                      ).toFixed(2)}`}</span>
                    </span>
                  </div>
                </span>
              ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MyBookings;