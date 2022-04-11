import getFile from "./index.js";
import chalk from "chalk";

const path = process.argv;

async function processText(path) {
  const result = await getFile(path[2]);
  console.log(chalk.yellow("lista de links", JSON.stringify(result)));
}

processText(path);
