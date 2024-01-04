import { Element } from "./Element";

const styles =
  "rounded-md py-1 px-2 bg-green-900 hover:bg-green-950 text-white outline-none border-0";

export function Button(label: string) {
  return new Element("button", { class: styles }, label);
}
