import "./style.css";
import App from "./App";
import { AppElement } from "./elements";

const root = new AppElement("div", {});
root.setChildren(App());

document.querySelector("#app")!.innerHTML = root.renderRoot();
