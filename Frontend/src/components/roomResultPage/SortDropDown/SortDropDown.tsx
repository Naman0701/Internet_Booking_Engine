import { FormControl, MenuItem, OutlinedInput, Select, SelectChangeEvent } from "@mui/material";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { roomResultPageConfigData } from "../../../redux/slice/configurationsSlice";
import { setSortState, sort } from "../../../redux/slice/roomResultPageSlice";
import { sortType } from "../../../types/DataTypes";
import "./SortDropDown.scss";

const SortDropDown: FC = () => {
  const sortList: sortType[] = useAppSelector(roomResultPageConfigData).sort;
  const selectedSort:sortType=useAppSelector(sort);
  const {t}=useTranslation();
  
  const dispatch=useAppDispatch();

  const handleChange=(event: SelectChangeEvent<string>)=>{
    const {
        target: { value },
      } = event;      
    dispatch(setSortState(JSON.parse(value)));
      
  }

  return (
    <div className="sortDropDown">
      {sortList.length > 0 && (
        <FormControl>
          <Select
            displayEmpty
            value={JSON.stringify(selectedSort)}
            onChange={handleChange}
            input={<OutlinedInput style={{ outline: 'none',border:"none" }} />}
            renderValue={(selected) => {
              const activeSort:sortType=JSON.parse(selected);
              return t(`${activeSort.name}`);
            }}
            inputProps={{ "aria-label": "Without label" }}
          >
            {sortList.map((sortType:sortType) => (
              <MenuItem
                key={sortType.name}
                value={JSON.stringify(sortType)}
              >
                {t(`${sortType.name}`)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </div>
  );
};

export default SortDropDown;
