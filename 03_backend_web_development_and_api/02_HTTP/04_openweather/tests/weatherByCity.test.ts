jest.mock("node-fetch");
import { weatherByCity } from "../src/weatherByCity";
import { london } from "./data";
const fetch = require("node-fetch");

const mockedLondonRequest = () => {
  return Promise.resolve({
    json: () => Promise.resolve(london),
  });
};

const mockedErrorRequest = () => {
  return Promise.reject(new Error("This is a fake error"));
};

describe("#WeatherByCity", () => {
  afterEach(() => {
    fetch.default.mockReset();
  });

  it("Must use the 'node-fetch' package", async () => {
    expect.assertions(1);
    const spyLog = jest.spyOn(console, "log").mockImplementation();
    fetch.default.mockImplementationOnce(mockedLondonRequest);

    await weatherByCity("London");

    expect(fetch.default).toHaveBeenCalled();
    spyLog.mockRestore();
  });

  test("The requested url must use 'process.env.OPENWEATHER_API_KEY' rather than hard coded api key", async () => {
    expect.assertions(1);

    const spyLog = jest.spyOn(console, "log").mockImplementation();
    fetch.default.mockImplementationOnce(mockedLondonRequest);
    process.env.OPENWEATHER_API_KEY = "toto";

    await weatherByCity("London");

    expect(fetch.default.mock.calls[0][0]).toBe(
      "http://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=toto",
    );
    spyLog.mockRestore();
  });

  it("Must print the temperature in '°C' with 'console.log'", async () => {
    expect.assertions(1);

    const spyLog = jest.spyOn(console, "log").mockImplementation();
    fetch.default.mockImplementationOnce(mockedLondonRequest);

    await weatherByCity("London");

    expect(spyLog).toHaveBeenCalledWith("12.4 °C");

    spyLog.mockRestore();
  });

  it("Throws a 'console.error' when the API respond with error", async () => {
    expect.assertions(1);

    const spyErrorLog = jest.spyOn(console, "error").mockImplementation();
    fetch.default.mockImplementationOnce(mockedErrorRequest);

    await weatherByCity("London");

    expect(spyErrorLog).toHaveBeenCalled();

    spyErrorLog.mockRestore();
  });

  it("Must not print anything with 'console.log' when an error is throwned", async () => {
    expect.assertions(2);

    const spyLog = jest.spyOn(console, "log").mockImplementation();
    const spyErrorLog = jest.spyOn(console, "error").mockImplementation();
    fetch.default.mockImplementationOnce(mockedErrorRequest);

    await weatherByCity("London");

    expect(spyLog).not.toHaveBeenCalled();
    expect(fetch.default).toHaveBeenCalled();

    spyErrorLog.mockRestore();
    spyLog.mockRestore();
  });
});
