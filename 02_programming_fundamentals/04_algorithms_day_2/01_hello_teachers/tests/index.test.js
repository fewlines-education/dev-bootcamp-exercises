/* global beforeAll test expect */
const helpers = require("camp2-helpers");


let studentCode;
beforeAll(async() => {
  // Loads the student's code
  studentCode = await helpers.readCode("./src/index.js");
  return studentCode;
});

test("print 'Hello Teacher !' For every teacher", () => {
  let logs = "";
  console.log = (log) => logs += " " + log;

  const teachers = eval(studentCode + "; spartaTeachers;");

  teachers.forEach(teacher => {
    const r = new RegExp(`hello ${teacher}`, 'ig')
    helpers.expectMessage(logs.match(r), `Your function should print Hello ${teacher}`, "warning").not.toBe(null)
  })
});
