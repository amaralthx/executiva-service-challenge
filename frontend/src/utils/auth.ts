export const saveAuth = (token: string, user: any) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
};

export const getAuth = () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  return {
    token,
    user: user ? JSON.parse(user) : null
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
