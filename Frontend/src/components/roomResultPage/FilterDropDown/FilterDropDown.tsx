import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  addFilterState,
  filters,
  removeFilterState,
  setFilterState,
} from "../../../redux/slice/roomResultPageSlice";
import { currencyType, filterType } from "../../../types/DataTypes";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./FilterDropDown.scss";
import { useTranslation } from "react-i18next";
import { roomResultPageConfigData } from "../../../redux/slice/configurationsSlice";
import {
  selectedCurrency,
  selectedCurrencyFactor,
} from "../../../redux/slice/currencyConverterSlice";
const FilterDropDown: FC = () => {
  const filterList: filterType[] = useAppSelector(
    roomResultPageConfigData
  ).filter;
  const dispatch = useAppDispatch();
  const currentFilters: filterType[] = useAppSelector(filters);
  const { t } = useTranslation();

  const choosenCurrency: currencyType = useAppSelector(selectedCurrency);
  const currencyFactor: number = useAppSelector(selectedCurrencyFactor);
  const getStatusOfFilter = (filter: filterType, filterValue: string) => {
    const indexOfFilter = currentFilters.findIndex(
      (f) => f.attribute === filter.attribute
    );
    if (indexOfFilter === -1) {
      return false;
    } else {
      const indexOfFilterValue = currentFilters[indexOfFilter].values.findIndex(
        (f) => f === filterValue
      );
      return indexOfFilterValue!==-1;
    }
  };
  const handleChange = (filter: filterType, filterValue: string) => {
    const indexOfFilter = currentFilters.findIndex(
      (f) => f.attribute === filter.attribute
    );

    if (indexOfFilter === -1) {
      dispatch(setFilterState({ filter, filterValue }));
    } else {
      const indexOfFilterValue = currentFilters[indexOfFilter].values.findIndex(
        (f) => f === filterValue
      );

      if (indexOfFilterValue === -1) {
        dispatch(addFilterState({ filterValue, indexOfFilter }));
      } else if (indexOfFilterValue !== -1) {
        dispatch(removeFilterState({ filterValue, indexOfFilter }));
      }
    }
  };

  return (
    <div className="filter-section__filter">
      {filterList.map((filter: filterType, index) => {
        return (
          <Accordion key={index}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className="filter-section__filter__title">
                {t(`${filter.name}`)}
              </Typography>
            </AccordionSummary>
            {filter.values.map((filterValue: string, index) => {
              return (
                <AccordionDetails key={index}>
                  <Typography className="filter-section__filter__value">
                    <FormControlLabel
                      value={filterValue}
                      onChange={() => handleChange(filter, filterValue)}
                      control={<Checkbox checked={getStatusOfFilter(filter, filterValue)} />}
                      label={
                        <span className="filter-section__filter__value__label">
                          {filter.attribute === "price_type_filter"
                            ? `${choosenCurrency.currencyIcon} ${(
                                parseInt(filterValue.split("-")[0]) *
                                currencyFactor
                              ).toFixed(2)} - ${(
                                parseInt(filterValue.split("-")[1]) *
                                currencyFactor
                              ).toFixed(2)}`
                            : t(`${filterValue}`)}
                        </span>
                      }
                      labelPlacement="end"
                    />
                  </Typography>
                </AccordionDetails>
              );
            })}
          </Accordion>
        );
      })}
    </div>
  );
};

export default FilterDropDown;
