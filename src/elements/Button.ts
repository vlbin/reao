import { Element } from "./Element";

export function Button(label: string) {
  const styles =
    "rounded-md py-1 px-2 bg-blue-900 hover:bg-blue-950 text-white outline-none border-0";
  return new Element("button", { class: styles }, label);
}
