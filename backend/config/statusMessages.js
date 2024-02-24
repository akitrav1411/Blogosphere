export const statusMessages = {
  //Messages related to mongoDB connection
  MONGO_NOT_CONNECTED: "facing issue in connecting to mongoDB",
  MONGO_CONNECTED: "Connection successful to mongoDB",
  MONGO_CONNECTION_CLOSE: "Connection has been closed",
  //Messages related to seeder
  SEEDER_RUN_SUCCESS: "Seeder has run successfully",
  SEEDER_RUN_FAILURE: "Failed to run seeder",
  // Messages related to User signup/login/authorization
  USER_SAVE_SUCCESS: "User saved successfully",
  USER_LOGIN_SUCCESS: "Logged in in successfully",
  USER_LOGIN_FAILURE: "Error in login",
  USER_INVALID_CREDENTIALS: "Invalid credentials",
  ALL_FIELDS_REQUIRED: "All the fields are required",
  USER_DETAIL_FAILURE: "Failed to fetch user details",
  //Messages related to server error
  SERVER_ERROR: "Internal server error",
  //Messages related to blogs
  BLOG_SAVE_FAILURE: "Error in saving blog",
  BLOG_UPDATE_FAILURE: "Error in updating blog",
  FETCH_SINGLE_BLOG_FAILURE: "Error in fetching data for single blog",
  //Messages related to tags
  TAGS_FAILURE: "Error in getting all the tags",
};
