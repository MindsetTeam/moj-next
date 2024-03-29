const { default: ErrorResponse } = require("@/utils/errorResponse");
const { getSession } = require("next-auth/client");

const protect = async (req, res, next) => {
  const session = await getSession({ req });
  // console.log({session});
  if (!session) {
    throw new ErrorResponse("You are not authorized to access this page", 401);
  }
  req.user = session.user;
  next();
};


const role =
  (...rest) =>
  (req, res, next) => {
    if (!rest.includes(req.user.role)) {
      throw new ErrorResponse(
        "You are not authorized to access this page",
        401
      );
    }
    next();
  };

export { protect, role };
