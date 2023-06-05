import { readdir } from "node:fs/promises";

export const getAllEditionPictures = async (edition = "2022") => {
  const picturesSlugs = await readdir(`public/images/con/${edition}/review`);

  return picturesSlugs
    .filter((el) => el.match(/(pic-[^s].+).jpg/))
    .map((fileName) => `/images/con/${edition}/review/${fileName}`);
};
