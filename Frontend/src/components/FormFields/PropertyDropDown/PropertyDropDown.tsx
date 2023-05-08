import React, { FC, useState } from "react";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { useAppSelector } from "../../../redux/hooks";
import { dropDownPropType, propertyType } from "../../../types/DataTypes";
import { MenuItem } from "@mui/material";
import FormControl from "@mui/material/FormControl";

import { SelectChangeEvent } from "@mui/material/Select";
import Alert from "@mui/material/Alert";

import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import "./PropertyDropDown.scss";
import { useTranslation } from "react-i18next";
import { landingPageConfigData } from "../../../redux/slice/configurationsSlice";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(
  name: string,
  propertyName: readonly string[],
  theme: Theme
) {
  return {
    fontWeight:
      propertyName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const PropertyDropDown: FC<dropDownPropType> = ({
  register,
  errors,
  alignment,
}) => {
  const propertyList: propertyType[] = useAppSelector(
    landingPageConfigData
  ).property;
  const theme = useTheme();
  const [propertyName, setPropertyName] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof propertyName>) => {
    const {
      target: { value },
    } = event;
    setPropertyName(typeof value === "string" ? value.split(",") : value);
    if (errors && errors.property) {
      errors.property.type = "";
    }
  };
  const { t } = useTranslation();

  return (
    <div className={`property-drop-down__${alignment}`}>
      <FormControl>
        <Select
          multiple
          displayEmpty
          value={propertyName}
          {...register("property", { required: "Property is required" })}
          onChange={handleChange}
          input={<OutlinedInput />}
          style={{
            textAlign: "left",
            width: "100%",
          }}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>{t("Select the property")}</em>;
            }

            return t(selected.join(", "));
          }}
          MenuProps={MenuProps}
          inputProps={{ "aria-label": "Without label" }}
        >
          {propertyList.map((property: propertyType) => (
            <MenuItem
              key={property.propertyID}
              value={property.propertyName}
              style={getStyles(property.propertyName, propertyName, theme)}
            >
              <Checkbox
                checked={propertyName.indexOf(property.propertyName) > -1}
                name={property.propertyName}
              />

              {t(property.propertyName)}
            </MenuItem>
          ))}
        </Select>

        {errors?.property?.type === "required" && (
          <Alert severity="error" className="alert">
            {t("This field is required!")}
          </Alert>
        )}
      </FormControl>
    </div>
  );
};

export default PropertyDropDown;
