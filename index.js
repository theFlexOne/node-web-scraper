// import DOMObject from "./DOMObject.js";
import fs from "fs";
import { start } from "./console.js";
import { JSDOM } from "jsdom";

const IGNORED_TAGS = ["SCRIPT", "STYLE", "NOSCRIPT"];

function main() {
  const htmlString = loadHTMLFile("black-bullhead.html");

  const page = extractPageData(htmlString);

  fs.writeFileSync("./page.json", JSON.stringify(page, null, 2));
}

main();

function extractPageData(htmlString) {
  const dom = new JSDOM(htmlString);
  const { body } = dom.window.document;

  return recurseDOM(body);
}

function recurseDOM(node) {
  function nodesReducer(acc, node) {
    if (!IGNORED_TAGS.includes(node.tagName)) {
      const domObject = recurseDOM(node);
      acc.push(domObject);
    }
    return acc;
  }

  const children = [...node.children];
  const domObject = {
    tag: node.tagName,
    id: node.id,
    class: node.className,
    children: children.reduce(nodesReducer, []),
  };

  const nodeCopy = node.cloneNode(true);
  nodeCopy.replaceChildren();
  domObject.text = nodeCopy.textContent;

  return domObject;
}

function loadAllHTMLFiles(folderPath = "./html") {
  const files = fs.readdirSync(folderPath);
  const htmls = files.map((file) => {
    const html = fs.readFileSync(`${folderPath}/${file}`, "utf8");
    return html;
  });
  return htmls;
}

function loadHTMLFile(filename) {
  return fs.readFileSync("./html/" + filename, "utf8");
}
