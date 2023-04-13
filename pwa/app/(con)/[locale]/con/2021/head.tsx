import meta from "data/con/2021/meta";
import DefaultTags from "app/(con)/[locale]/con/DefaultTags";

export default async function Head() {
  return (
    <>
      <DefaultTags
        meta={{ ...meta, TITLE: `${meta.TITLE}: meet the best API experts!` }}
      />
    </>
  );
}
