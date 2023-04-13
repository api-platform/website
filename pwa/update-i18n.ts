import fs from "fs";
import path from "path";

interface Data {
  [key: string]: any;
}

function addMissingKeysToFile(base: string, output: string) {
  const basePath = path.join(process.cwd(), base);
  const outputPath = path.join(process.cwd(), output);
  const baseFile = JSON.parse(fs.readFileSync(basePath, "utf8"));
  const outputFile = JSON.parse(fs.readFileSync(outputPath, "utf8"));

  const updatedFile = addMissingKeys(baseFile, outputFile);

  fs.writeFileSync(outputPath, JSON.stringify(updatedFile));
}

function addMissingKeys(nodeA: any, nodeB: any): any {
  for (const key in nodeA) {
    if (Object.prototype.hasOwnProperty.call(nodeA, key)) {
      if (!Object.prototype.hasOwnProperty.call(nodeB, key)) {
        nodeB[key] = nodeA[key];
      } else {
        if (typeof nodeA[key] === "object") {
          nodeB[key] = addMissingKeys(nodeA[key], nodeB[key]);
        }
      }
    }
  }
  return nodeB;
}

function removeUselessKeysToFile(base: string, output: string) {
  const basePath = path.join(process.cwd(), base);
  const outputPath = path.join(process.cwd(), output);
  const baseFile = JSON.parse(fs.readFileSync(basePath, "utf8"));
  const outputFile = JSON.parse(fs.readFileSync(outputPath, "utf8"));

  const updatedFile = removeUselessKeys(baseFile, outputFile);

  fs.writeFileSync(outputPath, JSON.stringify(updatedFile));
}

function removeUselessKeys(nodeA: any, nodeB: any): any {
  for (const key in nodeB) {
    if (Object.prototype.hasOwnProperty.call(nodeB, key)) {
      if (!Object.prototype.hasOwnProperty.call(nodeA, key)) {
        delete nodeB[key];
      } else {
        if (typeof nodeA[key] === "object") {
          nodeB[key] = removeUselessKeys(nodeA[key], nodeB[key]);
        }
      }
    }
  }
  return nodeB;
}

function sortJson(fileToSort: string) {
  // Lire le fichier JSON
  const readFile = (filePath: string): Data => {
    const file = fs.readFileSync(filePath, "utf8");
    return JSON.parse(file);
  };

  // Écrire dans le fichier JSON
  const writeFile = (filePath: string, data: Data): void => {
    fs.writeFileSync(filePath, JSON.stringify(data));
  };

  // Trie le fichier JSON par ordre alphabétique de manière récursive
  const sortJsonRecursive = (data: Data): Data => {
    const sortedData: Data = {};
    Object.keys(data)
      .sort()
      .forEach((key) => {
        if (typeof data[key] === "object") {
          sortedData[key] = sortJsonRecursive(data[key]);
        } else {
          sortedData[key] = data[key];
        }
      });
    return sortedData;
  };

  // Nom du fichier JSON à trier
  const filePath = path.join(process.cwd(), fileToSort);

  // Lit le fichier JSON
  const data = readFile(filePath);

  // Trie le fichier JSON
  const sortedData = sortJsonRecursive(data);

  // Écris le fichier JSON trié
  writeFile(filePath, sortedData);
}

sortJson("./i18n/dictionaries/en.json");
addMissingKeysToFile(
  "./i18n/dictionaries/en.json",
  "./i18n/dictionaries/fr.json"
);
removeUselessKeysToFile(
  "./i18n/dictionaries/en.json",
  "./i18n/dictionaries/fr.json"
);
sortJson("./i18n/dictionaries/fr.json");
