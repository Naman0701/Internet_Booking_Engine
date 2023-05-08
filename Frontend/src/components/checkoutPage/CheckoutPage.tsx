import React, { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setProgress } from "../../redux/slice/checkerSlice";
import { setActiveForm, setFormInfo, setSendSpecialOffer, setTermsAccepted } from "../../redux/slice/checkoutSlice";
import { fetchCheckoutPageConfig } from "../../redux/slice/configurationsSlice";
import IteneraryPanel from "../itenerary/IteneraryPanel";
import ProgressChecker from "../progressChecker/ProgressChecker";
import "./CheckoutPage.scss";
import PaymentForm from "./PaymentForm/PaymentForm";
import Timer from "./Timer/Timer";

const CheckoutPage: FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const isCheckout = useAppSelector((state) => state.checkout.checkout);

  useEffect(() => {
    dispatch(fetchCheckoutPageConfig());
    dispatch(setProgress(3));
    dispatch(setActiveForm(0));
    dispatch(setFormInfo(null));
    dispatch(setTermsAccepted(false));
    dispatch(setSendSpecialOffer(false));

  }, [dispatch]);

  return (
    <div className="checkout-page">
      <ProgressChecker />
      <div className="checkout-page__content">
        <PaymentForm/>
        <div className="checkout-page__itenerary-panel">
          {isCheckout && <IteneraryPanel />}
          <span className="checkout-page__need-help">
            <span className="help__title">{t("Need help?")}</span>
            <span className="help__subtitle">{t("Call 1-800-555-5555")}</span>
            <span className="help__text">{t("Mon-Fri 8am-5pm EST")}</span>
          </span>
        </div>
      </div>
      <Timer/>
    </div>
  );
};

export default CheckoutPage;
