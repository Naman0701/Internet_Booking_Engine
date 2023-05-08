import * as yup from "yup";
export const TravellerSchema = yup.object().shape({
  first_name: yup.string().trim().notOneOf([""], "First name can't be empty"),
  last_name: yup.string().trim().notOneOf([""], "Last name can't be empty"),
  mailing_address1: yup
    .string()
    .trim()
    .notOneOf([""], "Primary Mailing Address can't be empty"),
  city: yup.string().trim().notOneOf([""], "City can't be empty"),

  phone: yup
    .string()
    .matches(/^\d{10}$/, "Please enter a valid 10-digit phone number"),

  zip: yup.string().matches(/^\d{5,6}$/, "Please enter a valid 5,6-digit pin code"),
  email: yup
    .string()
    .email()
    .matches(/@[^.]*\./, "Please enter a valid email")
    .matches(/^(?!.*@[^,]*,)/, "Please enter a valid email"),
  card_number: yup
    .string()
    .matches(/^\d{15,16}$/, "Please enter valid 15,16-digit card number"),
  exp_mm: yup
    .string()
    .matches(/^(0[1-9]|1[0-2])$/, "Please enter a valid 2-digit expiry month (01-12)"),
  exp_yy: yup
    .string()
    .matches(/^\d{2}$/, "Please enter valid 2-digit expiry year"),
  cvv: yup
    .string()
    .matches(/^\d{3}$/, "Please enter valid 3-digit CVV number"),
});
