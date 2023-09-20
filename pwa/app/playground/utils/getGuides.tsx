export type GuideMetadata = {
  path: string;
  slug: string;
  executable?: string;
  [key: string]: any;
};

export function getGuides(FS: any): GuideMetadata[] {
  const guides: GuideMetadata[] = [];

  FS.readdir("/src/guides")
    .filter((e: string) => e !== "." && e !== "..")
    .forEach((fileName: string) => {
      const metadata: GuideMetadata = {
        path: `/src/guides/${fileName}`,
        slug: fileName.replace(".php", ""),
      };
      // parses front matter
      const f = FS.readFile(metadata.path, { encoding: "utf8" })
        .toString()
        .split("\n");
      let inside = false;

      for (let index = 0; index < f.length; index++) {
        let line = f[index].trim();

        if (line === "// ---") {
          if (inside) {
            inside = false;
            break;
          }

          inside = true;
          continue;
        }

        if (inside) {
          line = line.replace("// ", "");
          const [key, value] = line.split(": ");
          if (!metadata[key]) {
            metadata[key] = key === "position" ? parseInt(value, 10) : value;
          }
        }
      }

      // without that the sort comparison will silently fail
      if (!metadata.position) {
        metadata.position = 99
      }

      guides.push(metadata);
    });

  guides.sort((a, b) => {
    return a.position - b.position;
  });

  return guides;
}
