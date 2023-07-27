const userUtil = {
  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem("user"));
  },

  getCurrentUserRole: () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user ? user.role : "";
  },

  userRole: {
    customer: "customer",
    staff: "staff",
    admin: "admin",
  },
};

export default userUtil;
