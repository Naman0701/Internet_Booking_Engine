import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  errorStatus,
  fetchedRoomResultList,
  pageRange,
  setPageRangeState,
} from "../../../redux/slice/roomResultPageSlice";
import "./AvailableRooms.scss";
import RoomCrousal from "./RoomCrousal/RoomCrousal";
import StarIcon from "@mui/icons-material/Star";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import KingBedOutlinedIcon from "@mui/icons-material/KingBedOutlined";
import { currencyType, propertyType } from "../../../types/DataTypes";
import {
  selectedCurrency,
  selectedCurrencyFactor,
} from "../../../redux/slice/currencyConverterSlice";
import { ResponseBody } from "../../../interface/DataInterface";
import Snackbar from "../../SnackBar/SnackBar";
import RoomDetailsModal from "../roomDetailsModal/RoomDetailsModal";
import {
  landingPageConfigData,
  roomResultPageConfigData,
} from "../../../redux/slice/configurationsSlice";
import { useTranslation } from "react-i18next";

const AvailableRooms: FC = () => {
  const { t } = useTranslation();
  const selectedPageRange: number[] = useAppSelector(pageRange);
  const roomTypesImages = useAppSelector(roomResultPageConfigData).roomTypes;
  const property: propertyType = useAppSelector(landingPageConfigData)
    .property[0];
  const error: boolean = useAppSelector(errorStatus);
  const choosenCurrency: currencyType = useAppSelector(selectedCurrency);
  const currencyFactor: number = useAppSelector(selectedCurrencyFactor);
  const roomResultList: ResponseBody[] = useAppSelector(fetchedRoomResultList);
  const isCheckout = useAppSelector((state) => state.checkout.checkout);

  const dispatch = useAppDispatch();
  const nextPage = () => {
    const newStartingPage =
      selectedPageRange[1] >= roomResultList.length
        ? roomResultList.length
        : selectedPageRange[1];
    const newEndingPage =
      selectedPageRange[1] + 3 > roomResultList.length
        ? roomResultList.length
        : selectedPageRange[1] + 3;
    dispatch(setPageRangeState([newStartingPage, newEndingPage]));
  };
  const prevPage = () => {
    const newStartingPage = selectedPageRange[0] - 3;
    const newEndingPage = selectedPageRange[0];
    dispatch(setPageRangeState([newStartingPage, newEndingPage]));
  };

  return (
    <div className="room-card-div">
      <Snackbar errorStatus={error} errorType={"Data"} />

      <div
        className={"room-card-section-div" + (isCheckout ? "-isCheckout" : "")}
      >
        {roomTypesImages !== null &&
          property !== undefined &&
          roomResultList
            .slice(selectedPageRange[0], selectedPageRange[1])
            .map((roomResult, index) => {
              return (
                <div className="room-result-card" key={index}>
                  <RoomCrousal
                    images={roomTypesImages[roomResult.roomTypeName].images}
                    height={"12rem"}
                    width={"100%"}
                  />
                  <div className="room-result-card__title">
                    <span className="room-result-card__title__name">
                      {`${t(property.propertyName)} ${t(
                        roomResult.roomTypeName.replace("_", " ")
                      )}`}
                    </span>
                    {roomResult.rating !== "N/A" ? (
                      <span className="room-result-card__title__rating">
                        <span className="room-result-card__title__rating__rate">
                          <StarIcon className="star" /> {t(roomResult.rating)}
                        </span>
                        <span className="room-result-card__title__rating__review">
                          {roomResult.reviewers + " reviews"}
                        </span>
                      </span>
                    ) : (
                      <span className="new-property">{t("New Property")}</span>
                    )}
                  </div>
                  <span className="room-result-card__location">
                    <PlaceOutlinedIcon className="location-pin" />{" "}
                    {t(`${property.landMark}`)}
                  </span>
                  <span className="room-result-card__area">
                    <i className="room-result-card__area__inclusive">
                      {t("Inclusive")}
                    </i>{" "}
                    {+roomResult.areaInSquareFeet} {t("sq.ft")}
                  </span>
                  <span className="room-result-card__capacity">
                    <PersonOutlineOutlinedIcon className="user" />{" "}
                    {+roomResult.maxCapacity}
                  </span>
                  <span className="room-result-card__bed">
                    <KingBedOutlinedIcon className="bed" />{" "}
                    {roomResult.singleBed > 0
                      ? roomResult.singleBed + t(" Singles ")
                      : ""}
                    {roomResult.doubleBed > 0 && roomResult.singleBed > 0
                      ? t(" And ")
                      : ""}
                    {roomResult.doubleBed > 0
                      ? roomResult.doubleBed + t(" Doubles")
                      : ""}
                  </span>
                  {roomResult.specialDeal && (
                    <button className="room-result-card__special-deal">
                      {t("Special Deal")}
                    </button>
                  )}
                  {roomResult.specialDeal && (
                    <span className="room-result-card__special-deal-description">
                      {t(roomResult.specialDealDescription.replace(".",""))}
                    </span>
                  )}
                  <span className="room-result-card__rate">
                    {`${choosenCurrency.currencyIcon}${(
                      currencyFactor * roomResult.rate
                    ).toFixed(2)}`}
                    <span className="room-result-card__rate__stay">
                      {t("per night")}
                    </span>
                  </span>
                  <RoomDetailsModal roomDetails={roomResult} />
                </div>
              );
            })}
      </div>

      <div className="room-result-card__pagination">
        <button
          className="room-result-card__pagination__prev"
          onClick={prevPage}
          disabled={selectedPageRange[0] <= 0}
        >
          {t("Previous Page")}
        </button>
        <button
          className="room-result-card__pagination__next"
          onClick={nextPage}
          disabled={selectedPageRange[1] >= roomResultList.length}
        >
          {t("Next Page")}
        </button>
      </div>
    </div>
  );
};

export default AvailableRooms;
