const { Staff } = require("../models/Staff");
const bcrypt = require("bcryptjs");

const telephone = ["0214141424", "0216581432", "0214151429", "0214147426"];
const address = [
  "KTX Khu A, ĐHQG TPHCM",
  "Khu KTX Khu B, ĐHQG TPHCM",
  "268 Lý Thường Kiệt, Quận 10, TPHCM",
];
const name = ["Nguyễn Văn A", "Nguyễn Văn B", "Nguyễn Văn C"];
const email = ["khatran@gmail.com", "nhatle@gmail.com", "phuvu@gmail.com"];
const gender = ["Nam", "Nữ"];
const role = ["Nhân viên bán hàng", "Nhân viên giao hàng"];
async function InsertToStaff() {
  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash("123456", salt);
  Staff.create(
    {
      id: new Date().getTime() % 10000,
      name: name[Math.floor(Math.random() * 3)],
      phone: telephone[Math.floor(Math.random() * 4)],
      email: "lvtn@gmail.com",
      birthday: new Date().setDate(Math.floor(Math.random() * 30)), //pick a random day
      password: hashPass,
      address: address[Math.floor(Math.random() * 3)],
      gender: gender[Math.floor(Math.random() * 2)],
      role: role[Math.floor(Math.random() * 2)],
    },
    function (err, data) {
      if (err) console.log(err);
      else console.log(data);
    }
  );
}
module.exports = { InsertToStaff };
