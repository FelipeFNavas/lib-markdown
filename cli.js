import getFile from "./index.js";
import chalk from "chalk";
import validateUrl from "./http-validation.js";

const path = process.argv;

async function processText(path) {
  const result = await getFile(path[2]);

  if (path[3] === "validar") {
    console.log(chalk.yellow("links validados: "), await validateUrl(result));
    // console.log(await validateUrl(result));
    // return result;
  } else {
    console.log(chalk.yellow("lista de links", JSON.stringify(result)));
  }
}

processText(path);
