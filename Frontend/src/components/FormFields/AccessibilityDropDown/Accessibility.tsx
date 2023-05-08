import { Checkbox, FormControlLabel } from "@mui/material";
import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../redux/hooks";
import { landingPageConfigData } from "../../../redux/slice/configurationsSlice";
import { accessibilityType, dropDownPropType } from "../../../types/DataTypes";
import "./Accessibility.scss";


const Accessibility: FC<dropDownPropType> = ({ register,alignment }) => {
  const accessibilities: accessibilityType[] = useAppSelector(
    landingPageConfigData
  ).accessibilities;
  const [selectAccessabilities, setSelectAccessabilities] = useState<string[]>(
    []
  );
  const {t}=useTranslation();

  const handleChange = (accessibilityName: string) => {
    let newAccessabilities = selectAccessabilities;

    if (selectAccessabilities.indexOf(accessibilityName) > -1) {
      newAccessabilities = newAccessabilities.filter(
        (accessibilitiy: string) => {
          return accessibilitiy !== accessibilityName;
        }
      );
    } else {
      newAccessabilities.push(accessibilityName);
    }
    setSelectAccessabilities(newAccessabilities);
  };
  return (
    <div className="accessibility-div">
      {accessibilities.map((accessibilitiy: accessibilityType) => {
        return (
          <FormControlLabel
            key={accessibilitiy.accessibilityName}
            onChange={() => handleChange(accessibilitiy.accessibilityName)}
            control={<Checkbox name={accessibilitiy.accessibilityName} />}
            label={
              <span className="accessibilitiy">
                <img
                  src={accessibilitiy.icon}
                  alt={accessibilitiy.accessibilityName}
                  className="accessibilitiy__icon"
                />{" "}
                {t(`${accessibilitiy.accessibilityDescription}`)}
              </span>
            }
          />
        );
      })}
    </div>
  );
};

export default Accessibility;
