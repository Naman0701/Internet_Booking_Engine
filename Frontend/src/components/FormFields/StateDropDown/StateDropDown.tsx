import React, { FC, useState } from "react";
import { RegionDropdown } from "react-country-region-selector";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  country,
  formInfo,
  setFormInfo,
} from "../../../redux/slice/checkoutSlice";

const StateDropDown: FC = () => {
  const selectedCountry: string = useAppSelector(country);
  const formDetails = useAppSelector(formInfo);
  const dispatch = useAppDispatch();

  const [region, setRegion] = useState<string>("");
  return (
    <RegionDropdown
      country={selectedCountry}
      disabled={selectedCountry === ""}
      value={region}
      onChange={(val) => {
        setRegion(val);
        dispatch(setFormInfo({ ...formDetails, state: val }));
      }}
    />
  );
};

export default StateDropDown;
