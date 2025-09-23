import Parse from "parse/dist/parse.min.js";

const APP_ID = process.env.NEXT_PUBLIC_PARSE_APP_ID;
const JS_KEY = process.env.NEXT_PUBLIC_PARSE_JS_KEY;
const SERVER_URL = process.env.NEXT_PUBLIC_PARSE_SERVER_URL || "https://parseapi.back4app.com/";

Parse.initialize(APP_ID, JS_KEY);
Parse.serverURL = SERVER_URL;

export default Parse;