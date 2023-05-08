import React, { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  bookingData,
  checkoutPromoDetails,
  property,
  setCheckout,
  setCheckoutTime,
  setItenaryDetails,
} from "../../redux/slice/checkoutSlice";
import "./IteneraryPanel.scss";
import { getItineraryDetails } from "../../utils/helper/getItineraryDetails";
import PromoDetailsModal from "./promoDetailsModal/PromoDetailsModal";
import RateBreakdownModal from "./rateBreakdownModal/RateBreakdownModal";
import {
  selectedCurrency,
  selectedCurrencyFactor,
} from "../../redux/slice/currencyConverterSlice";
import { currencyType } from "../../types/DataTypes";
import { fetchedPriceBreakdownList } from "../../redux/slice/priceBreakdownSlice";
import { formatItineraryDate } from "../../utils/helper/formatItineraryDate";

const IteneraryPanel: FC = () => {
  const dispatch = useAppDispatch();

  const propertyName = useAppSelector(property);

  const location = useLocation();
  const currentPage = location.pathname;
  const priceBreakdownList = useAppSelector(fetchedPriceBreakdownList);
  const checkoutBookingData = useAppSelector(bookingData);
  const promoDetails = useAppSelector(checkoutPromoDetails);
  const itineraryDetails = getItineraryDetails(
    checkoutBookingData,
    promoDetails,
    priceBreakdownList
  );

  const choosenCurrency: currencyType = useAppSelector(selectedCurrency);
  const currencyFactor: number = useAppSelector(selectedCurrencyFactor);
  const roomType: string = promoDetails.roomType
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (c: string) => c.toUpperCase());

  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleItineraryRemoveButton = () => {
    currentPage === "/room-result"
      ? dispatch(setCheckout(false))
      : navigate("/");
  };
  useEffect(() => {
    dispatch(setItenaryDetails(itineraryDetails));
  }, [itineraryDetails, dispatch]);
  const handleItineraryPanelButton = () => {
    dispatch(setCheckoutTime());
    currentPage === "/room-result"
      ? navigate("/checkout")
      : navigate("/room-result");
  };

  return (
    <>
      {itineraryDetails && (
        <div
          className={
            currentPage === "/checkout"
              ? "checkout-itenarary-panel"
              : "itenerary-panel"
          }
        >
          <span className="itenerary-panel__title">
            {t("Your Trip Itinerary")}
          </span>
          <span className="itenerary-panel__subtitle__resort-name">
            <span className="itenerary-panel__subtitle__name">{`${t(propertyName)}`}</span>

            <button
              className="itenerary-panel__subtitle__remove-button"
              onClick={handleItineraryRemoveButton}
            >
              {t("Remove")}
            </button>
          </span>
          <span className="itenerary-panel__details">
            <span className="itenerary-panel__date-guests">
              {`${itineraryDetails.dateRange} | ${itineraryDetails.guests}`}
            </span>

            <span className="itenerary-panel__promo-details">
              <span className="itenerary-panel__room-type">{`${t(roomType.toUpperCase())}`}</span>

              <span className="itenerary-panel__room-count">
                {itineraryDetails.roomCount}
                {itineraryDetails.roomCount > 1 ? t(" rooms") : t(" room")}
              </span>
            </span>
            {Object.entries(priceBreakdownList)
              .reverse()
              .map(([date, price]) => {
                return (
                  <div key={date} className="itenerary-panel__promo-details">
                    <span>{t(formatItineraryDate(date).split(",")[0])},{formatItineraryDate(date).split(",")[1]}</span>
                    <span>
                      {choosenCurrency.currencyIcon}&nbsp;
                      {(currencyFactor * price).toFixed(2)}
                    </span>
                  </div>
                );
              })}

            {promoDetails && (
              <span className="itenerary-panel__promo-details">
                <span>
                  {t(`${promoDetails.title}`)}
                  <PromoDetailsModal
                    promoTitle={promoDetails.title}
                    promoDescription={promoDetails.description}
                    promoPrice={
                      itineraryDetails ? itineraryDetails.packageTotal : 0
                    }
                  />
                </span>
                <span>
                  -&nbsp;
                  {choosenCurrency.currencyIcon}&nbsp;
                  {(
                    currencyFactor *
                    (itineraryDetails ? itineraryDetails.promoDiscount : 0)
                  ).toFixed(2)}
                </span>
              </span>
            )}
            <span className="itenerary-panel__line-divider"></span>

            <span className="itenerary-panel__promo-details">
              <span>{t("Subtotal")}</span>
              <span>
                {choosenCurrency.currencyIcon}&nbsp;
                {(currencyFactor * itineraryDetails.subtotal).toFixed(2)}
              </span>
            </span>
            <span className="itenerary-panel__promo-details">
              <span>
                {t("Taxes, Surcharges, Fees")}
                <RateBreakdownModal />
              </span>

              <span>
                {choosenCurrency.currencyIcon}&nbsp;
                {(currencyFactor * itineraryDetails.taxes).toFixed(2)}
              </span>
            </span>
            <span className="itenerary-panel__promo-details">
              <span>{t("VAT")}</span>
              <span>
                {choosenCurrency.currencyIcon}&nbsp;
                {(currencyFactor * itineraryDetails.van).toFixed(2)}
              </span>
            </span>

            <span className="itenerary-panel__line-divider"></span>
            <span className="itenerary-panel__promo-details">
              <span>{t("Due Now")}</span>
              <span>
                {choosenCurrency.currencyIcon}&nbsp;
                {(currencyFactor * itineraryDetails.dueNow).toFixed(2)}
              </span>
            </span>
            <span className="itenerary-panel__promo-details">
              <span>{t("Due at Resort")}</span>
              <span>
                {choosenCurrency.currencyIcon}&nbsp;
                {(currencyFactor * itineraryDetails.dueAtResort).toFixed(2)}
              </span>
            </span>
          </span>
          <div className="itenerary-panel__button-div">
            <button
              className="itenerary-panel__continue-button"
              onClick={handleItineraryPanelButton}
            >
              {currentPage === "/room-result"
                ? t("CHECKOUT")
                : t("CONTINUE SHOPPING")}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default IteneraryPanel;
