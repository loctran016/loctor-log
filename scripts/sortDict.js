import { readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

// Get the current directory of this module file
const __dirname = dirname(fileURLToPath(import.meta.url));

// Helper to read file, clean, split into array
const readDictFile = (relativePath) => {
  const filePath = join(__dirname, relativePath);
  return readFileSync(filePath, { encoding: "utf8" })
    .replace(/\r/g, "")
    .split("\n")
    .filter((str) => str !== "");
};

console.log("Reading vi.txt");
let dictionary = readDictFile("../dictionary/vi.txt");

let mecDictionary = readDictFile("../dictionary/medical.txt");

// Remove duplicates
dictionary = [...new Set(dictionary)];
mecDictionary = [...new Set(mecDictionary)];

// Remove words in mecDictionary from dictionary
dictionary = dictionary.filter((string) => !mecDictionary.includes(string));

console.log("Sorting...");
dictionary.sort();
mecDictionary.sort();

console.log("Writing vi.txt");
writeFileSync(
  join(__dirname, "../dictionary/vi.txt"),
  dictionary.join("\n")
);
writeFileSync(
  join(__dirname, "../dictionary/medical.txt"),
  mecDictionary.join("\n")
);
