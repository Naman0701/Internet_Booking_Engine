import { FormControl, MenuItem, OutlinedInput, Select } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ageGroupCountMapInterface } from "../../../interface/DataInterface";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { landingPageConfigData } from "../../../redux/slice/configurationsSlice";
import {
  eligibleGuest,
  selectedRooms,
  setEligibleGuest,
  setMaxGuestPerRoom,
  totalMaxGuest,
} from "../../../redux/slice/landingPageSlice";
import { dropDownPropType, guestType } from "../../../types/DataTypes";
import "./GuestDropDown.scss";

const GuestDropDown: FC<dropDownPropType> = ({
  register,
  errors,
  alignment,
}) => {
  const guestList: guestType[] = useAppSelector(landingPageConfigData).guests;
  const maxGuestPerRoom: number = useAppSelector(
    landingPageConfigData
  ).maxGuestPerRoom;
  const totalMaxGuests:number=useAppSelector(totalMaxGuest);
  const selectedRoomsNumber:number=useAppSelector(selectedRooms);
  const eligileSelectedGuest: number = useAppSelector(eligibleGuest);
  const dispatch = useAppDispatch();

  const [selectedNumberOfGuest, setSelectedNumberOfGuest] = useState<number>(
    guestList.reduce((acc, guest) => acc + guest.min, 0)
  );

  const [ageGroupCountMap, setAgeGroupCountMap] =
    useState<ageGroupCountMapInterface>(
      guestList.reduce(
        (acc, guest) => ({ ...acc, [guest.ageGroupName]: guest.min }),
        {}
      )
    );
useEffect(()=>{
  dispatch(setMaxGuestPerRoom(maxGuestPerRoom*selectedRoomsNumber));
// eslint-disable-next-line react-hooks/exhaustive-deps
},[selectedRoomsNumber])
  useEffect(() => {
    setAgeGroupCountMap(
      guestList.reduce(
        (acc, guest) => ({ ...acc, [guest.ageGroupName]: guest.min }),
        {}
      )
    );
    const minimumGuestCount=guestList.reduce((acc, guest) => acc + guest.min, 0)
    setSelectedNumberOfGuest(minimumGuestCount);
    dispatch(setEligibleGuest(minimumGuestCount));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guestList]); 

  useEffect(() => {
    const guestValue = Object.entries(ageGroupCountMap)
      .map(([key, value]) => {
        if (value === 0) {
          return "";
        }
        return `${value} ${key}`;
      })
      .filter((str) => str.trim() !== "");
    setGuestTypes(guestValue);
  }, [ageGroupCountMap]);

  const [guestTypes, setGuestTypes] = useState<string[]>([]);

  const handleRemoveGuest = (guest: guestType) => {
    if (ageGroupCountMap[guest.ageGroupName] > guest.min) {
      setSelectedNumberOfGuest(selectedNumberOfGuest - 1);

      setAgeGroupCountMap({
        ...ageGroupCountMap,
        [guest.ageGroupName]: ageGroupCountMap[guest.ageGroupName] - 1,
      });
      if (guest.min > 0) {
        dispatch(setEligibleGuest(eligileSelectedGuest - 1));
      }
    }
  };

  const handleAddGuest = (guest: guestType) => {
    if (selectedNumberOfGuest < totalMaxGuests) {
      setSelectedNumberOfGuest(selectedNumberOfGuest + 1);

      setAgeGroupCountMap({
        ...ageGroupCountMap,
        [guest.ageGroupName]: ageGroupCountMap[guest.ageGroupName] + 1,
      });
      if (guest.min > 0) {
        dispatch(setEligibleGuest(eligileSelectedGuest + 1));
      }
    }
  };
  const { t } = useTranslation();

  return (
    <div className={`guest-type-drop-down__${alignment}`}>
      {guestTypes.length > 0 && (
        <FormControl>
          <Select
            multiple
            displayEmpty
            value={guestTypes}
            {...register(`guests-${alignment}`, {
              required: "Guest is required",
            })}
            input={<OutlinedInput />}
            style={{
              textAlign: "left",
              width: "100%",
            }}
            renderValue={(selected) => {
              const guestEnglish=selected.join(" ").split(" ");
              let guestTranslated="";
              guestEnglish.forEach(item => {
                              
                const translatedItem = isNaN(parseInt(item))?t(item):item;                
                guestTranslated += translatedItem + " ";
              });
              
              
              if (selected.length === 0) {
                return <em>{t("Guests")}</em>;
              }
              if (alignment === "horizontal") {
                return (
                  <div className="renderer">
                    <span className="renderlabel">{t("Guests")}</span>
                    <span className="renderValue">{guestTranslated}</span>
                  </div>
                );
              }
              return guestTranslated;
            }}
            inputProps={{ "aria-label": "Without label" }}
          >
            {guestList.map((guest: guestType) => (
              <MenuItem
                key={guest.ageGroupName}
                value={`${ageGroupCountMap[guest.ageGroupName]} ${
                  guest.ageGroupName
                }`}
                className="guest-menu-item"
                data-testid="guest-menu-item"
              >
                <span className="guest-details" data-testid="guest-details">
                  <span className="guest-details__name">
                    {t(`${guest.ageGroupName}`)}
                  </span>
                  <span className="guest-details__age-group">
                    {t("Ages")} {guest.minAge}
                    {guest.maxAge < 99 ? ` - ${guest.maxAge}` : "+"}
                  </span>
                </span>
                <span className="guest-modification">
                  <span
                    className="guest-modification__remove"
                    onClick={() => handleRemoveGuest(guest)}
                  >
                    -
                  </span>
                  <span className="guest-modification__value">
                    {ageGroupCountMap[guest.ageGroupName]}
                  </span>
                  <span
                    className="guest-modification__add"
                    onClick={() => handleAddGuest(guest)}
                  >
                    +
                  </span>
                </span>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </div>
  );
};

export default GuestDropDown;
