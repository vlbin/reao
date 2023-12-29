type Props = {
  class?: string;
};

export function isProp(
  obj: Props | Element | string | undefined
): obj is Props {
  return (<Props>obj).class !== undefined;
}

export class Element {
  protected children: (Element | string)[];
  protected props: Props | undefined;
  constructor(
    private type: keyof HTMLElementTagNameMap,
    ...[propOrChild, ..._children]: [
      Props | string | Element | undefined,
      ...(string | Element)[]
    ]
  ) {
    this.props = { class: isProp(propOrChild) ? propOrChild.class : "" };
    this.children =
      isProp(propOrChild) || !propOrChild
        ? _children
        : [propOrChild, ..._children];
  }

  private renderChildren(): string {
    return this.children
      .map((child) => (typeof child === "string" ? child : child.render()))
      .join("");
  }

  protected render() {
    return `<${this.type} ${Object.entries(this.props ?? {})
      .map(([key, val]) => `${key}="${val}"`)
      .join(" ")}>${this.renderChildren()}</${this.type}>`;
  }
}

export class AppElement extends Element {
  public renderRoot() {
    return this.render();
  }

  public setChildren(root: Element) {
    this.children = [root];
  }
}
