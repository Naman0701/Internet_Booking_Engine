import { FC, useState, useEffect } from "react";
import { Modal } from "@mui/material";
import "./RoomDetailsModal.scss";
import { RoomDetailsModalPropType } from "../../../types/DataTypes";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { t } from "i18next";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import KingBedOutlinedIcon from "@mui/icons-material/KingBedOutlined";
import RateAndDealsCard from "./rateAndDeals/RateAndDealsCard";
import RoomCrousal from "../AvailableRooms/RoomCrousal/RoomCrousal";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CustomPromotion from "./customPromoComponent/CustomPromotion";
import { STANDARD_RATE } from "../../../utils/constants/Constants";
import {
  ResponseBodyForCustomPromotion,
  ResponseBodyForDefaultPromotion,
} from "../../../interface/DataInterface";
import {
  fetchDefaultPromotions,
  fetchedDefaultPromotionsList,
  requestBodyForDeals,
} from "../../../redux/slice/defaultPromotionsSlice";
import {
  fetchedCustomPromotion,
  isCustomPromotionApplicable,
} from "../../../redux/slice/customPromotionSlice";
import { setProgress } from "../../../redux/slice/checkerSlice";
import { roomResultPageConfigData } from "../../../redux/slice/configurationsSlice";

const RoomDetailsModal: FC<RoomDetailsModalPropType> = ({ roomDetails }) => {
  const roomTypesConfiguration = useAppSelector(
    roomResultPageConfigData
  ).roomTypes;
  const dispatch = useAppDispatch();
  const reqBodyDefaultPromotion = useAppSelector(requestBodyForDeals);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    dispatch(setProgress(2));
    setOpen(true);
  };

  const handleClose = () => {
    dispatch(setProgress(1));
    setOpen(false);
  };

  const deals: ResponseBodyForDefaultPromotion[] = useAppSelector(
    fetchedDefaultPromotionsList
  );
  const hasDealsApplicable = deals.length > 0;
  const isCustomPromoApplicable = useAppSelector(isCustomPromotionApplicable);
  const customPromotion: ResponseBodyForCustomPromotion = useAppSelector(
    fetchedCustomPromotion
  );

  useEffect(() => {
    dispatch(fetchDefaultPromotions(reqBodyDefaultPromotion));
  }, [dispatch, reqBodyDefaultPromotion]);

  return (
    <>
      <button className="room-result-card__select" onClick={handleOpen}>
        {t("SELECT ROOM")}
      </button>
      <Modal open={open} onClose={handleClose} className="room-details-modal">
        <div className="room-details-modal-container">
          <div className="room-details-modal-crousal">
            <RoomCrousal
              images={roomTypesConfiguration[roomDetails.roomTypeName].images}
              height={"24rem"}
              width={"100%"}
            />
            <button
              className="room-details-modal-crousal__close-button"
              onClick={handleClose}
            >
              X
            </button>
            <div className="room-details-modal-crousal__title">
              {t(`${roomDetails.roomTypeName.replace("_", " ")}`)}
            </div>
          </div>
          <div className="room-details-modal-description">
            <div className="room-details-modal-description__details">
              <div className="room-details-modal-details">
                <span className="room-details-modal-details__capacity">
                  <PersonOutlineOutlinedIcon className="user" />{" "}
                  {+roomDetails.maxCapacity}
                </span>

                <span className="room-details-modal-details__bed">
                  <KingBedOutlinedIcon className="bed" />{" "}
                  {roomDetails.singleBed > 0
                    ? roomDetails.singleBed + t(" Singles ")
                    : ""}
                  {roomDetails.doubleBed > 0 && roomDetails.singleBed > 0
                    ? " And "
                    : ""}
                  {roomDetails.doubleBed > 0
                    ? roomDetails.doubleBed + t(" Doubles")
                    : ""}
                </span>
                <span className="room-details-modal-details__area">
                  {roomDetails.areaInSquareFeet} {t("sq.ft")}
                </span>
              </div>
              <div className="room-details-modal__text">
                {t(
                  `${roomTypesConfiguration[
                    roomDetails.roomTypeName
                  ].description.replace(/\.(?=[^.]*$)/, "")}`
                )}
              </div>

              {roomTypesConfiguration[roomDetails.roomTypeName].amenities
                .length > 0 && (
                <div className="room-details-modal-description__amenities__mobile">
                  <span className="room-details-modal-amenities__title__mobile">
                    {t("Amenities")}
                  </span>
                  {roomTypesConfiguration[
                    roomDetails.roomTypeName
                  ].amenities.map((amenity: string, index: string) => (
                    <span
                      key={index}
                      className="room-details-modal-amenities__item__mobile"
                    >
                      <CheckCircleOutlineOutlinedIcon className="check-circle__mobile" />
                      {t(amenity)}
                    </span>
                  ))}
                </div>
              )}
              <div className="room-details-modal__rate-deals">
                <div className="rate-deals__card-heading">
                  {t("Standard Rate")}
                </div>
                <RateAndDealsCard
                  rate={roomDetails.rate.toFixed(2)}
                  description={t(`${STANDARD_RATE.description}`)}
                  title={t(`${STANDARD_RATE.title}`)}
                  roomTypeName={roomDetails.roomTypeName}
                  promoPriceFactor={1}
                />

                {hasDealsApplicable && (
                  <div className="rate-deals__card-heading">
                    {t("Deals & Packages")}
                  </div>
                )}
                {deals.map((deal) => (
                  <div key={deal.promotionId}>
                    <RateAndDealsCard
                      rate={(deal.priceFactor * roomDetails.rate).toFixed(2)}
                      description={deal.promotionDescription}
                      title={deal.promotionTitle}
                      roomTypeName={roomDetails.roomTypeName}
                      promoPriceFactor={deal.priceFactor}
                    />
                  </div>
                ))}

                {isCustomPromoApplicable && (
                  <div>
                    <div className="rate-deals__card-heading">
                      {t("Custom Promotion")}
                    </div>
                    <RateAndDealsCard
                      rate={(
                        customPromotion.priceFactor * roomDetails.rate
                      ).toFixed(2)}
                      description={t(`${customPromotion.promotionDescription}`)}
                      title={t(`${customPromotion.promotionTitle}`)}
                      roomTypeName={roomDetails.roomTypeName}
                      promoPriceFactor={customPromotion.priceFactor}
                    />
                  </div>
                )}
              </div>
            </div>
            {roomTypesConfiguration[roomDetails.roomTypeName].amenities.length >
              0 && (
              <div className="room-details-modal-description__amenities">
                <span className="room-details-modal-amenities__title">
                  {t("Amenities")}
                </span>
                {roomTypesConfiguration[roomDetails.roomTypeName].amenities.map(
                  (amenity: string, index: string) => (
                    <span
                      key={index}
                      className="room-details-modal-amenities__item"
                    >
                      <CheckCircleOutlineOutlinedIcon className="check-circle" />
                      {t(amenity)}
                    </span>
                  )
                )}
              </div>
            )}
            <CustomPromotion roomTypeName={roomDetails.roomTypeName} />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default RoomDetailsModal;
