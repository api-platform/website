import { getAllContributors } from "./api/contributorsRank";
import { readFile } from "fs/promises";
import YAML from "yaml";
import { Chapters } from "types";
import { createReadStream } from "fs";

/* eslint-disable @typescript-eslint/no-var-requires */
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const { current, versions } = require("./consts");

export async function createWallpaper(
  inputDirectory: string,
  outputDirectory: string,
  file: string,
  width: number,
  height: number
) {
  const outputFile = `${outputDirectory}/${
    path.parse(file).name
  }-${width}-${height}.jpg`;
  if (fs.existsSync(outputFile)) {
    // File exists in path
  } else {
    await sharp(`${inputDirectory}/${file}`)
      .resize(width, height, { fit: "cover" })
      .jpeg({ mozjpeg: true, quality: 100 })
      .toFile(outputFile);
  }
}

async function createWallpapers() {
  const inputDirectory = path.join(process.cwd(), "data", "wallpapers");
  const outputDirectory = path.join(
    process.cwd(),
    "public",
    "images",
    "wallpapers"
  );
  const filenames = fs.readdirSync(inputDirectory);
  await Promise.all(
    filenames.map(async (file: string) => {
      await createWallpaper(inputDirectory, outputDirectory, file, 2880, 1800);
      await createWallpaper(inputDirectory, outputDirectory, file, 1920, 1080);
      await createWallpaper(inputDirectory, outputDirectory, file, 1920, 1200);
      await createWallpaper(inputDirectory, outputDirectory, file, 660, 400);
    })
  );
}

export async function createLogo(
  inputDirectory: string,
  outputDirectory: string,
  file: string
) {
  const outputFile = `${outputDirectory}/${path.parse(file).name}.png`;
  if (fs.existsSync(outputFile)) {
    // File exists in path
  } else {
    await sharp(`${inputDirectory}/${file}`)
      .resize(800, undefined)
      .toFormat("png")
      .toFile(outputFile);
  }
}

async function createLogos() {
  const inputDirectory = path.join(process.cwd(), "public", "images", "logos");
  const filenames = fs.readdirSync(inputDirectory);

  await Promise.all(
    filenames
      .filter((file: string) => path.parse(file).ext === ".svg")
      .map(async (file: string) => {
        await createLogo(inputDirectory, inputDirectory, file);
      })
  );
}

async function createColouringMiniatures() {
  const inputDirectory = path.join(
    process.cwd(),
    "public",
    "images",
    "colouring"
  );
  const filenames = fs.readdirSync(inputDirectory);

  await Promise.all(
    filenames
      .filter((file: string) => path.parse(file).ext === ".jpg")
      .map(async (file: string) => {
        const outputFile = `${inputDirectory}/mini/${
          path.parse(file).name
        }.jpg`;
        if (fs.existsSync(outputFile)) {
          // File exists in path
        } else {
          await sharp(`${inputDirectory}/${file}`)
            .resize(500, undefined)
            .toFormat("jpg")
            .toFile(outputFile);
        }
      })
  );
}

const checkStatus = (response: any) => {
  if (response.ok) {
    return response;
  }

  throw new Error(
    `HTTP Error Response: ${response.status} ${response.statusText}`
  );
};

async function generateXsd() {
  try {
    const xsdMetadataPath = "public/schema/metadata";
    const resResources = await fetch(
      `https://github.com/api-platform/core/raw/${current}/src/Metadata/Extractor/schema/resources.xsd`
    );
    const resProperties = await fetch(
      `https://github.com/api-platform/core/raw/${current}/src/Metadata/Extractor/schema/properties.xsd`
    );
    const xsd = await fetch(
      `https://github.com/api-platform/core/raw/2.7/src/Core/Metadata/schema/metadata.xsd`
    );
    checkStatus(resProperties);
    checkStatus(resResources);
    checkStatus(xsd);

    fs.writeFileSync(
      path.resolve(__dirname, `./${xsdMetadataPath}/resources-3.0.xsd`),
      await resResources.text()
    );
    fs.writeFileSync(
      path.resolve(__dirname, `./${xsdMetadataPath}/properties-3.0.xsd`),
      await resProperties.text()
    );
    fs.writeFileSync(
      path.resolve(__dirname, `./${xsdMetadataPath}/metadata-2.0.xsd`),
      await xsd.text()
    );
  } catch (error) {
    console.warn(
      "\x1b[31m",
      `Failed to retrieve metadata XSD files: ${error}`,
      "\x1b[37m"
    );
  }
}

const indexes = [
  "admin",
  "core",
  "create-client",
  "deployment",
  "distribution",
  "extra",
  "schema-generator",
  "client-generator",
];

function getGithubPath(slug: string[]): string {
  slug = slug.filter((v) => v);
  const lastPart = slug.slice(-1)[0];
  return slug.join("/") + (indexes.includes(lastPart) ? "/index.md" : ".md");
}

function extractTitleFromMarkdown(content: string) {
  const lines = content.split("\n");
  for (let index = 0; index < lines.length; index++) {
    const line = lines[index];
    const result = line.match(/#\s(.*)/);

    if (null === result || result.length === 0) {
      continue;
    }

    return result[1];
  }

  return null;
}

export async function getMarkdownStreamTitle(version: string, slug: string[]) {
  const stream = createReadStream(
    path.join("data/docs/", version, getGithubPath(slug))
  );
  let title: string;

  return new Promise((resolve, reject) => {
    stream.on("data", (chunk) => {
      title =
        extractTitleFromMarkdown(chunk.toString()) ||
        slug[slug.length - 1] ||
        "";

      if (title) {
        resolve(title);
        stream.destroy();
      }
    });
    stream.on("error", (err) => reject(err));
  });
}

async function loadDocumentationNav() {
  for (const version of versions) {
    const data = await readFile(`data/docs/${version}/outline.yaml`, "utf8");
    const navData: Chapters = YAML.parse(data.toString());
    const basePath = version === current ? `/docs` : `/docs/v${version}`;
    const versionNav = [];

    for (const chapter of navData.chapters) {
      const links = [];

      for (const link of chapter.items) {
        const title = await getMarkdownStreamTitle(version, [
          chapter.path,
          link === "index" ? "" : link,
        ]);

        links.push({
          title,
          link:
            link === "index"
              ? `${basePath}/${chapter.path}/`
              : `${basePath}/${chapter.path}/${link}/`,
        });
      }

      versionNav.push({
        title: chapter.title,
        basePath: `${basePath}/${chapter.path}/`,
        links: links,
      });
    }

    versionNav.push({
      title: "Changelog",
      basePath: `${basePath}/changelog/`,
      link: `${basePath}/changelog/`,
      links: [],
    });

    fs.writeFileSync(
      `data/docs/${version}/nav.json`,
      JSON.stringify(versionNav)
    );
  }
}

export async function updateAllDocFiles(directory: string) {
  const files = await fs.readdirSync(directory);
  await Promise.all(
    files.map(async (file: any) => {
      const fullPath = `${directory}/${file}`;
      const s = fs.statSync(fullPath);
      if (s.isDirectory()) await updateAllDocFiles(fullPath);
      else {
        if (path.extname(fullPath) === ".mdx") fixDocContent(fullPath);
      }
    })
  );
}

function fixDocContent(filePath: string) {
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const imgRegex = /<img\s+[^>]*?(?<!\/)>(?!<\/img>)/gi;
  const codeBlockRegex = /\n{0,2}```([\w-]+)\n([\s\S]*?)\n```/g;
  const codeSelectorRegex = /<div data-code-selector>([\s\S]*?)\n{0,1}<\/div>/g;
  const braceRegex = /{@([^{}]+)}/g;

  const guideRegex =
    /(<a href="#section.*?>[\s\S]*?<\/a>)\n?([\s\S]*?)(?=\n?<a href="#section|$)/g;

  const formattedContent = fileContent
    // replace wrong codeblock
    .replace(/````/g, "```")
    // replace wrong br tags
    .replace(/<br>/g, "<br/>")
    // replace wrong img tags
    .replace(/class=/g, "className=")
    .replace(imgRegex, (match: string) => match.replace(/>$/, " />"))
    .replace(/```<\/div>/g, "```\n</div>")
    .replace(codeBlockRegex, "\n\n```$1\n$2\n```")
    .replace(guideRegex, `<SectionGuide>\n$1\n$2\n</SectionGuide>\n`)
    .replace(codeSelectorRegex, "<CodeSelector>$1\n</CodeSelector>")
    .replace(braceRegex, "\\{@$1}")
    .replace(/Converts {/g, "Converts {}")
    // pagination exception
    .replace(
      /the page {- the offset {- the limit {/g,
      "the page |- the offset |- the limit |"
    )
    // errorListener exception
    .replace(/from the operation \({/g, "from the operation")
    .replace(/<dunglas@gmail.com>/g, "");

  fs.writeFileSync(
    path.format({ ...path.parse(filePath), base: "", ext: ".mdx" }),
    formattedContent,
    "utf8"
  );
}

// function fixReferencesLinks(filePath: string) {
//   const fileContent = fs.readFileSync(filePath, "utf-8");
//
//   const formattedContent = fileContent
//     // replace wrong codeblock
//     .replace(/(<a href=".+?">.+?<\/a>)/g, "`$1`");
//
//   fs.writeFileSync(filePath, formattedContent, "utf8");
// }
//
// export async function updateAllReferenceLinks(directory: string) {
//   const files = await fs.readdirSync(directory);
//   await Promise.all(
//     files.map(async (file: any) => {
//       const fullPath = `${directory}/${file}`;
//       const s = fs.statSync(fullPath);
//       if (s.isDirectory()) await updateAllReferenceLinks(fullPath);
//       else {
//         if (path.extname(fullPath) === ".mdx") fixReferencesLinks(fullPath);
//       }
//     })
//   );

// soyuka.me/contributors.json
// async function getContributors() {
//   const allContributors = await getAllContributors();
//   fs.writeFileSync(
//     path.join(process.cwd(), "data/contributors.json"),
//     JSON.stringify(allContributors, null, 2),
//     "utf-8"
//   );
// }

try {
  createWallpapers();
  createLogos();
  createColouringMiniatures();
  generateXsd();
  updateAllDocFiles(path.join(process.cwd(), "data/docs"));
  loadDocumentationNav();
  // getContributors();
//updateAllReferenceLinks(path.join(process.cwd(), "data/docs/reference"));
} catch (e) {
  console.error(e);
}

