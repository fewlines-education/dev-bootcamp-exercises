/* global beforeAll describe test expect */
const fs = require("fs");
const path = require("path");
const readcode = require("./readcode");

let studentCode;
beforeAll(() => {
  // Loads the student's code
  studentCode = readcode(
    path.resolve(__dirname, "../src/01_play_with_variables.js")
  );
  return studentCode;
});

test("question should have 'Spartan, what is your profession ?!' as a value", () => {
  return studentCode.then((code) => {
    const question = eval(code + "; question;");

    expect(question).toBe("Spartan, what is your profession?!");
  });
});

test("answer should have 'Dev dev dev !' as a value", () => {
  return studentCode.then((code) => {
    const question = eval(code + "; answer;");

    expect(question).toBe("Dev dev dev!");
  });
});

test("foo should have an integer 12 as a value", () => {
  return studentCode.then((code) => {
    const foo = eval(code + "; foo;");

    expect(foo).toBe(12);
  });
});

test("bar should have an integer 28 as a value", () => {
  return studentCode.then((code) => {
    const bar = eval(code + "; bar;");

    expect(bar).toBe(28);
  });
});

describe("sumResult", () => {
  test("Should be the sum of foo and bar as a value", () => {
    return studentCode.then((code) => {
      const sumResult = eval(code + "; sumResult;");

      expect(sumResult).toBe(40);
    });
  });

  test("Should be linked to foo and bar. Changing foo should update it", () => {
    return studentCode.then((code) => {
      const changedStudentCode = code.replace(
        new RegExp(/(let|const)(\s*?)foo(\s*?)=(\s*?)([0-9]{2})(\s*?);/),
        "const foo = 10;"
      );
      const sumResult = eval(changedStudentCode + "; sumResult;");
      expect(sumResult).toBe(38);
    });
  });

  test("Should be linked to foor and bar. Changing bar should update it", () => {
    return studentCode.then((code) => {
      const changedStudentCode = code.replace(
        new RegExp(/(let|const)(\s*?)bar(\s*?)=(\s*?)([0-9]{2})(\s*?);/),
        "const bar = 10;"
      );
      const sumResult = eval(changedStudentCode + "; sumResult;");
      expect(sumResult).toBe(22);
    });
  });
});

describe("prodResult", () => {
  test("Should be the product of bar and foo", () => {
    return studentCode.then((code) => {
      const prodResult = eval(code + "; prodResult;");

      expect(prodResult).toBe(336);
    });
  });

  test("Should be linked to foor and bar. Changing foo should update it", () => {
    return studentCode.then((code) => {
      const changedStudentCode = code.replace(
        new RegExp(/(let|const)(\s*?)foo(\s*?)=(\s*?)([0-9]{2})(\s*?);/),
        "const foo = 10;"
      );
      const prodResult = eval(changedStudentCode + "; prodResult;");
      expect(prodResult).toBe(280);
    });
  });

  test("Should be linked to foor and bar. Changing bar should update it", () => {
    return studentCode.then((code) => {
      const changedStudentCode = code.replace(
        new RegExp(/(let|const)(\s*?)bar(\s*?)=(\s*?)([0-9]{2})(\s*?);/),
        "const bar = 10;"
      );
      const prodResult = eval(changedStudentCode + "; prodResult;");
      expect(prodResult).toBe(120);
    });
  });
});

describe("leader", () => {
  test("Should be linked to answer. Changing answer should update it", () => {
    return studentCode.then((code) => {
      const changedStudentCode = code.replace(
        new RegExp(
          /(let|const)(\s*?)answer(\s*?)=(\s*?)"Dev dev dev!"(\s*?);/
        ),
        "const answer = 'yes?';"
      );
      const sparta = eval(changedStudentCode + "; sparta;");
      const expected = {
        check: "Spartan, what is your profession?!",
        response: "yes?",
      };
      expect(sparta).toEqual(expected);
    });
  });

  test("sparta should be an object with the correct keys and values", () => {
    return studentCode.then((code) => {
      const sparta = eval(code + "; sparta;");
      const expected = {
        check: "Spartan, what is your profession?!",
        response: "Dev dev dev!",
      };
      expect(sparta).toEqual(expected);
    });
  });

  test("leader should be an string with the correct value", () => {
    return studentCode.then((code) => {
      const leader = eval(code + "; leader;");

      expect(leader).toEqual("Spartan, what is your profession?!");
    });
  });

  test("leader should be linked to sparta. Changing the phrase inside promo should update it", () => {
    return studentCode.then((code) => {
      const changedStudentCode = code.replace(
        new RegExp("(let|const) leader"),
        "sparta.check = 'yes?'; $&"
      );
      const promoChanged = eval(changedStudentCode + "; leader;");
      expect(promoChanged).toEqual("yes?");
    });
  });
});

describe("digits", () => {
  test("should be an array with the correct values", () => {
    return studentCode.then((code) => {
      const digits = eval(code + "; digits;");
  
      expect(digits).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });
  });
});
