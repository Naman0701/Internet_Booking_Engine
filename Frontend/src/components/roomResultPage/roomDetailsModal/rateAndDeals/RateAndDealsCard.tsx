import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  setBookingData,
  setCheckout,
  setCheckoutTime,
  setPromoDetails,
} from "../../../../redux/slice/checkoutSlice";
import { selectedCurrency, selectedCurrencyFactor } from "../../../../redux/slice/currencyConverterSlice";
import {
  fetchPriceBreakdown,
  setRequestBodyForPriceBreakdown,
} from "../../../../redux/slice/priceBreakdownSlice";
import { formDetails } from "../../../../redux/slice/searchFormDetailsSlice";
import { currencyType, rateAndDealCardPropType } from "../../../../types/DataTypes";
import { getRequestBodyForPriceBreakdown } from "../../../../utils/helper/getRequestBodyForPriceBreakdown";
import "./RateAndDealsCard.scss";

const RateAndDealsCard: FC<rateAndDealCardPropType> = ({
  title,
  description,
  rate,
  roomTypeName,
  promoPriceFactor,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const modifiedTitle = title
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
  const modifiedDescription = description
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
  const promoDetails = {
    title: modifiedTitle,
    description: modifiedDescription,
    rate: rate,
    priceFactor: promoPriceFactor,
    roomType: roomTypeName,
  };
  const searchFormDetails = useAppSelector(formDetails);

  const choosenCurrency: currencyType = useAppSelector(selectedCurrency);
  const currencyFactor: number = useAppSelector(selectedCurrencyFactor);
  const handleSelectPackage = () => {
    dispatch(setBookingData(searchFormDetails));
    dispatch(setCheckoutTime());
    dispatch(setPromoDetails(promoDetails));
    dispatch(setCheckout(true));
    const reqBodyForPriceBreakdown = getRequestBodyForPriceBreakdown(
      window.location.search,
      roomTypeName
    );
    if (reqBodyForPriceBreakdown) {
      dispatch(setRequestBodyForPriceBreakdown(reqBodyForPriceBreakdown));
      dispatch(fetchPriceBreakdown(reqBodyForPriceBreakdown));
    }

    navigate("/checkout");
  };

  return (
    <div className="rate-deals-card">
      <div className="rate-deals-card__description">
        <div className="rate-deals-card__description-title">
          {t(`${modifiedTitle}`)}
        </div>
        <div className="rate-deals-card__description-text">
          {t(`${modifiedDescription}`)}
        </div>
      </div>
      <div className="rate-deals-card__select">
        <span className="rate-deals-card__price-select">
          <span className="rate-deals-card__price">
            {choosenCurrency.currencyIcon}
            {(currencyFactor*parseInt(rate)).toFixed(2)}
          </span>
          <span className="rate-deals-card__per-night">{t("per night")}</span>
        </span>
        <div className="rate-deals-card__select-button-div">
          <button
            className="rate-deals-card__select-button"
            onClick={() => handleSelectPackage()}
          >
            {t("SELECT PACKAGE")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RateAndDealsCard;
