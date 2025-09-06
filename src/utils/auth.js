// Save user in localStorage
export const saveUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

// Get current user
export const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

// Check if user is logged in
export const isLoggedIn = () => {
  return !!localStorage.getItem("user");
};

// Logout user
export const logout = () => {
  localStorage.removeItem("user");
};
