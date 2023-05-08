import React, { FC, useEffect, useState } from "react";
import "./SnackBar.scss";
import { useTranslation } from "react-i18next";
type Props={
    errorStatus:boolean;
    errorType:string;
}

/**
 * A snack bar at the bottom of the screen on success and failure based on the errorStatus. Also it disappears after a while.
 * @param param0 A boolean value based on which the snackbar will be displayed
 * @returns 
 */
const Snackbar: FC<Props> = ({errorStatus,errorType}) => {
  const [message, setMessage] = useState("");
  const { t } = useTranslation();


  /**
   * Based on the error status, update the values of message.
   */
  useEffect(() => {
    setMessage(
      !errorStatus
        ? errorType==="Data" ? "Data fetched successfully":"Email sent successfully"
        : errorType==="Data" ?"Failed to fetch data":"Failed to send mail"
    );
  }, [errorStatus,errorType]);
  return <div className={`snackbar ${
    errorStatus ? "" : "success"
  }`}>{t(message)}</div>;
};

export default Snackbar;
