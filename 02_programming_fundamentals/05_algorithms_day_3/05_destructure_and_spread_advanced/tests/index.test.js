const { clientProfile, formatStorage } = require("../src/index");

describe("Destructuring and spread with Arrays", () => {
  describe("#formatStorage", () => {

    it("Should return an array", () => {
      const testArray = [[1, 2], [], [3], [4, 5, 6, 7], [8, 9]];
      const testResult = formatStorage(testArray)

      expect(testResult).not.toBe(null);
      expect(testResult).not.toBe(undefined);
      expect(Array.isArray(testResult)).toBe(true);
    });

    it("Should return an array with only numbers", () => {
      const testArray = [[1, 2], [], [3], [4, 5, 6, 7], [8, 9]];
      const testResult = formatStorage(testArray);

      expect(!testResult.some(isNaN)).toBe(true);
    });

    it("Should concatenate all sub-arrays in one", () => {
      const testArray = [[1, 2], [], [3], [4, 5, 6, 7], [8, 9]];
      const testResult = formatStorage(testArray);

      const groundTruth = [1, 2, 3, 4, 5, 6, 7, 8, 9];

      expect(testResult).toEqual(groundTruth);
    });
  });

  describe("#clientProfile", () => {
    it("Should return an object", () => {
      const testObject = {
        clientProfile: {
          name: "John",
        },
        computerProfile: {
          CPUThreads: 2,
          Ram: 16,
          Retina: true,
        }
      };
      const testResult = clientProfile(testObject);

      expect(testResult).not.toBe(null);
      expect(typeof testResult).toBe("object");
    });

    it("Should not return an array", () => {
      const testObject = {
        clientProfile: {
          name: "John",
        },
        computerProfile: {
          CPUThreads: 2,
          Ram: 16,
          Retina: true,
        },
      };
      const testResult = clientProfile(testObject);
      
      expect(testResult).not.toBe(undefined);
      expect(Array.isArray(testResult)).toBe(false);
    });

    it("Shouldn't change the key names inside the objects", () => {
      const testObject = {
        clientProfile: {
          name: "John",
        },
        computerProfile: {
          cpuThreads: 2,
          ram: 16,
          retina: true,
        },
      };
      const testResult = clientProfile(testObject);
      const testKeys = ["name", "cpuThreads", "ram", "retina"]

      expect(Object.keys(testResult)).toEqual(testKeys);
    });

    it("Should concatenate all sub-objects in one object", () => {
      const testObject = {
        clientProfile: {
          name: "John",
        },
        computerProfile: {
          cpuThreads: 2,
          ram: 16,
          retina: true,
        },
      };
      const testResult = clientProfile(testObject);

      const groundTruth = { name: "John", cpuThreads: 2, ram: 16, retina: true };

      expect(testResult).toEqual(groundTruth);
    });
  });
});
