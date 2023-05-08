import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  activeAccordian,
  bookingDetails,
  setActiveAccordian,
} from "../../../redux/slice/bookingConfirmedSlice";
import "./AccordianDetail.scss";
import {
  selectedCurrency,
  selectedCurrencyFactor,
} from "../../../redux/slice/currencyConverterSlice";
import { bookingDetailsType } from "../../../types/DataTypes";
import { useTranslation } from "react-i18next";

const AccordianDetail: FC = () => {
  const currentActiveAccordian: string = useAppSelector(activeAccordian);
  const currentCurrency = useAppSelector(selectedCurrency);
  const currencyFactor: number = useAppSelector(selectedCurrencyFactor);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const openAccordian = (accordian: string) => {
    dispatch(setActiveAccordian(accordian));
  };

  const bookingData:bookingDetailsType = useAppSelector(bookingDetails);
  return (
    <div>
      <Accordion
        className="accordian"
        disableGutters
        defaultExpanded={false}
        expanded={
          currentActiveAccordian === "All" || currentActiveAccordian === "1"
        }
        onClick={() => {
          currentActiveAccordian === "1"
            ? openAccordian("")
            : openAccordian("1");
        }}
        onBlur={() => openAccordian("")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className="accordian__title">
            {t('Room Total Summary')}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className="accordian__details">
            {t('Nightly Rate')}
            <span className="accordian__details__value">{`${
              currentCurrency.currencyIcon
            } ${(currencyFactor * parseFloat(bookingData.nightlyRate)).toFixed(
              2
            )}`}</span>
          </Typography>

          <Typography className="accordian__details">
            {t('Subtotal')}
            <span className="accordian__details__value">{`${
              currentCurrency.currencyIcon
            } ${(currencyFactor * parseFloat(bookingData.subtotal)).toFixed(
              2
            )}`}</span>
          </Typography>

          <Typography className="accordian__details">
          {t('Taxes, Surcharges, Fees')}
            <span className="accordian__details__value">{`${
              currentCurrency.currencyIcon
            } ${(currencyFactor * parseFloat(bookingData.taxes)).toFixed(
              2
            )}`}</span>
          </Typography>

          <Typography className="accordian__details">
            {t('VAT')}
            <span className="accordian__details__value">{`${
              currentCurrency.currencyIcon
            } ${(currencyFactor * parseFloat(bookingData.vat)).toFixed(
              2
            )}`}</span>
          </Typography>

          <Typography className="accordian__details">
            {t('Total for stay')}
            <span className="accordian__details__value">{`${
              currentCurrency.currencyIcon
            } ${(currencyFactor * parseFloat(bookingData.totalForStay)).toFixed(
              2
            )}`}</span>
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        className="accordian"
        disableGutters
        defaultExpanded={false}
        expanded={
          currentActiveAccordian === "All" || currentActiveAccordian === "2"
        }
        onClick={() => {
          currentActiveAccordian === "2"
            ? openAccordian("")
            : openAccordian("2");
        }}
        onBlur={() => openAccordian("")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className="accordian__title">
            {t('Guest Information')}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className="accordian__details">
            {t('First Name')}
            <span className="accordian__details__value">{t(bookingData.firstName)}</span>
          </Typography>
          <Typography className="accordian__details">
            {t('Last Name')}
            <span className="accordian__details__value">{t(bookingData.lastName)}</span>
          </Typography>
          <Typography className="accordian__details">
            {t('Phone')}
            <span className="accordian__details__value">{bookingData.phone}</span>
          </Typography>
          <Typography className="accordian__details">
            {t('Email')}
            <span className="accordian__details__value">{bookingData.email}</span>
          </Typography>
          <Typography className="accordian__details">
            {t('Guests')}
            <span className="accordian__details__value">{t(bookingData.guests)}</span>
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        className="accordian"
        disableGutters
        defaultExpanded={false}
        expanded={
          currentActiveAccordian === "All" || currentActiveAccordian === "3"
        }
        onClick={() => {
          currentActiveAccordian === "3"
            ? openAccordian("")
            : openAccordian("3");
        }}
        onBlur={() => openAccordian("")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className="accordian__title">{t('Billing Address')}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className="accordian__details">
            {t('Mailing Address')}
            <span className="accordian__details__value">{t(bookingData.mailingAddress1)}</span>
          </Typography>
          <Typography className="accordian__details">
            {t('Pin Code')}
            <span className="accordian__details__value">{t(bookingData.zip)}</span>
          </Typography>
          <Typography className="accordian__details">
            {t('State')}
            <span className="accordian__details__value">{t(bookingData.state)}</span>
          </Typography>
          <Typography className="accordian__details">
            {t("Country")}
            <span className="accordian__details__value">{t(bookingData.country)}</span>
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        className="accordian"
        disableGutters
        defaultExpanded={false}
        expanded={
          currentActiveAccordian === "All" || currentActiveAccordian === "4"
        }
        onClick={() => {
          currentActiveAccordian === "4"
            ? openAccordian("")
            : openAccordian("4");
        }}
        onBlur={() => openAccordian("")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className="accordian__title">
            {t('Payment Information')}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className="accordian__details">
            {t('Card Number')}
            <span className="accordian__details__value">XXXX XXXX XXXX {bookingData.cardNumber.slice(12,16)}</span>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default AccordianDetail;
