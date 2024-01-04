import { Element } from "./Element";

const styles = "";

export function Text(content: string) {
  return new Element("p", { class: styles }, content);
}
