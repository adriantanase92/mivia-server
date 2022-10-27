import {registerAs} from "@nestjs/config";

export default registerAs("session", () => ({
    jwtSecret: process.env.JWT_SECRET,
    jwtExpirationTime: process.env.JWT_EXPIRATION_TIME
}));
