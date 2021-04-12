import { Cat } from "../src/index";

describe("Cat constructor", () => {
  it("Should be possible to instantiate a Cat", () => {
    expect.assertions(4);

    const garfield = new Cat("Garfield", "orange", 12);

    expect(garfield).toBeInstanceOf(Cat);
    expect(garfield.name).toBe("Garfield");
    expect(garfield.color).toBe("orange");
    expect(garfield.age).toBe(12);
  });
});

describe("purr method", () => {
  it("Should be able to purr", () => {
    const garfield = new Cat("Garfield", "orange", 12);

    const purring = garfield.purr();

    expect(purring).toBe("Garfield, the cat, purrs...");
  });
});

describe("meow method", () => {
  it("Should be able to meow", () => {
    const garfield = new Cat("Garfield", "orange", 12);

    const meowing = garfield.meow();

    expect(meowing).toBe("Garfield, the orange cat, meows!");
  });
});

describe("attachk method", () => {
  it("Should be able to attack with success", () => {
    const garfield = new Cat("Garfield", "orange", 12);
    const spyLog = jest.spyOn(console, "log").mockImplementation()

    garfield.attack(true);

    expect(spyLog).toHaveBeenCalledWith("You've been scratched!");

    spyLog.mockRestore();
  });

  it("Should be able to attack and miss", () => {
    const garfield = new Cat("Garfield", "orange", 12);
    const spyLog = jest.spyOn(console, "log").mockImplementation()

    garfield.attack(false);

    expect(spyLog).toHaveBeenCalledWith("Wow, Garfield missed you, how lucky!")

    spyLog.mockRestore();
  });
});
