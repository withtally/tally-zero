import { describe, expect, test } from "vitest";
import daos from "./daos.json";

describe("Image URL Validation Test Suite", () => {
  const images = daos.map((dao) => dao.imageUrl);
  test.each(images)("%s image URL should be valid", async (imageUrl) => {
    const isValid = await validateImageUrl(imageUrl);
    expect(isValid).toBe(true);
  });
});

async function validateImageUrl(imageUrl: string) {
  try {
    const response = await fetch(imageUrl);
    const contentType = response.headers.get("content-type");
    if (contentType?.startsWith("image")) {
      return true;
    } else {
      console.error(`Invalid image URL: ${imageUrl}`);
      return false;
    }
  } catch (error) {
    console.error(`Error fetching image: ${imageUrl}`, error);
    return false;
  }
}
