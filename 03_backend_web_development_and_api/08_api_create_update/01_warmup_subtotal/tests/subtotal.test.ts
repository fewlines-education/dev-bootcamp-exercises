import { calculateSubtotal } from "../src/subtotal";

it("Should add a subtotal key to every entry", () => {
  expect.assertions(3);

  const result = calculateSubtotal([
    { product: "Macbook Pro 13 inches", price: 200000, quantity: 1 },
    { product: "Dongle usb-usbc", price: 2000, quantity: 4 },
    { product: "Laptop cover", price: 400, quantity: 1 },
  ]);

  expect(result[0].subtotal).toBeDefined();
  expect(result[1].subtotal).toBeDefined();
  expect(result[2].subtotal).toBeDefined();
});

it("Should have the right amount for each subtotal and keep the previous keys", () => {
  expect.assertions(1);

  const result = calculateSubtotal([
    { product: "Macbook Pro 13 inches", price: 200000, quantity: 1 },
    { product: "Dongle usb-usbc", price: 2000, quantity: 4 },
    { product: "Laptop cover", price: 400, quantity: 1 },
  ]);

  expect(result).toEqual([
    {
      product: "Macbook Pro 13 inches",
      price: 200000,
      quantity: 1,
      subtotal: 200000,
    },
    { product: "Dongle usb-usbc", price: 2000, quantity: 4, subtotal: 8000 },
    { product: "Laptop cover", price: 400, quantity: 1, subtotal: 400 },
  ]);
});
