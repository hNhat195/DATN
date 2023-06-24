export function fNumberCurrency(number) {
  return number.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
}

export function fNumber(number) {
  return number.toLocaleString("vi-VN");
}
