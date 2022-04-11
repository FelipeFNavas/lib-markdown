import chalk from "chalk";
import path from "path";
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
  return resultArray.length === 0 ? "Não há links" : resultArray;
}

export default async function getFile(filepath) {
  const encoding = "utf-8";
  const absolutePath = path.join("__dirname", "..", filepath);

  try {
    const files = await fs.promises.readdir(absolutePath, { encoding });

    const result = await Promise.all(
      files.map(async (file) => {
        const filepath = `${absolutePath}/${file}`;
        const text = await fs.promises.readFile(filepath, encoding);
        return extractLinks(text);
      })
    );
    return result;
  } catch (err) {
    throw new Error(chalk.red(err.code, "não há arquivo no caminho"));
  }
}
