// Remove 'unknown' and 'any' types by adequate ones
function introduce(name: unknown, age: unknown): any {
  console.log(`${name} is ${age} years old.`);
}

introduce("Frieda", 28);
introduce("Francis", 34);

// Leave the line below for tests to work properly.
export { introduce };
