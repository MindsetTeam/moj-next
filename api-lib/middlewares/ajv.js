import Ajv from "ajv";
import ErrorResponse from "@/utils/errorResponse";

export function validateBody(schema) {
  const ajv = new Ajv();
  const validate = ajv.compile(schema);
  return (req, res, next) => {
    console.log(typeof req.body);
    const valid = validate(req.body);
    if (valid) {
      return next();
    } else {
      const error = validate.errors[0];
      console.log(error);
      throw new ErrorResponse(error.message, 400)
    }
  };
}
