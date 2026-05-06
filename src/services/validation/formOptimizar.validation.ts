import * as yup from "yup";

export const formOptimizarSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email"),
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
  phone: yup.string().required("Phone number is required"),
  address: yup.string().required("Address is required"),
  course: yup.string().required("Course is required"),
  fees: yup
    .number()
    .typeError("Fees must be a number")
    .required("Fees is required"),
  discount: yup
    .number()
    .typeError("Discount must be a number")
    .required("Discount is required"),
  tax: yup
    .number()
    .typeError("Tax must be a number")
    .required("Tax is required"),
});
