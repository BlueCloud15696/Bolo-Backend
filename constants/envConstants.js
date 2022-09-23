require('dotenv').config();
const envConstants = {
    USER_VERIFICATION_TOKEN_SECRET: "dgfgpspdifgskdfngussj490385jsp8ms",
    secret: "gew67dfgew", //secret key
    TOKE_NAME: "accessTokenBolo",
    email: "your email",
    emailPass: "email password",
    BASE_URL: "https://localhost:3000",
    Access_key_ID: process.env.Access_key_ID || ""/* "AKIAS2EKNRHCA4WZ4T4P" */,
    Secret_access_key: process.env.Secret_access_key || ""/* "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" */,
    bucket_name: process.env.bucket_name || ""/* "bolo-image-bucket" */,
    bucket_region: process.env.bucket_region || ""/* "us-east-1" */,
    password: "'*y1UR7J3sV1RoU"
};

module.exports = envConstants;
