import sharp from "sharp";
import { cache } from "react";

export const getPlaceholder = cache(async (imagePath: string) => {
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
