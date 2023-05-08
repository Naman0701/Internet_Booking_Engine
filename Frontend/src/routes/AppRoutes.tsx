import { FC } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import LandingPage from "../components/landingPage/LandingPage";
import RoomResultPage from "../components/roomResultPage/RoomResultPage";
import TestComponent from "../components/testComponent/TestComponent";
import Login from "../components/login/Login";
import CheckoutPage from "../components/checkoutPage/CheckoutPage";
import ReviewAndRating from "../components/rating/ReviewAndRating";
import BookingConfirmationPage from "../components/bookingConfirmationPage/BookingConfirmationPage";
import BookingProcessing from "../components/bookingProcessingPage/BookingProcessing";
import BookingStatus from "../components/bookingProcessingPage/BookingStatus";
import MyBookings from "../components/myBookings/MyBookings";
import { Authenticator } from "@aws-amplify/ui-react";

const AppRoutes: FC = () => {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route
          index
          element={
            <div>
              
              <LandingPage />
              
            </div>
          }
        />
        <Route
          path="/health"
          element={
            <div>
              
              <TestComponent />
              
            </div>
          }
        />
        <Route
          path="/room-result"
          element={
            <div>
              
              <RoomResultPage />
              
            </div>
          }
        />
        <Route
          path="/checkout"
          element={
            <div>
              
              <CheckoutPage />
              
            </div>
          }
        />
        <Route
          path="/ratings"
          element={
            <div>
              
              <ReviewAndRating/>
              
            </div>
          }
        />
        <Route
          path="/bookingProcessing"
          element={
            <div>
              
              <BookingProcessing/>
              
            </div>
          }
        />
        <Route
          path="/bookingSuccess"
          element={
            <div>
              
              <BookingStatus status={true}/>
              
            </div>
          }
        />
        <Route
          path="/bookingFailed"
          element={
            <div>
              
              <BookingStatus status={false}/>
              
            </div>
          }
        />
        <Route
          path="/bookingConfirmed"
          element={
            <div>
              
              <BookingConfirmationPage/>
              
            </div>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/my-bookings"
          element={
            <div>
              
             <Authenticator><MyBookings /></Authenticator> 
              
            </div>
          }
        />
        <Route path="*" element={<div>404</div>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};
export default AppRoutes;
