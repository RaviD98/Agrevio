import { ApiError } from "../utils/ApiError.js";

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ApiError(403, "Unauthorized access"));
    }

    next();
  };
};

export default authorizeRoles;
