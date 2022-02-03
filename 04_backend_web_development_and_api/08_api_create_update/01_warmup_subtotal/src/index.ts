import { calculateSubtotal } from "./subtotal";

const newCart = calculateSubtotal([
  { product: "Macbook Pro 13 inches", price: 200000, quantity: 1 },
  { product: "Dongle usb-usbc", price: 2000, quantity: 4 },
  { product: "Laptop cover", price: 400, quantity: 1 },
]);

console.log(newCart);

// [
//   { product: "Macbook Pro 13 inches", price: 200000, quantity: 1, subtotal: 200000 },
//   { product: "Dongle usb-usbc", price: 2000, quantity: 4, subtotal: 8000 },
//   { product: "Laptop cover", price: 400, quantity: 1, subtotal: 400 },
// ]
