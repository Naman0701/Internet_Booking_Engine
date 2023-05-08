import {
  accessibilityType,
  bookingDetailsType,
  currencyType,
  filterType,
  FormFieldValueType,
  FormFieldValueTypeWithLength,
  guestType,
  propertyType,
  sortType,
  stringToNumberType,
} from "../types/DataTypes";

export interface DefaultPromotionState {
  loadingStatus: boolean;
  errorStatus: boolean;
  defaultPromotionsList: ResponseBodyForDefaultPromotion[];
  reqBody: RequestBodyForDeals;
}
export interface backendHealthCheckState {
  test: string;
  loadingStatus: boolean;
  errorStatus: boolean;
}
export interface SearchFormStateInterface {
  formDetails: FormDetailsInterface | null;
}
export interface DateRangeProp {
  startDate: string | undefined;
  endDate: string | undefined;
}
export interface FormDetailsInterface {
  property: string[];
  dateRange: string[] | string;
  "guests-vertical"?: string[];
  "guests-horizontal"?: string[];
  Rooms: string;
  Beds?: string;
}

export interface CommonAppState {
  currentProgress: number;
}

export interface LandingPageState {
  loadingStatus: boolean;
  errorStatus: boolean;
  selectedRooms: number;
  selectedBeds: number;
  eligibleGuest: number;
  totalMaxGuest: number;
}
export interface HotelData {
  hotelLogo: string;
  serviceName: string;
  tenantName: string;
  hotelBanner: string;
  maxLengthOfStay: number;
  property: propertyType[];
  languageSupport: string[];
  currencySupport: currencyType[];
  guests: guestType[];
  maxGuestPerRoom: number;
  maxBookingRooms: number;
  bedsPerRoom: number;
  accessibilities: accessibilityType[];
  guestType: FormFieldValueType[];
}

export type CheckoutFormFieldInterface = {
  fieldName: string;
  fieldValues: FormFieldValueTypeWithLength[];
};

export interface RoomResultPageState {
  loadingStatus: boolean;
  errorStatus: boolean;
  filters: filterType[];
  sort: sortType;
  pageRange: number[];
  requestBody: RequestBody;
  fetchedRoomResultList: ResponseBody[];
}
export interface CheckoutFormPageInterface {
  formConfigData: CheckoutFormFieldInterface[];
}
export interface BookingPageInterface {
  cancelled: string;
}

export interface RoomResultData {
  roomTypes: any;
  sort: sortType[];
  filter: filterType[];
  resultSize: number;
}

export interface CalendarState {
  startDateStore: string;
  endDateStore: string;
  displayCalendar: boolean;
  initialCheckStatus: boolean;
  minimumNightlyRates: stringToNumberType[];
  minimumNightlyRatesErrorStatus: boolean;
  minimumNightlyRatesLoadingStatus: boolean;
  minimumNightlyRatesErrorMessage: string | undefined;
}

export interface DateRangeInterface {
  startDate: Date;
  endDate: Date;
  key: String;
}

export interface CurrencyConverterState {
  currencyFactors: stringToNumberType[] | any;
  selectedcurrencyFactor: number;
  selectedCurrency: currencyType;
  loadingStatus: boolean;
  errorStatus: boolean;
}

export interface UserState {
  id: string;
  username: string;
  email: string;
  isAuthenticated: boolean;
}

export interface ProgressInterface {
  progressId: number;
  name: string;
}

export interface RequestBody {
  startDate: string;
  endDate: string;
  roomCount: number;
  propertyId: number;
  guests: string;
  sortType?: sortType;
  filterType?: filterType[];
}
export interface RequestBodyForDeals {
  startDate: string;
  endDate: string;
  applicableDiscountType: string | null;
}
export interface RequestBodyForDailyPriceBreakdown {
  startDate: string;
  endDate: string;
  roomCount: number;
  propertyId: number;
  roomType: string;
}
export interface ResponseBody {
  roomTypeName: string;
  singleBed: number;
  roomTypeId: number;
  maxCapacity: number;
  doubleBed: number;
  areaInSquareFeet: number;
  rate: number;
  totalBeds: number;
  specialDeal: boolean;
  specialDealDescription: string;
  rating: string;
  reviewers: number;
}
export interface ResponseBodyForDefaultPromotion {
  isDeactivated: boolean;
  minimumDaysOfStay: number;
  priceFactor: number;
  promotionDescription: string;
  promotionTitle: string;
  promotionId: number;
}
export interface ResponseBodyForDailyPriceBreakdown {
  priceBreakdownRecord: Record<string, number>;
}
export interface ResponseBodyForCustomPromotion {
  promoCode: string;
  minimumDaysOfStay: number;
  priceFactor: number;
  promotionDescription: string;
  promotionTitle: string;
  promotionId: number;
  deactivated: boolean;
}
export interface BookingData {
  dateRange: string;
  Rooms: string;
  Beds: string;
  horizontalGuests?: string[];
  verticalGuests?: string[];
}
export interface BookingDateProp {
  date: Date;
  dateType: string;
}
export interface ageGroupCountMapInterface {
  [key: string]: number;
}

export interface RatingsLabel {
  [key: number]: string;
}

export interface RequestBodyForReview {
  bookingId: string;
  rating: number;
  review: string;
}

export interface CheckoutState {
  checkoutTime: number;
  checkout: boolean;
  bookingId: string;
  property: string;
  bookingData: {};
  activeForm: number;
  country: string;
  promoDetails: {
    title: string;
    description: string;
    priceFactor: number;
    roomType: string;
  };
  itenaryDetails: ItenaryDetails | null;
  formInfo: any;
  pushBookingErrorStatus: boolean;
  pushBookingLoadingStatus: boolean;
  getStatusErrorStatus: boolean;
  getStatusLoadingStatus: boolean;
  termsAccepted: boolean;
  sendSpecialOffer:boolean;
}
export interface BookingConfirmedInterface {
  bookingId: string;
  activeAccordian: string;
  bookingDetails: bookingDetailsType;
  loadingStatus: boolean;
  errorStatus: boolean;
  otpVerified: boolean;
  errorMessage: string;
  emailLoadingStatus: boolean;
  emailErrorStatus: boolean;
}
export interface MyBookingsInterface{
  bookingsList:bookingDetailsType[];
}
export interface ItenaryDetails {
  dateRange: string;
  guests: any;
  roomCount: number;
  subtotal: number;
  taxes: number;
  van: number;
  totalStayPrice: number;
  packageTotal: number;
  promoDiscount: number;
  dueNow: number;
  dueAtResort: number;
}

export interface PromoDetailsBody {
  title: string;
  description: string;
  priceFactor: number;
  roomType: string;
}
export interface ConfigurationState {
  landingPageConfigData: HotelData;
  roomResultPageConfigData: RoomResultData;
  checkoutPageConfigData: CheckoutFormPageInterface;
  bookingPageConfigData: BookingPageInterface;
  configLoading: boolean;
  configError: boolean;
}
