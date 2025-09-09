import fs from "fs";
import readline from "readline";

const inputPath = "dictionary/words.txt";
const outputPath = "dictionary/unique_words_all_versions.txt";

const unique = new Set();

function toSentenceCase(str) {
  if (typeof str !== "string" || !str.length) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

async function extract() {
  const rl = readline.createInterface({
    input: fs.createReadStream(inputPath, { encoding: "utf-8" }),
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    try {
      const obj = JSON.parse(trimmed);
      const text = obj.text;
      if (typeof text === "string" && text.length > 0) {
        // Split by space, filter empty
        text.split(/\s+/).filter(Boolean).forEach(word => {
          unique.add(word); // original
          unique.add(toSentenceCase(word));
          unique.add(word.toUpperCase());
        });
      }
    } catch {
      // Ignore invalid JSON lines
    }
  }

  fs.writeFileSync(outputPath, Array.from(unique).join("\n"), "utf-8");
  console.log(
    `Done! Wrote ${unique.size} unique words (single word per line, all forms) to ${outputPath}`
  );
}

extract();
