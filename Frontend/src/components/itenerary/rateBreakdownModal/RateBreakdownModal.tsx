import { FC, useState } from "react";
import { Modal } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import "./RateBreakdownModal.scss";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../redux/hooks";
import { fetchedPriceBreakdownList } from "../../../redux/slice/priceBreakdownSlice";
import { getItineraryDetails } from "../../../utils/helper/getItineraryDetails";
import { currencyType } from "../../../types/DataTypes";
import {
  selectedCurrency,
  selectedCurrencyFactor,
} from "../../../redux/slice/currencyConverterSlice";
import {
  bookingData,
  checkoutPromoDetails,
  property,
} from "../../../redux/slice/checkoutSlice";

const RateBreakdownModal: FC = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const priceBreakdownList = useAppSelector(fetchedPriceBreakdownList);
  const propertyName = useAppSelector(property);
  const checkoutBookingData = useAppSelector(bookingData);
  const promoDetails = useAppSelector(checkoutPromoDetails);
  const itineraryDetails = getItineraryDetails(
    checkoutBookingData,
    promoDetails,
    priceBreakdownList
  );
  const roomType: string = promoDetails.roomType
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (c: string) => c.toUpperCase());

  const choosenCurrency: currencyType = useAppSelector(selectedCurrency);
  const currencyFactor: number = useAppSelector(selectedCurrencyFactor);

  const { t } = useTranslation();
  return (
    <>
      <InfoOutlinedIcon className="info-circle" onClick={handleOpen} />

      {itineraryDetails && (
        <Modal
          open={open}
          onClose={handleClose}
          className="rate-breakdown-modal"
        >
          <div className="rate-breakdown-modal-container">
            <button
              className="rate-breakdown__close-button"
              onClick={handleClose}
            >
              x
            </button>

            <span className="promo-details-modal__title">
              {t("Rate Breakdown")}
            </span>
            <span className="itenerary-panel__subtitle__resort-name">
              <span className="itenerary-panel__subtitle__name">
                {propertyName}
              </span>
            </span>
            <span className="rate-breakdown-modal__details">
              <span className="rate-breakdown-modal__promo-details">
                <span className="rate-breakdown-modal__room-type">
                  {roomType}
                </span>
              </span>

              <span className="rate-breakdown-modal__promo-title">
                {`${promoDetails.title}`}
              </span>

              {Object.entries(priceBreakdownList)
                .reverse()
                .map(([date, price]) => (
                  <div
                    key={date}
                    className="rate-breakdown-modal__promo-details"
                  >
                    <span>{date}</span>
                    <span>
                      {choosenCurrency.currencyIcon}
                      {(currencyFactor * price).toFixed(2)}
                    </span>
                  </div>
                ))}

              <span className="rate-breakdown-modal__promo-details">
                <span>{t("Room Total")}</span>
                <span>
                  {choosenCurrency.currencyIcon}
                  {(currencyFactor * itineraryDetails.subtotal).toFixed(2)}
                </span>
              </span>
              <span className="itenerary-panel__line-divider"></span>
              <span className="rate-breakdown-modal__promo-details">
                <span>{t("Taxes and Fees")}</span>
              </span>

              <span className="rate-breakdown-modal__promo-details">
                <span>{t("Resort Fee")} </span>
                <span>
                  {choosenCurrency.currencyIcon}
                  {(currencyFactor * itineraryDetails.taxes).toFixed(2)}
                </span>
              </span>
              <span className="rate-breakdown-modal__promo-details">
                <span>{t("Occupancy Tax")}</span>
                <span>
                  {choosenCurrency.currencyIcon}
                  {(currencyFactor * itineraryDetails.van).toFixed(2)}
                </span>
              </span>
              <span className="itenerary-panel__line-divider"></span>
              <span className="rate-breakdown-modal__promo-details">
                <span>{t("Due Now")}</span>
                <span>
                  {choosenCurrency.currencyIcon}
                  {(currencyFactor * itineraryDetails.dueNow).toFixed(2)}
                </span>
              </span>
              <span className="rate-breakdown-modal__promo-details">
                <span>{t("Due at Resort")}</span>
                <span>
                  {choosenCurrency.currencyIcon}
                  {(currencyFactor * itineraryDetails.dueAtResort).toFixed(2)}
                </span>
              </span>
            </span>
          </div>
        </Modal>
      )}
    </>
  );
};

export default RateBreakdownModal;
