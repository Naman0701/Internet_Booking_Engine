import React, { FC, useState, useEffect } from "react";
import "./calendar.scss";
import { DateRange } from "react-date-range";
import { addDays, format, isAfter, isBefore, isSameDay } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  endDateStore,
  minimumNightlyRates,
  negateInitialCheckStatus,
  setDates,
  startDateStore,
  toggleDisplayCalendar,
} from "../../../../redux/slice/calendarSlice";
import { currencyType } from "../../../../types/DataTypes";
import {
  selectedCurrency,
  selectedCurrencyFactor,
} from "../../../../redux/slice/currencyConverterSlice";
import { useTranslation } from "react-i18next";
import { landingPageConfigData } from "../../../../redux/slice/configurationsSlice";
import { formDetails } from "../../../../redux/slice/searchFormDetailsSlice";
import { useMediaQuery } from "@mui/material";

const Calendar: FC = () => {
  const startDate: string = useAppSelector(startDateStore);
  const endDate: string = useAppSelector(endDateStore);
  const choosenCurrency: currencyType = useAppSelector(selectedCurrency);
  const currencyFactor: number = useAppSelector(selectedCurrencyFactor);
  const maxLengthOfStay: number = useAppSelector(
    landingPageConfigData
  ).maxLengthOfStay;
  const minimumNightlyRate: any = useAppSelector(minimumNightlyRates);
  const [dateRangePrice, setDateRangePrice] = useState<number>(
    Number.MAX_VALUE
  );

  const isMobile = useMediaQuery('(max-width:800px)');
  
  const dispatch = useAppDispatch();
  const formDetail = useAppSelector(formDetails);
  
  const [dateRange, setDateRange] = useState([
    {
      startDate: (formDetail!==null)? (typeof formDetail.dateRange==="string")?new Date(formDetail.dateRange.split(",")[0]):new Date(formDetail.dateRange[0]) :new Date(startDate),
      endDate: (formDetail!==null)? (typeof formDetail.dateRange==="string")?new Date(formDetail.dateRange.split(",")[1]):new Date(formDetail.dateRange[1]) :new Date(endDate),
      key: "selection",
    },
  ]);
  useEffect(() => {
    updateDateRangePrice(new Date(startDate), new Date(endDate));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderDayPrice = (date: Date) => {
    if (
      (isAfter(date, new Date()) && isBefore(date, new Date("2023-05-31"))) ||
      isSameDay(date, new Date())
    ) {
      const price = (
        currencyFactor * minimumNightlyRate[format(date, "yyyy-MM-dd")]
      ).toFixed(1);
      return `${choosenCurrency.currencyIcon}${price}`;
    }
    return "_";
  };
  const renderDatePrice = (date: Date) => {
    return (
      <div className={`date-cell`}>
        <div className="date-cell__date">{date.getDate()}</div>
        <div className="date-cell__date-price">{renderDayPrice(date)}</div>
      </div>
    );
  };

  const updateDateRangePrice = (rangeStart: Date, rangeEnd: Date) => {
    if (!isSameDay(rangeStart, rangeEnd)) {
      let sum = Number.MAX_VALUE;
      let date = new Date(rangeStart);
      while (!isAfter(date, rangeEnd)) {
        sum = Math.min(
          sum,
          currencyFactor * minimumNightlyRate[format(date, "yyyy-MM-dd")]
        );
        date = addDays(date, 1);
      }
      setDateRangePrice(parseFloat(sum.toFixed(2)));
    } else {
      setDateRangePrice(0);
    }
  };

  const handleChangeRange = (ranges: any) => {
    setDateRange([ranges.selection]);
    updateDateRangePrice(ranges.selection.startDate, ranges.selection.endDate);
  };
  const handleApplyDates = (): void => {
    dispatch(
      setDates({
        startDate:format(dateRange[0].startDate, "yyyy-MM-dd"),
        endDate: format(dateRange[0].endDate, "yyyy-MM-dd"),
      })
    );
    dispatch(negateInitialCheckStatus());
    dispatch(toggleDisplayCalendar());
  };
  const { t } = useTranslation();

  return (
    <>
      <DateRange
        onChange={handleChangeRange}
        showPreview={false}
        showMonthAndYearPickers={false}
        moveRangeOnFirstSelection={false}
        months={isMobile?1:2}
        ranges={dateRange}
        preventSnapRefocus={true}
        minDate={
          isAfter(dateRange[0].endDate, dateRange[0].startDate)
            ? new Date()
            : new Date(dateRange[0].endDate)
        }
        maxDate={
          isAfter(dateRange[0].endDate, dateRange[0].startDate)
            ? new Date("2023-05-30")
            : addDays(dateRange[0].startDate, maxLengthOfStay) <
              new Date("2023-05-31")
            ? addDays(dateRange[0].startDate, maxLengthOfStay)
            : new Date("2023-05-31")
        }
        direction="horizontal"
        dayContentRenderer={renderDatePrice}
        fixedHeight={true}
      />
      <div className="calendar__footer">
        {!isSameDay(dateRange[0].endDate, dateRange[0].startDate) && (
          <span className="calendar__footer__average">
            {t("from")} {choosenCurrency.currencyIcon}
            {dateRangePrice}
            {t("/night")}
          </span>
        )}
        <span className="calendar__footer__apply">
          <button
            className="calendar__footer__apply__button"
            onClick={handleApplyDates}
            disabled={isSameDay(dateRange[0].endDate, dateRange[0].startDate)}
          >
            {t("Apply Dates")}
          </button>

          {isSameDay(dateRange[0].endDate, dateRange[0].startDate) && (
            <span className="calendar__footer__apply__warning">
              {t("Please select end date.Max length of stay:")}{" "}
              {maxLengthOfStay} {t("days.")}
            </span>
          )}
        </span>
      </div>
    </>
  );
};

export default Calendar;
