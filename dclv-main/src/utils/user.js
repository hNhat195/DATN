const userUtil = {
  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem("user"));
  },

  getCurrentUserRole: () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user ? user.role : "";
  },

  getCurrentUserId: () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user ? user._id : null;
  },

  userRole: {
    customer: "customer",
    staff: "staff",
    admin: "admin",
  },
};

export default userUtil;
