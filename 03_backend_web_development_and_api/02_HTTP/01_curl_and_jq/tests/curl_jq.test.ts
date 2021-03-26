// @ts-nocheck
const fs = require("fs");
const path = require("path");
const exec = require("child_process").exec;

function execPromise(command: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    exec(command, (error: Error, stdout: string, stderr: string) => {
      if (error) {
        return reject(error);
      }
      resolve([stdout, stderr]);
    });
  });
}


test("01_test_curl.sh: should return the content of https://swapi.dev/api/planets/1/", async () => {
  expect.assertions(1);

  const file = () => path.resolve(__dirname, "../src/01_test_curl.sh");
  const [studentOutput] = await execPromise(`bash ${file()}`);
  const [expectedOutput] = await execPromise(`curl -s 'https://swapi.dev/api/planets/1/'`);

  expect(studentOutput).toBe(expectedOutput)
});

test("02_test_jq.sh: should return the formatted content of https://swapi.dev/api/planets/1/", async () => {
  expect.assertions(1);

  const file = () => path.resolve(__dirname, "../src/02_test_jq.sh");
  const [studentOutput] = await execPromise(`bash ${file()}`);
  const [expectedOutput] = await execPromise(`curl -s 'https://swapi.dev/api/planets/1/' | jq '.'`);

  expect(studentOutput).toBe(expectedOutput)
});


test("03_querying_with_jq.sh: should return the URL of the first resident of Tatooine", async () => {
  expect.assertions(1);

  const file = () => path.resolve(__dirname, "../src/03_querying_with_jq.sh");
  const [studentOutput] = await execPromise(`bash ${file()}`);

  expect(studentOutput.trim()).toBe(`"http://swapi.dev/api/people/1/"`)
});

