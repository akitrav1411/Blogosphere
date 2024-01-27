import * as yup from "yup";
import { Validations } from "../../config";
export const loginSchema = yup.object().shape({
  email: Validations.email,
  password: Validations.required,
});
export const signupSchema = yup.object().shape({
  firstname: Validations.firstname,
  lastname: Validations.lastname,
  username: Validations.username,
  dob: Validations.dob,
  email: Validations.email,
  password: Validations.password,
});
