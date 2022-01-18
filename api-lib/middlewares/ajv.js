import Ajv from "ajv";
import ErrorResponse from "@/utils/errorResponse";

export function validateBody(schema) {
  const ajv = new Ajv();
  const validate = ajv.compile(schema);
  return (req, res, next) => {
    const valid = validate(req.body);
    if (valid) {
      return next();
    } else {
      const error = validate.errors[0];

      throw new ErrorResponse(error.message, 400);
    }
  };
}
