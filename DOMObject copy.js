import { JSDOM } from "jsdom";

export default class DOMObject {
  children = [];
  #el;
  #elCopy;

  constructor(html = "") {
    this.#el = createDocumentBody(html);
    this.#elCopy = createDocumentBody(html);

    this.tag = this.#el.tagName;
    this.class = this.#el.className;
    this.id = this.#el.id;
    this.dataset = this.#el.dataset;

    this.#elCopy.replaceChildren();
    this.text = this.#elCopy.textContent.trim();
  }

  addChild(child) {
    this.children.push(child);
  }
}

function createDocumentBody(html) {
  if (process.env.NODE_ENV === "NODE") {
    const dom = new JSDOM(html);
    return dom.window.document.body;
  }
  return new DOMParser().parseFromString(html, "text/html").body;
}
