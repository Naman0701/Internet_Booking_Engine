import { FC} from "react";
import { useAppSelector } from "../../../../redux/hooks";
import {
  endDateStore,
  startDateStore,
} from "../../../../redux/slice/calendarSlice";
import { format } from "date-fns";
import "./CalendarPlaceHolder.scss";
import { useTranslation } from "react-i18next";

type Props = {
  horizontalView: boolean;
};
const CalendarPlaceHolder: FC<Props> = ({ horizontalView }) => {
  const selectedStartDate: string = useAppSelector(startDateStore);
  const selectedEndDate: string = useAppSelector(endDateStore);
  const { t } = useTranslation();

  return (
    <span className="showDetails">
      <span className="renderer">
        {horizontalView && (
          <span className="renderlabel">{t("Check-In")}</span>
        )}
        <span
          className={`showDetails__check-in ${
            horizontalView ? "renderValue" : ""
          }`}
        > {format(new Date(selectedStartDate), "MMM dd yyyy")}
        </span>
      </span>
      -&gt;
      <span className="renderer">
        {horizontalView && (
          <span className="renderlabel">{t("Check-Out")}</span>
        )}
        <span
          className={`showDetails__check-in ${
            horizontalView ? "renderValue" : ""
          }`}
        >
          {format(new Date(selectedEndDate), "MMM dd yyyy")}
        </span>
      </span>
    </span>
  );
};

export default CalendarPlaceHolder;
