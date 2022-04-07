import chalk from "chalk";
import fs from "fs";

async function getFile(filepath) {
  const encoding = "utf-8";
  try {
    const text = await fs.promises.readFile(filepath, encoding);
    console.log(chalk.blue(text));
  } catch (err) {
    throw new Error(chalk.red(err.code, "não há arquivo no caminho"));
  } finally {
    console.log(chalk.yellow("operação finalizada!"));
  }
}

getFile("./files/text1.md");
