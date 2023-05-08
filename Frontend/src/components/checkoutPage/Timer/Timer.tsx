/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAppSelector } from "../../../redux/hooks";
import { checkoutTime } from "../../../redux/slice/checkoutSlice";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import "./Timer.scss";
import { useTranslation } from "react-i18next";

const Timer: FC = () => {
  const timeToCheckout = new Date(useAppSelector(checkoutTime) * 1);
  const navigate = useNavigate();

  const [minutesLeft, setMinutesLeft] = useState<string>("");
  const [secondsLeft, setSecondsLeft] = useState<string>("");
  const { t } = useTranslation();


  useEffect(() => {
    const intervalId = setInterval(() => {
      const timeDiff = timeToCheckout.getTime() - Date.now();

      if (timeDiff <= 0) {
        navigate("/");
        clearInterval(intervalId);
        setMinutesLeft("00");
        setSecondsLeft("00");
      } else {
        const minutes = Math.floor(timeDiff / 1000 / 60);
        const seconds = Math.floor((timeDiff / 1000) % 60);
        setMinutesLeft(`${parseInt(minutes.toString().padStart(2, "0"))}`);
        setSecondsLeft(`${parseInt(seconds.toString().padStart(2, "0"))}`);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeToCheckout]);

  return (
    <div className="timer">
      <AccessTimeIcon className="timer__icon" />
      {parseInt(minutesLeft) > 1
        ? `  ${minutesLeft} ${t("Minutes")}`
        : `${minutesLeft} ${t("Minute")}`}{" "}
      {parseInt(secondsLeft) !== 0
        ? parseInt(secondsLeft) > 1
          ? `${secondsLeft} ${t("Seconds")} `
          : `${secondsLeft} ${t("Second")} `
        : ``}{" "}
      {t("left to complete checkout")}!
    </div>
  );
};
export default Timer;
