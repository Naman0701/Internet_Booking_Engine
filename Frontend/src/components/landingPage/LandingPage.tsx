import React, { FC ,useEffect} from "react";
import { useAppDispatch, useAppSelector} from "../../redux/hooks";
import { loadingStatus } from "../../redux/slice/landingPageSlice";
import './LandingPage.scss'
import SearchForm from "./SearchForm/SearchForm";
import { fetchMinimumNightlyRate } from "../../redux/slice/calendarSlice";
import Loaders from "../Loaders/Loaders";
import { setCheckout } from "../../redux/slice/checkoutSlice";
import { landingPageConfigData } from "../../redux/slice/configurationsSlice";
import { setFormDetails } from "../../redux/slice/searchFormDetailsSlice";

const LandingPage: FC = () => {

  const hotelBanner:String=useAppSelector(landingPageConfigData).hotelBanner;
  const loading:boolean=useAppSelector(loadingStatus);
 
  const dispatch = useAppDispatch();

  /**
   * On loading this page and dispatch, fetch the bookings.
   */
  useEffect(() => {
    
    dispatch(fetchMinimumNightlyRate());
    dispatch(setCheckout(false));
    dispatch(setFormDetails(null));
  }, [dispatch]);



  return (
    <section>
    {loading && <Loaders/>}
    {!loading && <div data-testid="landing-page" className="landing-page-mobile" style={
      {
        backgroundImage: `url(${hotelBanner})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize:"cover",
        backgroundPosition: 'center center',
      }
    }>
   </div>
}
    {!loading && <div data-testid="landing-page" className="landing-page" style={
      {
        backgroundImage: `url(${hotelBanner})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize:"cover",
        backgroundPosition: 'center center',
      }
    }>
      <div className="landing-page__form-div">
        <SearchForm alignment={"vertical"}/>
        </div>
    </div>}
    </section>
  );
};

export default LandingPage;
