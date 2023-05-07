import { JSDOM } from "jsdom";

export default class DOMObject {
  children = [];

  constructor(html = "") {
    this.el = createDocumentBody(html);

    this.tag = this.el.tagName;
    this.class = this.el.className;
    this.id = this.el.id;
    this.textContent = getHTMLElementTextContent(this.el);
    this.children = [...this.el.children].map(
      (child) => new DOMObject(child.outerHTML)
    );

    extractDataset(this.el, this);
  }
}

function createDocumentBody(html) {
  if (process.env.NODE_ENV === "NODE") {
    const dom = new JSDOM(html);
    return dom.window.document.body;
  }
  return new DOMParser().parseFromString(html, "text/html").body;
}

function getHTMLElementTextContent(HTMLElement) {
  const clonedHTMLElement = HTMLElement.cloneNode(true);
  clonedHTMLElement.replaceChildren();
  return clonedHTMLElement.textContent;
}

function extractDataset(HTMLElement, self) {
  for (const key in HTMLElement.dataset) {
    self.dataset[key] = HTMLElement.dataset[key];
  }
}
