import React, { FC, useEffect } from "react";
import { CountryDropdown } from "react-country-region-selector";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { country, formInfo, setCountryState, setFormInfo } from "../../../redux/slice/checkoutSlice";

const CountryDropDown: FC = () => {
  const selectedCountry: string = useAppSelector(country);
  const formDetails = useAppSelector(formInfo);
  const dispatch = useAppDispatch();
  const setCountry = (country: string) => {
    dispatch(setFormInfo({ ...formDetails, country }));
    dispatch(setCountryState(country));
  };
  useEffect(()=>{
    dispatch(setFormInfo({ ...formDetails, country:selectedCountry }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[dispatch])
  return (
    <CountryDropdown
      value={selectedCountry}
      showDefaultOption={false}
      onChange={(val) => setCountry(val)}
    />
  );
};

export default CountryDropDown;
