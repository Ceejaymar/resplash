import fs from "fs";
import path from "path";
import { getPlaiceholder } from "plaiceholder";

const requestedGroup = process.argv[2]?.trim().toLowerCase();

const groups: Record<string, string[]> = {
  // lookbook: lookbookImages,
};

async function generateBlurData(images: string[], groupName: string) {
  const result: { src: string; blurDataURL: string }[] = [];

  for (const src of images) {
    try {
      const res = await fetch(src);
      if (!res.ok) {
        throw new Error(`Fetch failed for ${src} (status ${res.status})`);
      }

      const arrayBuffer = await res.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const { base64 } = await getPlaiceholder(buffer);

      result.push({ src, blurDataURL: base64 });
      console.log(`✅ Processed: ${groupName} → ${src}`);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      console.error(`❌ Error processing ${src}: ${message}`);
    }
  }

  return result;
}

(async () => {
  const outputDir = path.resolve(__dirname, "../config");
  fs.mkdirSync(outputDir, { recursive: true });

  const entries = requestedGroup
    ? Object.entries(groups).filter(([name]) => name === requestedGroup)
    : Object.entries(groups);

  if (entries.length === 0) {
    console.error(
      `❌ No matching group found for "${requestedGroup}". Available: ${Object.keys(
        groups
      ).join(", ")}`
    );
    process.exit(1);
  }

  for (const [groupName, images] of entries) {
    console.log(
      `\n📦 Generating blurData for: ${groupName} (${images.length} images)`
    );

    const data = await generateBlurData(images, groupName);
    const outputPath = path.join(outputDir, `${groupName}.json`);

    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
    console.log(`📝 Saved: ${outputPath}`);
  }

  console.log("\n🎉 All blur data generated.");
})();
