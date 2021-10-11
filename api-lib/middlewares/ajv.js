// import ErrorResponse from "@/utils/errorResponse";
// import Ajv from "ajv";

import Ajv from "ajv";

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
      return res.status(400).json({
        error: {
          message: `${error.message}`,
        },
      });
    }
  };
}
