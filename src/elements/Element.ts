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
  protected htmlElement: HTMLElement;
  protected listeners: [keyof HTMLElementEventMap, () => void][] = [];
  constructor(
    type: keyof HTMLElementTagNameMap,
    ...[propOrChild, ..._children]: [
      Props | string | Element | undefined,
      ...(string | Element)[]
    ]
  ) {
    this.props = { class: isProp(propOrChild) ? propOrChild.class : "" };
    this.htmlElement = document.createElement(type);
    this.children =
      isProp(propOrChild) || !propOrChild
        ? _children
        : [propOrChild, ..._children];
  }

  public onClick(callback: () => void) {
    this.listeners.push(["click", callback]);
    return this;
  }

  protected render() {
    Object.entries(this.props ?? {}).forEach(([key, val]) =>
      this.htmlElement.setAttribute(key, val)
    );

    const renderedElement = this.htmlElement.cloneNode(true) as HTMLElement;

    this.children.forEach((child) => {
      const childElement =
        child instanceof Element
          ? child.render()
          : document.createTextNode(child);
      renderedElement.appendChild(childElement);
    });

    this.listeners.forEach(([type, callback]) =>
      renderedElement.addEventListener(type, callback)
    );

    return renderedElement;
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
