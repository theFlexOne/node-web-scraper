import { JSDOM } from "jsdom";

export default class HTMLPage {
  #DOMObject;

  constructor(html = "") {
    this.document = new JSDOM(html).window.document;
    this.body = this.document.body;
    this.main = this.body.querySelector("main");
    this.sections = [...this.body.querySelectorAll("section")];
    this.nav = this.body.querySelector("nav");
    this.header = this.body.querySelector("header");
    this.footer = this.body.querySelector("footer");
  }

  getDOMObject() {
    return this.#DOMObject;
  }
}

function buildDOMObject(HTMLString) {
  const HTMLElement = new JSDOM(HTMLString).window.document.body;
  const clonedHTMLElement = HTMLElement.cloneNode(true);
  const { id, className, dataset, tagName } = clonedHTMLElement;
  const children = [...HTMLElement.children].map(buildDOMObject);

  clonedHTMLElement.replaceChildren();
  const textContent = clonedHTMLElement.textContent;

  return {
    id,
    class: className,
    tagName,
    textContent,
    children,
    ...dataset,
  };
}
