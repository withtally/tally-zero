import { fetchDAOs } from "./tally";

async function pullDAOs() {
  const daos = await fetchDAOs();
  console.dir({ daos });
}

pullDAOs();
