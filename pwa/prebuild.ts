import { getAllContributors } from "./api/contributorsRank";

/* eslint-disable @typescript-eslint/no-var-requires */
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const { current } = require("./consts");

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

createWallpapers();

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

createLogos();

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

createColouringMiniatures();

export async function updateAllDocFiles(directory: string) {
  const files = await fs.readdirSync(directory);
  await Promise.all(
    files.map(async (file: any) => {
      const fullPath = `${directory}/${file}`;
      const s = fs.statSync(fullPath);
      if (s.isDirectory()) await updateAllDocFiles(fullPath);
      else {
        if (path.extname(fullPath) === ".md") fixDocContent(fullPath);
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

function fixReferencesLinks(filePath: string) {
  const fileContent = fs.readFileSync(filePath, "utf-8");

  const formattedContent = fileContent
    // replace wrong codeblock
    .replace(/(<a href=".+?">.+?<\/a>)/g, "`$1`");

  fs.writeFileSync(filePath, formattedContent, "utf8");
}

export async function updateAllReferenceLinks(directory: string) {
  const files = await fs.readdirSync(directory);
  await Promise.all(
    files.map(async (file: any) => {
      const fullPath = `${directory}/${file}`;
      const s = fs.statSync(fullPath);
      if (s.isDirectory()) await updateAllReferenceLinks(fullPath);
      else {
        if (path.extname(fullPath) === ".mdx") fixReferencesLinks(fullPath);
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
      path.resolve(__dirname, `./${xsdMetadataPath}//metadata-2.0.xsd`),
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

async function getContributors() {
  const allContributors = await getAllContributors();
  fs.writeFileSync(
    path.join(process.cwd(), "data/contributors.json"),
    JSON.stringify(allContributors, null, 2),
    "utf-8"
  );
}

updateAllDocFiles(path.join(process.cwd(), "data/docs"));
generateXsd();
getContributors();
//updateAllReferenceLinks(path.join(process.cwd(), "data/docs/reference"));
