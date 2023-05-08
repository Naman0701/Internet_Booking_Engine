import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { ResponseBody } from "../interface/DataInterface";

export type guestType = {
  ageGroupName: string;
  minAge: number;
  maxAge: number;
  min: number;
};

export type accessibilityType = {
  accessibilityName: string;
  accessibilityDescription: string;
  icon: string;
};

export type currencyType = {
  currencyIcon: string;
  currencyName: string;
};

export type propertyType = {
  propertyID: number;
  propertyName: string;
  landMark: string;
};

export type FormFieldValueType = {
  name: string;
  value: string;
};

export type FormFieldValueTypeWithLength = {
  name: string;
  value: string;
  maxLength:number;
  type:string;
};
export type InputFieldPropType = {
  inputField: FormFieldValueTypeWithLength;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
};

export type commonDropDownPropType = {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  alignment: string;
  name: string;
  commonListMaxLimit: number;
};
export type dropDownPropType = {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  alignment: string;
};
export type stringToNumberType = {
  [key: string]: number;
};

export type crousalPropType = {
  images: string[];
  height: string;
  width:string;
};
export type RoomDetailsModalPropType = {
  roomDetails: ResponseBody;
};
export type PromoDetailsModalPropType = {
  promoTitle: string;
  promoDescription: string;
  promoPrice: number;
};
export type requestBodyForCustomPromotion = {
  startDate: string;
  endDate: string;
  roomType: string;
  promoCode: string;
};
export type rateAndDealCardPropType = {
  rate: string;
  title: string;
  description: string;
  roomTypeName: string;
  promoPriceFactor: number;
};
export type customPromotionPropType = {
  roomTypeName: string;
};

export type sortType = {
  name: string;
  attribute: string;
  order: string;
};

export type filterType = {
  name: string;
  attribute: string;
  values: string[];
};
export type errorResponse = {
  errorCode: number;
  errorMessage: string;
};

export type bookingDetailsType={

  bookingId: string,
  sessionId: string,
  firstName: string,
  lastName: string,
  phone: string,
  email: string,
  cardNumber: string,
  propertyId: string,
  checkInDate: string,
  checkOutDate: string,
  guests: string,
  promoTitle:string,
  promoDescription:string,
  nightlyRate: string,
  subtotal: string,
  taxes: string,
  vat: string,
  totalForStay: string,
  roomType: string,
  mailingAddress1: string,
  country: string,
  state: string,
  zip: string,
  roomsList:string[],
  isDeleted:boolean,
}