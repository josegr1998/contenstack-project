import Contentstack from "contentstack";

const Stack = Contentstack.Stack({
  api_key: process.env.REACT_APP_API_KEY,
  delivery_token: process.env.REACT_APP_DELIVERY_TOKEN,
  environment: process.env.IS_PREVIEW ? "preview" : "production",
});

export default Stack;
