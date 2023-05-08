import {
  Checkbox,
  FormControl,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { FC, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../../../redux/hooks";
import { setSendSpecialOffer, setTermsAccepted } from "../../../../redux/slice/checkoutSlice";
import { InputFieldPropType } from "../../../../types/DataTypes";
import CountryDropDown from "../../../FormFields/CountryDropDown/CountryDropDown";
import StateDropDown from "../../../FormFields/StateDropDown/StateDropDown";
import "./InputField.scss";

const InputField: FC<InputFieldPropType> = ({
  inputField,
  register,
  errors,
}) => {
  const { t } = useTranslation();
  const dispatch=useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleTermsOnChange=(name:string,event:any)=>{
    if(name.includes("Terms and Policies"))
    {
      dispatch(setTermsAccepted(event.target.checked));
    }
    else if(name.includes("special"))
    {
      dispatch(setSendSpecialOffer(event.target.checked));
    }
  }
  const handleInputMaxLength = (event: any) => {   
    if (inputField.type === "number") {
      const onlyNumbers = event.target.value.replace(/[^0-9]/g, '');
      event.target.value = onlyNumbers;
    }
    if (event.target.value.length > inputField.maxLength) {
      event.target.value = event.target.value.slice(0, inputField.maxLength);
    }
  };
  return (
    <FormControl
      className={`input-field__form-control ${inputField.name.replace(
        " ",
        "_"
      )} ${inputField.value}`}
    >
      {inputField.value !== "select" && inputField.value !== "checkbox" && (
        <>
          <span className="input-field__label">{t(`${inputField.name}`)}</span>
          <TextField
            error={
              errors[inputField.name.replace(" ", "_").toLowerCase()] !==
              undefined
            }
            helperText={
              errors[inputField.name.replace(" ", "_").toLowerCase()] !==
              undefined
                ? `${t(errors[inputField.name.replace(" ", "_").toLowerCase()]?.message?.toString() as string)}`: ""
            }
            className="input-field__value"
            type={inputField.value}
            inputRef={inputRef}
            onInput={handleInputMaxLength}
            {...register(`${inputField.name.replace(" ", "_").toLowerCase()}`, {
              required: "This is required",
            })}
          />
        </>
      )}
      {inputField.value === "select" && inputField.name === "Country" && (
        <>
          <span className="input-field__label">{t(inputField.name)}</span>
          <CountryDropDown />
        </>
      )}
      {inputField.value === "select" && inputField.name === "State" && (
        <>
          <span className="input-field__label">{t(inputField.name)}</span>
          <StateDropDown />
        </>
      )}
      {inputField.value === "checkbox" && (
        <FormControlLabel
          control={<Checkbox name={inputField.name} />}
          label={
            <span className="input-field__checkbox-label">
              {t(`${inputField.name}`)}
            </span>
          }
          onChange={(event)=>handleTermsOnChange(inputField.name,event)}
        />
      )}
    </FormControl>
  );
};

export default InputField;
