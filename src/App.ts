import { Button } from "./elements";
import { VStack } from "./elements";
import { Text } from "./elements/Text";

export default function App() {
  return VStack(
    { alignment: "center" },
    Text("Let's start with some text"),
    Button("Click me!").onClick(() => alert("hello!"))
  ).gap("md");
}
