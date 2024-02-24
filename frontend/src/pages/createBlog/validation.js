import { Validations } from "../../config";
import * as yup from "yup";

export const blogSchema = yup.object().shape({
  title: Validations.title,
  content: Validations.content,
});
