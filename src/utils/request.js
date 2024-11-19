import axios from "axios";

axios.defaults.baseURL = "http://localhost/e-learning-platform/";

export const request = async ({ route, method = "GET", body }) => {
  try {
    const response = await axios.request({
      url: `${route}.php`,
      method,
      data: body,
      headers: {
        Authorization: localStorage.token,
      },
    });
    return response;
  } catch (error) {
    console.log("Error in request method", error);
    throw error;
  }
};
