import chalk from "chalk";
import fs from "fs";

function extractLinks(text) {
  const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s].[^\s]*)\)/gm;

  const resultArray = [];
  let temp;
  while ((temp = regex.exec(text)) !== null) {
    resultArray.push({
      [temp[1]]: temp[2],
    });
  }
  return resultArray;
}

async function getFile(filepath) {
  const encoding = "utf-8";
  try {
    const text = await fs.promises.readFile(filepath, encoding);
    console.log(extractLinks(text));
  } catch (err) {
    throw new Error(chalk.red(err.code, "não há arquivo no caminho"));
  }
}

getFile("./files/text1.md");
