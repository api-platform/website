import sharp from "sharp";
import { memoizeAsync } from "utils/memoizeAsync";

// Memoized at the process level (not React's per-render cache): during the
// build the same speaker images are requested across many pages, and Sharp
// (native image processing) is expensive. This ensures one resize per image.
export const getPlaceholder = memoizeAsync(async (imagePath: string) => {
  try {
    // Redimensionner l'image à une taille très petite
    const resizedImageBuffer = await sharp(imagePath)
      .resize(20, 20)
      .png({ quality: 70 })
      .toBuffer();

    // Convertir l'image redimensionnée en base64
    const base64Placeholder = resizedImageBuffer.toString("base64");
    return `data:image/png;base64,${base64Placeholder}`;
  } catch (error) {
    console.error("The placeholder can't be generated: ", error);
    throw error;
  }
});
