import { FC, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  errorMessage,
  fetchCustomPromotion,
  isApplicable,
  setRequestBodyForCustomPromotion,
} from "../../../../redux/slice/customPromotionSlice";
import { customPromotionPropType } from "../../../../types/DataTypes";
import { getCustomPromotionRequestBody } from "../../../../utils/helper/getCustomPromotionRequestBody";
import "./CustomPromotion.scss";

const CustomPromotion: FC<customPromotionPropType> = ({ roomTypeName }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const promoCodeRef = useRef<HTMLInputElement>(null);
  const [couponApplied,setCouponApplied]=useState<boolean>(false);
  const errorResponseMessage:string=useAppSelector(errorMessage);
  const couponIsValid:boolean=useAppSelector(isApplicable);

  const handleCustomPromoApplyButton = () => {
    if (promoCodeRef.current) {
      const promoCode = promoCodeRef.current.value;
      setCouponApplied(true);
      const requestBodyForCustomPromotion = getCustomPromotionRequestBody(
        window.location.search,
        roomTypeName,
        promoCode
      );

      if (requestBodyForCustomPromotion) {
        dispatch(
          setRequestBodyForCustomPromotion(requestBodyForCustomPromotion)
        );
        dispatch(fetchCustomPromotion(requestBodyForCustomPromotion));
      }
    }
  };
  const handleInputChange=()=>{
    setCouponApplied(false);
  }

  return (
    <div className="custom-promo-container">
      <span className="custom-promo__title">{t("Enter a promo code")}</span>
      <span className="custom-promo__submit-field">
        <input
          className="custom-promo__input"
          type="text"
          ref={promoCodeRef}
          onChange={handleInputChange}
        ></input>
        <button
          className="custom-promo__apply-btn"
          type="submit"
          onClick={handleCustomPromoApplyButton}
        >
          {t("APPLY")}
        </button>
      </span>

    {
      couponApplied && <span className={`${couponIsValid?'custom-promo__success-message':'custom-promo__error-message'}`}>
        {couponIsValid?t("Promo Applied."):t(errorResponseMessage)}
      </span>
    }
    </div>
  );
};

export default CustomPromotion;
