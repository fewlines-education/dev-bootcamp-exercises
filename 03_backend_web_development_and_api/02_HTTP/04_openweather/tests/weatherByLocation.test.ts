jest.mock("node-fetch");
import { weatherByZipcode, weatherByLatitudeAndLongitude } from "../src/weatherByLocation";
import { forecast } from "./data";
const fetch = require("node-fetch");

const mockedForecastRequest = () => {
  return Promise.resolve({
    json: () => Promise.resolve(forecast),
  });
};

const mockedErrorRequest = () => {
  return Promise.reject(new Error("This is a fake error"));
};

describe("#weatherByZipcode", () => {
  afterEach(() => {
    fetch.default.mockReset();
  });

  it("Must use the 'node-fetch' package", async () => {
    expect.assertions(1);

    const spyLog = jest.spyOn(console, "log").mockImplementation();
    fetch.default.mockImplementation(mockedForecastRequest);

    await weatherByZipcode("59000", "fr");

    expect(fetch.default).toHaveBeenCalled();

    spyLog.mockRestore();
  });

  it("The requested url must use 'process.env.OPENWEATHER_API_KEY' rather than hard coded api key", async () => {
    expect.assertions(1);

    process.env.OPENWEATHER_API_KEY = "toto";
    const spyLog = jest.spyOn(console, "log").mockImplementation();
    fetch.default.mockImplementationOnce(mockedForecastRequest);

    await weatherByZipcode("59000", "fr");

    expect(fetch.default.mock.calls[0][0]).toBe(
      "http://api.openweathermap.org/data/2.5/forecast?zip=59000,fr&units=metric&cnt=16&appid=toto",
    );

    spyLog.mockRestore();
  });

  it("Must print requested informations with 'console.log'", async () => {
    expect.assertions(2);

    const spyLog = jest.spyOn(console, "log").mockImplementation();
    fetch.default.mockImplementation(mockedForecastRequest);

    await weatherByZipcode("59000", "fr");

    expect(spyLog.mock.calls[0][0]).toEqual("Weather for Lille");
    expect(spyLog.mock.calls[1][0]).toEqual({
      date: "27/03/2020",
      hour: "12:00:00",
      temperature: "12.82 °C",
      weather: "clear sky",
    });

    spyLog.mockRestore();
  });

  it("Throws a 'console.error' when the API respond with error", async () => {
    expect.assertions(1);

    const spyErrorLog = jest.spyOn(console, "error").mockImplementation();
    fetch.default.mockImplementationOnce(mockedErrorRequest);

    await weatherByZipcode("59000", "fr");

    expect(spyErrorLog).toHaveBeenCalled();

    spyErrorLog.mockRestore();
  });

  it("Must not print anything with 'console.log' when an error is throwned", async () => {
    expect.assertions(3);

    const spyLog = jest.spyOn(console, "log").mockImplementation();
    const spyErrorLog = jest.spyOn(console, "error").mockImplementation();
    fetch.default.mockImplementationOnce(mockedErrorRequest);

    await weatherByZipcode("59000", "fr");

    expect(spyLog).not.toHaveBeenCalled();
    expect(spyErrorLog).toHaveBeenCalled();
    expect(fetch.default).toHaveBeenCalled();

    spyLog.mockRestore();
    spyErrorLog.mockRestore();
  });
});

describe("#weatherByLatitudeAndLongitude", () => {
  afterEach(() => {
    fetch.default.mockReset();
  });

  it("Must use the 'node-fetch' package", async () => {
    const spyLog = jest.spyOn(console, "log").mockImplementation();
    fetch.default.mockImplementationOnce(mockedForecastRequest);

    await weatherByLatitudeAndLongitude(32.661343, 51.680374);

    expect(fetch.default).toHaveBeenCalled();

    spyLog.mockRestore();
  });

  test("The requested url must use 'process.env.OPENWEATHER_API_KEY' rather than hard coded api key", async () => {
    expect.assertions(1);

    process.env.OPENWEATHER_API_KEY = "toto";
    const spyLog = jest.spyOn(console, "log").mockImplementation();
    fetch.default.mockImplementationOnce(mockedForecastRequest);

    await weatherByLatitudeAndLongitude(32.661343, 51.680374);

    expect(fetch.default.mock.calls[0][0]).toBe(
      "http://api.openweathermap.org/data/2.5/forecast?lat=32.661343&lon=51.680374&units=metric&cnt=16&appid=toto",
    );
    spyLog.mockRestore();
  });

  it("Must print requested informations with 'console.log'", async () => {
    expect.assertions(2);

    const spyLog = jest.spyOn(console, "log").mockImplementation();
    fetch.default.mockImplementation(mockedForecastRequest);

    await weatherByLatitudeAndLongitude(32.661343, 51.680374);

    expect(spyLog.mock.calls[0][0]).toEqual("Weather for Lille");
    expect(spyLog.mock.calls[1][0]).toEqual({
      date: "27/03/2020",
      hour: "12:00:00",
      temperature: "12.82 °C",
      weather: "clear sky",
    });
    spyLog.mockRestore();
  });

  it("Throws a 'console.error' when the API respond with error", async () => {
    expect.assertions(1);

    const spyLog = jest.spyOn(console, "log").mockImplementation();
    const spyErrorLog = jest.spyOn(console, "error").mockImplementation();
    fetch.default.mockImplementationOnce(mockedErrorRequest);

    await weatherByLatitudeAndLongitude(32.661343, 51.680374);

    expect(spyErrorLog).toHaveBeenCalled();

    spyLog.mockRestore();
    spyErrorLog.mockRestore();
  });

  it("Must not print anything with 'console.log' when an error is throwned", async () => {
    expect.assertions(3);

    const spyLog = jest.spyOn(console, "log").mockImplementation();
    const spyErrorLog = jest.spyOn(console, "error").mockImplementation();
    fetch.default.mockImplementationOnce(mockedErrorRequest);

    await weatherByLatitudeAndLongitude(32.661343, 51.680374);

    expect(spyLog).not.toHaveBeenCalled();
    expect(spyErrorLog).toHaveBeenCalled();
    expect(fetch.default).toHaveBeenCalled();

    spyLog.mockRestore();
    spyErrorLog.mockRestore();
  });
});
