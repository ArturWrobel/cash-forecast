let DEBUG = true;
let host = "http://127.0.0.1:8000";
let stripePublishKey = "pk_test_51IxWMeDUUldlUrZ1HLYRGwhkJqgfW13lNmZiMm05eVEtNrfj9RBwqVyf4Z2W8uln6ZC9Kafj3UOpalc3Y7htrJP700qUHt7vOO";
if (DEBUG === false) {
  host = "";
  stripePublishKey = "";
}

export { stripePublishKey };

export const APIEndpoint = `${host}/api`;

export const fileUploadURL = `${APIEndpoint}/demo/`;
export const facialRecognitionURL = `${APIEndpoint}/upload/`;
export const emailURL = `${APIEndpoint}/email/`;
export const changeEmailURL = `${APIEndpoint}/change-email/`;
export const changePasswordURL = `${APIEndpoint}/change-password/`;
export const APIkeyURL = `${APIEndpoint}/api-key/`;

export const loginURL = `${host}/rest-auth/login/`;
export const signupURL = `${host}/rest-auth/registration/`;