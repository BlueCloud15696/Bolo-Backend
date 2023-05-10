require("dotenv").config();
const envConstants = {
  USER_VERIFICATION_TOKEN_SECRET: "dgfgpspdifgskdfngussj490385jsp8ms",
  secret: "gew67dfgew", //secret key
  TOKE_NAME: "accessTokenBolo",
  email: "your email",
  emailPass: "email password",
  BASE_URL: "https://localhost:3000",
  Access_key_ID: process.env.Access_key_ID || "" /* "AKIAS2EKNRHCA4WZ4T4P" */,
  Secret_access_key:
    process.env.Secret_access_key ||
    "" /* "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" */,
  bucket_name: process.env.bucket_name || "" /* "bolo-image-bucket" */,
  bucket_region: process.env.bucket_region || "" /* "us-east-1" */,
  password: "'*y1UR7J3sV1RoU",
  zoom_api_key: "7TMuAi7DRsy-DM8zxYw97g",
  zoom_api_secret: "BzO9ZcfVLd9BGO1JwiO08dTWGCX9TC2lfX1H",
  zoom_chat_history_token:
    "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJMcnhkc2dPTlMwLW5IVUlLVkVuZUtBIn0.xVyBW2m4us96EWR1qi4GOFW4HgxMETqwxpXC4j5Wi_8",

  // gcp credentials
  client_id:
    "409382049114-enhg50fgn88ccgnou784lvg4jvd17oi8.apps.googleusercontent.com",
  client_secret: "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",
  refresh_token:
    "1//04qY004KvhBsuCgYIARAAGAQSNwF-L9IrE5CTK1AXa_0VYstMGECBdCk2TgaOMxEuClP3gDIwcC22UDHLOOY-Ii4nbaBADDyn63o",
  user_name: "branchembahbolo@gmail.com",
  email_password: "Business2021",
};

module.exports = envConstants;
