import React, { FC } from "react";
import { CheckoutFormFieldInterface } from "../../../interface/DataInterface";
import { useAppSelector } from "../../../redux/hooks";
import { checkoutPageConfigData } from "../../../redux/slice/configurationsSlice";
import "./PaymentForm.scss";
import UserDetailsForm from "./UserDetailsForm/UserDetailsForm";
import { useTranslation } from "react-i18next";

const PaymentForm: FC = () => {
  const formConfigData: CheckoutFormFieldInterface[] = useAppSelector(
    checkoutPageConfigData
  ).formConfigData;
  const {t}=useTranslation();

  return (
    <div className="payment-form">
      {t("Payment Info")}
      {formConfigData.map(
        (userDetailsForm: CheckoutFormFieldInterface, index: number) => {
          return (
            <div className="payment-form__userDetailsForm" key={index}>
              <span className="payment-form__userDetailsForm__title">{t(`${
                index + 1
              }. ${userDetailsForm.fieldName.replace("_", " ")}`)}</span>
              <UserDetailsForm
                index={index}
                userDetailsForm={userDetailsForm}
              />
            </div>
          );
        }
      )}
    </div>
  );
};

export default PaymentForm;
