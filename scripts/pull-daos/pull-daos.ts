import fs from "node:fs";
import path from "node:path";
import { fetchDAOs } from "./tally";

async function pullDAOs() {
  const daos = await fetchDAOs();

  const filePath = path.join(__dirname, "../../config/daos.json");
  fs.writeFileSync(filePath, JSON.stringify(daos, null, 2));
  console.dir({ daos });
}

pullDAOs();
