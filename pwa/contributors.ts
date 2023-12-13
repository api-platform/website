import { getAllContributors } from "./api/contributorsRank";
const fs = require("fs");
const path = require("path");

async function getContributors() {
  const allContributors = await getAllContributors();
  fs.writeFileSync(
    path.join(process.cwd(), "data/contributors.json"),
    JSON.stringify(allContributors, null, 2),
    "utf-8"
  );
}

getContributors();
