import { FC, useState } from "react";
import { Modal } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import './PromoDetailsModal.scss';
import { currencyType, PromoDetailsModalPropType } from "../../../types/DataTypes";
import { useAppSelector } from "../../../redux/hooks";
import { selectedCurrency, selectedCurrencyFactor } from "../../../redux/slice/currencyConverterSlice";
import { useTranslation } from "react-i18next";


const PromoDetailsModal: FC<PromoDetailsModalPropType> = ({promoTitle,promoDescription,promoPrice}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const choosenCurrency: currencyType = useAppSelector(selectedCurrency);
  const currencyFactor: number = useAppSelector(selectedCurrencyFactor);
  const {t}=useTranslation();

  return (
    <>
      <InfoOutlinedIcon
        className="info-circle"
        onClick={handleOpen}
      />

      <Modal open={open} onClose={handleClose} className="promo-details-modal">
        <div className="promo-details-modal-container">
        <button className="promo-details__close-button" onClick={handleClose}>x</button>

          <span  className="promo-details-modal__title">{(`${promoTitle}`)}</span>
          <span className="promo-details-modal__text">{(`${promoDescription}`)}</span>
          <span className="promo-details-modal__package">
            <span>{t("Package Total")}</span>
            <span> {choosenCurrency.currencyIcon}
              {(currencyFactor * promoPrice).toFixed(2)}</span>
          </span>
        </div>
      </Modal>
    </>
  );
};

export default PromoDetailsModal;
