import * as lotteryFunction from "../src/lottery_draw"
import { contextFunction } from "../src/context";

it("Should return undefined", () => {
  expect.assertions(1);

  const result = contextFunction([42, 42, 42, 42, 42, 42]);

  expect(result).toBe(undefined);
});

it("Should console log 'You won' when the ticket is the same", () => {
  expect.assertions(2);
  jest.spyOn(global.Math, 'random').mockReturnValue(0.42);
  let logs = ""
  const spy = jest.spyOn(console, "log").mockImplementation((text) => {
    logs += text
  });

  const result = contextFunction([42, 42, 42, 42, 42, 42]);

  expect(spy).toHaveBeenCalled();
  expect(logs).toMatch(/won/);
  spy.mockRestore()
});

it("Should console log 'You lost...' when the ticket is not the same", () => {
  expect.assertions(2);
  jest.spyOn(global.Math, 'random').mockReturnValue(0.42);
  let logs = ""
  const spy = jest.spyOn(console, "log").mockImplementation((text) => {
    logs += text
  });

  const result = contextFunction([42, 42, 42, 42, 42, 41]);

  expect(spy).toHaveBeenCalled();
  expect(logs).toMatch(/lost/);
  spy.mockRestore()
});

it("Should use the lottery_draw function", () => {
  expect.assertions(1);
  const spy = jest.spyOn(lotteryFunction, 'lottery_draw').mockImplementation();

  const result = contextFunction([42, 42, 42, 42, 42, 41]);

  expect(spy).toHaveBeenCalled();
  spy.mockRestore()
});
