export const addTokenToLocalStorage = (token) => {
  localStorage.setItem("jwt_token", JSON.stringify(token));
};

export const removeTokenFromLocalStorage = () => {
  localStorage.removeItem("jwt_token");
};

export const getTokenFromLocalStorage = () => {
  const result = localStorage.getItem("jwt_token");
  const token = result ? JSON.parse(result) : null;
  return token;
};
