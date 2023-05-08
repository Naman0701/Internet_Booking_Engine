import { FC, useEffect } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import "./CommonDropDown.scss";
import { useTranslation } from "react-i18next";
import { commonDropDownPropType } from "../../../types/DataTypes";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { eligibleGuest, selectedBeds, selectedRooms, setSelectedBeds, setSelectedRooms } from "../../../redux/slice/landingPageSlice";

const CommonDropDown: FC<commonDropDownPropType> = ({
  register,
  alignment,
  name,
  commonListMaxLimit,
}) => {
  const selectedValue:number = useAppSelector(name==="Rooms"?selectedRooms:selectedBeds);
  const dispatch=useAppDispatch();
  const eligileSelectedGuest: number = useAppSelector(eligibleGuest);
  const setSelectedValue=(value:string|number)=>{
    name==="Rooms"?dispatch(setSelectedRooms(value)):dispatch(setSelectedBeds(value))
  }
  const handleChange = (event: SelectChangeEvent<typeof selectedValue>) => {
    const {
      target: { value },
    } = event;
    setSelectedValue(value);
  };
  const { t } = useTranslation();
  
  useEffect(() => {
    if (eligileSelectedGuest>0 && eligileSelectedGuest < selectedValue) {
      setSelectedValue(eligileSelectedGuest);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eligileSelectedGuest]);

  return (
    <div className={`common-drop-down__${alignment}`}>
      {commonListMaxLimit > 0 && (
        <FormControl>
          <Select
            displayEmpty
            value={selectedValue}
            {...register(name, { required: "Property is required" })}
            onChange={handleChange}
            input={<OutlinedInput />}
            renderValue={(selected) => {
              if (selected === 0) {
                return <em>{t(name)}</em>;
              }
              if (alignment === "horizontal") {
                return (
                  <div className="renderer">
                    <span className="renderlabel">{t(name)}</span>
                    <span className="renderValue">{selected}</span>
                  </div>
                );
              }
              return selected;
            }}
            inputProps={{ "aria-label": "Without label" }}
          >
            {Array.from({ length: commonListMaxLimit }, (_, index) => (
              <MenuItem
                key={index + 1}
                value={(index + 1).toString()}
                disabled={name === "Rooms" && index + 1 > eligileSelectedGuest}
              >
                {index + 1}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </div>
  );
};
export default CommonDropDown;
