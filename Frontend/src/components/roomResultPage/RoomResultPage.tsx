import React, { FC, useEffect } from "react";
import { useNavigate } from "react-router";
import {  ResponseBody } from "../../interface/DataInterface";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchMinimumNightlyRate, setDates } from "../../redux/slice/calendarSlice";
import { setProgress } from "../../redux/slice/checkerSlice";
import {
  fetchAvailableRooms,
  fetchedRoomResultList,
  filters,
  loadingStatus,
  pageRange,
  requestBody,
  setPageRangeState,
  setRequestBodyState,
  sort,
} from "../../redux/slice/roomResultPageSlice";
import { filterType, sortType } from "../../types/DataTypes";
import { getRequestBody } from "../../utils/helper/getRequestBody";
import SearchForm from "../landingPage/SearchForm/SearchForm";
import Loaders from "../Loaders/Loaders";
import ProgressChecker from "../progressChecker/ProgressChecker";
import AvailableRooms from "./AvailableRooms/AvailableRooms";
import FilterDropDown from "./FilterDropDown/FilterDropDown";
import "./RoomResultPage.scss";
import SortDropDown from "./SortDropDown/SortDropDown";
import { getRequestBodyForDefaultPromotion } from "../../utils/helper/getRequestBodyForDefaultPromotion";
import {
  setRequestBodyForDealsState,
} from "../../redux/slice/defaultPromotionsSlice";
import IteneraryPanel from "../itenerary/IteneraryPanel";
import NoResultsFound from "./AvailableRooms/NoResultsFound/NoResultsFound";
import { fetchRoomResultPageConfig, landingPageConfigData, roomResultPageConfigData } from "../../redux/slice/configurationsSlice";
import { formDetails } from "../../redux/slice/searchFormDetailsSlice";
const RoomResultPage: FC = () => {
  const selectedPageRange: number[] = useAppSelector(pageRange);
  const roomResultList: ResponseBody[] = useAppSelector(fetchedRoomResultList);
  const loading: boolean = useAppSelector(loadingStatus);
  const bannerImage: string = useAppSelector(landingPageConfigData).hotelBanner;
  const currentFilter: filterType[] = useAppSelector(filters);
  const currentSort: sortType = useAppSelector(sort);
  const isCheckout = useAppSelector((state) => state.checkout.checkout);
  const request = useAppSelector(requestBody);
  const pageRangeSize:number=useAppSelector(roomResultPageConfigData).resultSize;
  const formDetail = useAppSelector(formDetails);
  const { t } = useTranslation();
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();  
  useEffect(() => {
    const reqBody = getRequestBody(
      window.location.search,
      currentFilter,
      currentSort
    );
    const reqBodyDeals = getRequestBodyForDefaultPromotion(
      window.location.search
    );
    if (reqBody === null) {
      navigate("/");
    } else {
      dispatch(setRequestBodyState(reqBody));
      if (reqBodyDeals) {
        dispatch(setRequestBodyForDealsState(reqBodyDeals));
      }
    }
    if(formDetail!==null)
    {
     if(typeof formDetail.dateRange==="string")
     {
      dispatch(setDates({
        startDate:formDetail.dateRange.split(",")[0],
        endDate:formDetail.dateRange.split(",")[1],
      }))
     }
     else{ 
      dispatch(setDates({
        startDate:formDetail.dateRange[0],
        endDate:formDetail.dateRange[1],
      }))
    }
    }
    dispatch(fetchRoomResultPageConfig());
    dispatch(fetchMinimumNightlyRate());
    dispatch(setPageRangeState([0,0 + pageRangeSize]))
    dispatch(setProgress(1));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, navigate, currentFilter, currentSort,pageRangeSize]);

  useEffect(() => {
    if (request.startDate !== "") {
      dispatch(fetchAvailableRooms(request));
    }
  }, [dispatch, request]);

  return (
    <div className="room-result-page">
      <span className="room-result-page__background">
        <img
          src={bannerImage}
          alt="bannerImage"
          className="room-result-page__background__image"
        />
      </span>
      <ProgressChecker />
      <div className="room-result-page__content">
        <div className="room-result-page__content__search">
          <SearchForm alignment={"horizontal"} />
        </div>
        <span className="room-result-page__content__properties">
          <span className="room-result-page__content__properties__filter-section">
            {t("Narrow Your Results")}
            <FilterDropDown />
          </span>
          <span className="room-result__result-section">
            {roomResultList.length>0 && <span className="room-result__result-section__title">
              <span className="room-result__result-section__title__heading">
                {t("Room Results")}
              </span>
              <span className="room-result__result-section__title__extras">
                <span className="room-result__result-section__title__extras__pages">
                  {t("Showing")} {selectedPageRange[0] + 1}-
                  {selectedPageRange[1] < roomResultList.length
                    ? selectedPageRange[1]
                    : roomResultList.length}{" "}
                  {t("of")} {roomResultList.length} {t("results")}
                </span>

                <SortDropDown />
              </span>
            </span>}
            <span className="room-result__result-section__content">
              {loading && <Loaders />}
              {!loading && roomResultList.length>0 && <AvailableRooms />}
              {!loading && roomResultList.length===0 && <NoResultsFound/>}

              {isCheckout && <IteneraryPanel />}
            </span>
          </span>
        </span>
      </div>
    </div>
  );
};

export default RoomResultPage;
