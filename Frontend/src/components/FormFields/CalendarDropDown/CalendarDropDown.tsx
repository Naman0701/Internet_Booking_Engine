import React, { FC } from "react";
import Select from "@mui/material/Select";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

import FormControl from "@mui/material/FormControl";

import OutlinedInput from "@mui/material/OutlinedInput";
import CalendarPlaceHolder from "./CalendarPlaceHolder/CalendarPlaceHolder";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import "./CalendarDropDown.scss";
import {
  displayCalendar,
  endDateStore,
  startDateStore,
  toggleDisplayCalendar,
} from "../../../redux/slice/calendarSlice";
import Calendar from "./Calendar/Calendar";
import { dropDownPropType } from "../../../types/DataTypes";
const CalendarDropDown: FC<dropDownPropType> = ({ register, errors,alignment }) => {
  const selectedStartDate: string = useAppSelector(startDateStore);
  const selectedEndDate: string = useAppSelector(endDateStore);
  const toggleCalendar: boolean = useAppSelector(displayCalendar);
  const dispatch = useAppDispatch();
  return (
    <div className={`calendar-drop-down__${alignment}`}>
      <FormControl>
        <Select
          displayEmpty
          multiple
          open={toggleCalendar}
          onOpen={() => {
            dispatch(toggleDisplayCalendar());
          }}
          onClose={() => dispatch(toggleDisplayCalendar())}
          value={[selectedStartDate, selectedEndDate]}
          {...register("dateRange")}
          input={<OutlinedInput />}
          style={{
            textAlign: "left",
            width: "100%",
          }}
          MenuProps={{
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
            transformOrigin: {
              vertical: "top",
              horizontal: "left",
            },
          }}
          renderValue={() => {
            return (
              <em>
                <CalendarPlaceHolder horizontalView={alignment==="horizontal"}/>
              </em>
            );
          }}
          inputProps={{ "aria-label": "Without label" }}
          IconComponent={()=><CalendarMonthOutlinedIcon className="calendar-icon" /> }
        >          
          <Calendar />
        </Select>
      </FormControl>
    </div>
  );
};

export default CalendarDropDown;
