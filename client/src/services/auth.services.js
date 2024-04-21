import axios from "axios";

const login = async (params) => {
  console.log(params);
  try {
    const response = await axios.post(
      "http://localhost:8000/auth/login",
      params
    );
    return response;
  } catch (error) {
    throw new Error(error.response.data.message || "Login failed");
  }
};

const AuthService = {
  login,
};

export default AuthService;
