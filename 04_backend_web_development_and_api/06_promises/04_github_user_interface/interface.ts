import * as readline from "fwl-readline";

export const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  
export function closeRl(reader = rl): void {
reader.close();
}

export function ask(question: string, reader = rl): Promise<string> {
    return new Promise((resolve, reject) => {
      reader.question(question, (input: string) => {
        if (input === "") {
          reject(new Error("Invalid input"));
        }
        resolve(input);
      });
    });
  }