import { Element } from "./Element";

const styles = "";

export function List(content: string) {
  return new Element("ul", { class: styles }, content);
}
