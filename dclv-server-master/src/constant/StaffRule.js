/*
    Admin have full rights
    Shipper only change status of sub-order from in_transit -> completed or cancel
    Employee has rights of shipper and can CRUD fabric, color, order
    Staff can change rights of all expect admin
*/

export const StaffRule = {
  ADMIN: "admin",
  EMP: "employee",
  SHI: "shipper",
  STF: "staff",
};
