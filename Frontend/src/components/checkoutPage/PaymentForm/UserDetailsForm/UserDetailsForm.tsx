import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CheckoutFormFieldInterface } from "../../../../interface/DataInterface";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  activeForm,
  formInfo,
  itenaryDetails,
  pushBooking,
  setActiveForm,
  setBookingId,
  setFormInfo,
  termsAccepted,
} from "../../../../redux/slice/checkoutSlice";
import { checkoutPageConfigData } from "../../../../redux/slice/configurationsSlice";
import { FormFieldValueTypeWithLength } from "../../../../types/DataTypes";
import InputField from "../InputField/InputField";
import "./UserDetailsForm.scss";
import { TravellerSchema } from "../../../../utils/yupResolvers/TravellerInfoResolver";
import { selectedCurrency, selectedCurrencyFactor } from "../../../../redux/slice/currencyConverterSlice";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

type Props = {
  userDetailsForm: CheckoutFormFieldInterface;
  index: number;
};

const UserDetailsForm: FC<Props> = ({ userDetailsForm, index }) => {
  const formConfigData: CheckoutFormFieldInterface[] = useAppSelector(
    checkoutPageConfigData
  ).formConfigData;
  const iteneraryDetail = useAppSelector(itenaryDetails);
  const currentActiveForm: number = useAppSelector(activeForm);
  const dispatch = useAppDispatch();
  const currency = useAppSelector(selectedCurrency);
  const currencyFactor: number = useAppSelector(selectedCurrencyFactor);
  const formDetails = useAppSelector(formInfo);
  const termsAndConditions: boolean = useAppSelector(termsAccepted);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(TravellerSchema),
  });
  const navigate = useNavigate();
  const onEdit = (number: number) => {
    dispatch(setActiveForm(number - 1));
  };
  const onSubmit = async (data: any) => {
    dispatch(setFormInfo({ ...formDetails, ...data }));
    if (index < formConfigData.length - 1) {
      dispatch(setActiveForm(index + 1));
    } else {
      dispatch(setBookingId(""));
      await dispatch(pushBooking());
      navigate("/bookingProcessing");
    }
  };
  const { t } = useTranslation();
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`payment-form__userDetails-form ${
        currentActiveForm === index ? "" : "hide-form"
      }`}
    >
      {userDetailsForm.fieldValues.map(
        (inputField: FormFieldValueTypeWithLength, index: number) => {
          return (
            <InputField
              key={index}
              inputField={inputField}
              register={register}
              errors={errors}
            />
          );
        }
      )}

      {index === formConfigData.length - 1 && (
        <div className="payment-form__userDetails__due">
          {t("Total Due")} &nbsp;{" "}
          <span className="payment-form__userDetails__due__amount">
            {currency.currencyIcon}&nbsp;
            {iteneraryDetail !== null
              ? (currencyFactor*(iteneraryDetail.dueAtResort + iteneraryDetail.dueNow)).toFixed(
                  2
                )
              : 0}
          </span>
        </div>
      )}
      <div className="payment-form__userDertails-form__button">
        {index > 0 && (
          <button
            className="payment-form__userDertails-form__edit-prev"
            type="button"
            onClick={() => onEdit(index)}
          >
            {t("Edit")}{" "}
            {t(`${formConfigData[index - 1].fieldName.replace("_", " ")}`)}
          </button>
        )}
        <button
          className="payment-form__userDertails-form__edit-next"
          disabled={
            index < formConfigData.length - 1 ? false : !termsAndConditions
          }
          type="submit"
        >
          {index < formConfigData.length - 1
            ? t(
                `NEXT: ${formConfigData[index + 1].fieldName.replace("_", " ")}`
              )
            : t("PURCHASE")}
        </button>
      </div>
    </form>
  );
};

export default UserDetailsForm;
