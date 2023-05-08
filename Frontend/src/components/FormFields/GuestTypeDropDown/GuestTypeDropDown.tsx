import {
  Checkbox,
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";
import { FC, useState } from "react";

import { useAppSelector } from "../../../redux/hooks";
import { landingPageConfigData } from "../../../redux/slice/configurationsSlice";
import { dropDownPropType, FormFieldValueType } from "../../../types/DataTypes";
import { useTranslation } from "react-i18next";
import'./GuestDropDown.scss'

function getStyles(name: string, guestType: string, theme: Theme) {
  return {
    fontWeight:
      guestType === name
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 350,
    },
  },
};

const GuestTypeDropDown: FC<dropDownPropType> = ({
  register,
  errors,
  alignment,
}) => {
  const guestTypeList: FormFieldValueType[] = useAppSelector(
    landingPageConfigData
  ).guestType;
  const [selectedGuestType, setSelectedGuestType] =
    useState<FormFieldValueType>({
      name: "",
      value: "",
    });
  const theme = useTheme();
  const { t } = useTranslation();

  const handleChange = (guestType: FormFieldValueType) => {
    if (selectedGuestType.value === guestType.value) {
      setSelectedGuestType({ name: "", value: "" });
    } else {
      setSelectedGuestType(guestType);
    }
  };

  return (
    <div className="landing-page__guest-type">
      <FormControl>
        <Select
          displayEmpty
          value={selectedGuestType.value}
          {...register("applicableDiscountType")}
          input={<OutlinedInput />}
          style={{
            textAlign: "left",
            width: "100%",
          }}
          renderValue={() => {
            if (selectedGuestType.name === "") {
              return <em>{t("Select the guest type (optional)")}</em>;
            }
            return t(`${selectedGuestType.name}`);
          }}
          MenuProps={MenuProps}
          inputProps={{ "aria-label": "Without label" }}
        >
          {guestTypeList.map((guestType: FormFieldValueType) => (
            <MenuItem
              key={guestType.value}
              value={guestType.value}
              onClick={() => handleChange(guestType)}
              style={getStyles(guestType.value, selectedGuestType.value, theme)}
            >
              <Checkbox
                checked={selectedGuestType.value === guestType.value}
                name={guestType.value}
              />

              {t(`${guestType.name}`)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default GuestTypeDropDown;
