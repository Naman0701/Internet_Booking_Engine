import React, { FC, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  bookingDetails,
  bookingId,
  cancelBooking,
  emailErrorStatus,
  errorMessage,
  errorStatus,
  generateOtp,
  getBookingData,
  loadingStatus,
  otpVerified,
  sendConfirmationEmail,
  setActiveAccordian,
  setBookingId,
  setOtpVerified,
  verifyOtp,
} from "../../redux/slice/bookingConfirmedSlice";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import "./BookingConfirmationPage.scss";
import {
  fetchBookingsPageConfig,
  fetchRoomResultPageConfig,
  roomResultPageConfigData,
} from "../../redux/slice/configurationsSlice";
import BookedRoomDetail from "./BookedRoomDetail/BookedRoomDetail";
import AccordianDetail from "./AccordianDetails/AccordianDetail";
import { bookingDetailsType } from "../../types/DataTypes";
import Snackbar from "../SnackBar/SnackBar";
import { authUser } from "../../redux/slice/userSlice";
import { Modal } from "@mui/material";
import Loaders from "../Loaders/Loaders";
import { useTranslation } from "react-i18next";

const BookingConfirmationPage: FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState<string>("");
  const roomType = useAppSelector(roomResultPageConfigData).roomTypes;
  const error: boolean = useAppSelector(errorStatus);
  const emailError: boolean = useAppSelector(emailErrorStatus);
  const bookingData: bookingDetailsType = useAppSelector(bookingDetails);
  const isLoggedIn:boolean=useAppSelector(authUser).isAuthenticated;
  const loggedInMail: string = useAppSelector(authUser).email;
  const otpIsVerified: boolean = useAppSelector(otpVerified);
  const otpErrorMessage: string = useAppSelector(errorMessage);
  const inputRef = useRef<HTMLInputElement>(null);
  const selectedBookingId: string = useAppSelector(bookingId);
  const loading: boolean = useAppSelector(loadingStatus);
  const [open, setOpen] = useState(false);
  const [isAuthenticated,setIsAuthenticated]=useState<boolean>(false);

  const { t } = useTranslation();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(fetchBookingsPageConfig());
    const searchParams = new URLSearchParams(location.search);
    const paramsBookingId = searchParams.get("bookingId");
    dispatch(setOtpVerified(false));
    dispatch(fetchRoomResultPageConfig());
    if (paramsBookingId && !error) {
      dispatch(setBookingId(paramsBookingId));
    } else {
      navigate("/");
    }
  }, [dispatch, location.search, navigate, error]);
  useEffect(() => {
    if (selectedBookingId !== "") {
      dispatch(getBookingData(selectedBookingId));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBookingId, dispatch]);
  useEffect(()=>{
    if(isLoggedIn && bookingData.email!=="" &&bookingData.email===loggedInMail)
    {
    setIsAuthenticated(true);
    }
    else{
      setIsAuthenticated(false)
    }
  },[dispatch]);
  const printBookingConfirmation = () => {
    dispatch(setActiveAccordian("All"));
    setTimeout(() => {
      window.print();

      dispatch(setActiveAccordian(""));
    }, 1);
  };
  const sendBookingMail = () => {
    dispatch(sendConfirmationEmail());
  };
  const translateGuest = (guest:string) => {
    const guestEnglish = guest.split(" ");
    let guestTranslated = "";
    guestEnglish.forEach((item) => {
      const translatedItem = isNaN(parseInt(item)) ? t(item) : item;
      guestTranslated += translatedItem + " ";
    });
    return guestTranslated;
  };

  useEffect(() => {
    if (otpIsVerified) {
      cancelThisBooking();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otpIsVerified]);

  const cancelThisBooking = () => {
    dispatch(cancelBooking());
    dispatch(getBookingData(selectedBookingId));
  };
  const handleCancelBooking = () => {
    
    if (isAuthenticated || otpIsVerified || bookingData.email===loggedInMail) {
      handleClose();
      cancelThisBooking();
    } else if (!open) {
      dispatch(generateOtp());
      handleOpen();
    }
  };
  const handleVerifyOtp = () => {
    dispatch(verifyOtp(otp));
    handleCancelBooking();
  };
  const handleInputChange = () => {
    if (inputRef.current) {
      const regex = /^\d{0,4}$/;
      if (regex.test(inputRef.current.value)) {
        setOtp(inputRef.current.value);
      }
    }
  };
  return (
    <div className="bookingConfirmation">
      {emailError && <Snackbar errorStatus={emailError} errorType={"Mail"} />}
      {/* {loading && <Loaders/>} */}
      {bookingData.isDeleted && (
        <span className="cancelledBanner">{t("CANCELLED")}</span>
      )}

      {loading && <Loaders />}
      {!loading && (
        <div
          className={`booking-confirmation-div ${
            bookingData.isDeleted ? "booking-cancel-div" : ""
          }`}
        >
          <span className="booking-confirmation-div__heading-section">
            <h1 className="booking-confirmation-div__heading">
              {t("Upcoming Reservation")} #{bookingData.bookingId}
            </h1>
            <div className="booking-confirmation-div__operations-div">
              <span
                className="booking-confirmation-div__operations"
                onClick={printBookingConfirmation}
              >
                {t("Print")}
              </span>
              <span
                className="booking-confirmation-div__operations"
                onClick={sendBookingMail}
              >
                {t("Email")}
              </span>
            </div>
          </span>
          <div className="booking-confirmation-div__content-section">
            <div className="content-section__heading">
              <span className="booking-confirmation-div__room-details">
                {t("Room")} {bookingData.roomsList.join(",")} :{" "}
                {t(bookingData.roomType.replace("_", " ").toUpperCase())}
              </span>
              <span className="booking-confirmation-div__guest-details">
                <PersonOutlineOutlinedIcon className="guest-icon" />{" "}
                {translateGuest(bookingData.guests)}
              </span>
              <span
                className="booking-confirmation-div__operations__cancel"
                onClick={handleCancelBooking}
              >
                {t("Cancel Room")}
              </span>
              {!isAuthenticated && !otpIsVerified && (
                <Modal open={open} onClose={handleClose} className="otp-modal">
                  <div className="otp-modal__container">
                    <span className="otp-modal__title">
                      {t("Enter OTP for cancelling the room booking")}
                    </span>
                    <input
                      type="text"
                      className="otp-modal__input"
                      onChange={handleInputChange}
                      value={otp}
                      ref={inputRef}
                    />
                    {otpErrorMessage !== "" && (
                      <span className="otp-modal__error">
                        {t(otpErrorMessage)}
                      </span>
                    )}
                    <button className="otp-modal__close" onClick={handleClose}>
                      X
                    </button>
                    <button
                      className="otp-modal__verify"
                      disabled={otp.length < 4}
                      onClick={handleVerifyOtp}
                    >
                      {t("CONFIRM OTP")}
                    </button>
                  </div>
                </Modal>
              )}
            </div>
            {roomType !== null && <BookedRoomDetail />}
            <AccordianDetail />
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingConfirmationPage;
