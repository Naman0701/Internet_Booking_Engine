import React, { FC } from "react";
import { useForm } from "react-hook-form";
import "./SearchForm.scss";
import { useTranslation } from "react-i18next";
import { HotelData } from "../../../interface/DataInterface";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useNavigate } from "react-router";
import PropertyDropDown from "../../FormFields/PropertyDropDown/PropertyDropDown";
import CalendarDropDown from "../../FormFields/CalendarDropDown/CalendarDropDown";
import GuestDropDown from "../../FormFields/GuestDropDown/GuestDropDown";
import CommonDropDown from "../../FormFields/CommonDropDown/CommonDropDown";
import Accessibility from "../../FormFields/AccessibilityDropDown/Accessibility";
import { getRequestBody } from "../../../utils/helper/getRequestBody";
import {
  filters,
  setRequestBodyState,
  sort,
} from "../../../redux/slice/roomResultPageSlice";
import { filterType, sortType } from "../../../types/DataTypes";
import { getRequestBodyForDefaultPromotion } from "../../../utils/helper/getRequestBodyForDefaultPromotion";
import { setRequestBodyForDealsState } from "../../../redux/slice/defaultPromotionsSlice";
import { setFormDetails } from "../../../redux/slice/searchFormDetailsSlice";
import { setIsApplicable } from "../../../redux/slice/customPromotionSlice";
import { landingPageConfigData } from "../../../redux/slice/configurationsSlice";
import GuestTypeDropDown from "../../FormFields/GuestTypeDropDown/GuestTypeDropDown";
import ReactGA from "react-ga";

type Prop = {
  alignment: string;
};

const SearchForm: FC<Prop> = ({ alignment }) => {
  const landingPageConfig: HotelData = useAppSelector(landingPageConfigData);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentFilter: filterType[] = useAppSelector(filters);
  const currentSort: sortType = useAppSelector(sort);

  const onSubmit = (data: any) => {
    
    dispatch(setIsApplicable(false));
    dispatch(setFormDetails(data));
    const params = new URLSearchParams(data).toString();
    const reqBodyForDeals = getRequestBodyForDefaultPromotion(params);
    const reqBody = getRequestBody(params, currentFilter, currentSort);
    if (reqBody === null) {
      navigate("/");
    } else {
      dispatch(setRequestBodyState(reqBody));
      if (reqBodyForDeals) {
        dispatch(setRequestBodyForDealsState(reqBodyForDeals));
      }
    }
    ReactGA.event({category:'test',action:'submit',label:'Submit'});
    navigate(`/room-result?${params}`);
  };

  const { t } = useTranslation();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`landing-page__${alignment}__form`}
    >
      <span className={`landing-page__${alignment}__form__span`}>
        {landingPageConfig.property && alignment === "vertical" && (
          <div className={`landing-page__${alignment}__form__property-label`}>
            {t("Property name*")}
          </div>
        )}
        {landingPageConfig.property && alignment === "vertical" && (
          <PropertyDropDown
            register={register}
            errors={errors}
            alignment={alignment}
          />
        )}
        {alignment === "vertical" && (
          <div className={`landing-page__${alignment}__form__dates-label`}>
            {t("Select dates")}
          </div>
        )}
        <CalendarDropDown
          register={register}
          errors={errors}
          alignment={alignment}
        />
        <div className={`landing-page__${alignment}__form__extra-options`}>
          {landingPageConfig.guests && (
            <div className={`landing-page__${alignment}__form__guest`}>
              {alignment === "vertical" && (
                <div
                  className={`landing-page__${alignment}__form__guest__label`}
                >
                  {t("Guests")}
                </div>
              )}
              <GuestDropDown
                register={register}
                errors={errors}
                alignment={alignment}
              />
            </div>
          )}
          {landingPageConfig.maxBookingRooms && (
            <div className={`landing-page__${alignment}__form__rooms`}>
              {alignment === "vertical" && (
                <div
                  className={`landing-page__${alignment}__form__rooms__label`}
                >
                  {t("Rooms")}
                </div>
              )}
              <CommonDropDown
                register={register}
                errors={errors}
                alignment={alignment}
                name="Rooms"
                commonListMaxLimit={landingPageConfig.maxBookingRooms}
              />
            </div>
          )}
          {landingPageConfig.bedsPerRoom && alignment !== "vertical" && (
            <div className={`landing-page__${alignment}__form__rooms`}>
              {alignment === "vertical" && (
                <div
                  className={`landing-page__${alignment}__form__rooms__label`}
                >
                  {t("Beds")}
                </div>
              )}
              <CommonDropDown
                register={register}
                errors={errors}
                alignment={alignment}
                name="Beds"
                commonListMaxLimit={landingPageConfig.bedsPerRoom}
              />
            </div>
          )}
          {landingPageConfig.guestType && alignment === "vertical" && (
            <div className="landing-page__guest-type-div">
              {t("Guest Type (optional)")}
              <GuestTypeDropDown
                register={register}
                errors={errors}
                alignment={alignment}
              />
            </div>
          )}

          {landingPageConfig.accessibilities && alignment === "vertical" && (
            <Accessibility
              register={register}
              errors={errors}
              alignment={alignment}
            />
          )}
        </div>
      </span>
      <button
        type="submit"
        value="SEARCH"
        className={`landing-page__${alignment}__search`}
      >
        {alignment === "vertical" ? t("SEARCH") : t("SEARCH DATES")}
      </button>
    </form>
  );
};

export default SearchForm;
