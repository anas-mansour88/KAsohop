import * as Yup from "yup";
const schema = Yup.object().shape({
  fullName: Yup.string().required("Full Name is required"),
  userName: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]{10,15}$/, "Phone number must be 10-15 digits")
    .notRequired(),
});

export default schema;
