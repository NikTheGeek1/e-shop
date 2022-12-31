import jwt from "jsonwebtoken";

export const createActivationToken = (payload: any) => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET as string, {
    expiresIn: "2d",
  });
};

export const createResetPasswordToken = (payload: any) => {
  return jwt.sign(payload, process.env.RESET_PASSWORD_TOKEN_SECRET as string, {
    expiresIn: "6h",
  });
};
