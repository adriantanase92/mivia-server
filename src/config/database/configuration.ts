import {registerAs} from "@nestjs/config";

export default registerAs("database", () => ({
    uri: process.env.MONGO_DB_URI,
    name: process.env.MONGO_DB_NAME,
    username: process.env.MONGO_DB_USERNAME,
    password: process.env.MONGO_DB_PASSWORD,
    hostname: process.env.MONGO_DB_HOSTNAME
}));
