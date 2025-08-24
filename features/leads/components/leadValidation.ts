import * as yup from "yup";

export const leadValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),
  status: yup
    .string()
    .required("Status is required"),
  company: yup
    .string()
    .nullable(),
  phone: yup
    .string()
    .nullable()
    .matches(/^[0-9]+$/, "Phone must contain only digits")
    .min(8, "Phone must be at least 8 digits")
    .max(15, "Phone cannot exceed 15 digits"),
  email: yup
    .string()
    .nullable()
    .email("Invalid email address"),
});