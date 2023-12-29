import { Button } from "./elements";
import { VStack } from "./elements";

export default function App() {
  return VStack({ alignment: "start" }, Button("hello!"), Button("hello!"));
}
