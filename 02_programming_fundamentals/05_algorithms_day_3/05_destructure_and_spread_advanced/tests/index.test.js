const { customerProfile, formatStorage } = require("../src/index");

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

  describe("#customerProfile", () => {
    it("Should return an object", () => {
      const testObject = {
        customer: {
          firstName: "John",
          lastName: "Doe",
        },
        address: {
          street: "221B Baker Street",
          city: "London",
        },
        delivery: {
          package: "ballistic vest",
        },
      };

      const testResult = customerProfile(testObject);

      expect(testResult).not.toBe(null);
      expect(typeof testResult).toBe("object");
    });

    it("Should not return an array", () => {
      const testObject = {
        customer: {
          firstName: "Mrs",
          lastName: "Doubtfire",
          address: {
            street: "520-522 Green Street ",
            city: "San Francisco",
          },
        },
        delivery: {
          item: "Water bottles",
          address: {
            street: "2640 Steiner Street",
            city: "San Francisco",
          },
        },
      };

      const testResult = customerProfile(testObject);
      
      expect(testResult).not.toBe(undefined);
      expect(Array.isArray(testResult)).toBe(false);
    });

    it("Shouldn't change the key names inside the objects", () => {
      const testObject = {
        customer: {
          firstName: "Mrs",
          lastName: "Doubtfire",
          address: {
            street: "520-522 Green Street ",
            city: "San Francisco",
          },
        },
        delivery: {
          item: "Water bottles",
          address: {
            street: "2640 Steiner Street",
            city: "San Francisco",
          },
        },
      };

      const testResult = customerProfile(testObject);
      const testKeys = ["firstName", "lastName", "address", "item"]

      expect(Object.keys(testResult)).toEqual(testKeys);
    });

    it("Should concatenate all sub-objects in one object", () => {
      const testObject = {
        customer: {
          firstName: "Mrs",
          lastName: "Doubtfire",
          address: {
            street: "520-522 Green Street ",
            city: "San Francisco",
          },
        },
        delivery: {
          item: "Water bottles",
          address: {
            street: "2640 Steiner Street",
            city: "San Francisco",
          },
        },
      };

      const testResult = customerProfile(testObject);

      const groundTruth = {
        firstName: 'Mrs',
        lastName: 'Doubtfire',
        address: { street: '2640 Steiner Street', city: 'San Francisco' },
        item: 'Water bottles'
      }

      expect(testResult).toEqual(groundTruth);
    });
  });
});
