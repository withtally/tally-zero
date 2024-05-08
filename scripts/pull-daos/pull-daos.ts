import fs from "node:fs";
import path from "node:path";
import { fetchDAOs } from "./tally";

/** Pulls new DAO data from Tally so frontend can show images, names, and networkIds*/
async function pullDAOs() {
  const daos = await fetchDAOs();

  const filePath = path.join(__dirname, "../../config/daos.json");
  fs.writeFileSync(filePath, JSON.stringify(daos, null, 2));
  console.log(`New DAO data written to ${filePath}`);
}

pullDAOs();
