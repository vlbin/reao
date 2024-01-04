import { Element } from "./Element";

type HStackProps = {
  alignment: "center" | "top" | "bottom";
};

type VStackProps = {
  alignment: "center" | "start" | "end";
};

export function isProp<Type extends { alignment: string }>(
  obj: Type | Element
): obj is Type {
  return (<Type>obj).alignment !== undefined;
}

const HStackClassMap = {
  base: "flex flex-row gap-4",
  center: "items-center",
  top: "items-start",
  bottom: "items-end",
};

const VStackClassMap = {
  base: "flex flex-col gap-4",
  center: "items-center",
  start: "items-start",
  end: "items-end",
};

class StackClass extends Element {
  gap(value: "none" | "sm" | "md" | "lg") {
    const gapMap = { none: "gap-0", sm: "gap-2", md: "gap-4", lg: "gap-8" };
    this.props!.class = [this.props!.class, gapMap[value]].join(" ");
    return this;
  }
}

export function Stack(
  classMap: Record<string, string>,
  ...[propOrChild, ..._children]: [
    Element | HStackProps | VStackProps,
    ...Element[]
  ]
) {
  const alignment = isProp(propOrChild) ? propOrChild.alignment : "center";

  const children = isProp(propOrChild)
    ? _children
    : [propOrChild, ..._children];

  return new StackClass(
    "div",
    { class: `${classMap.base} ${classMap[alignment]}` },
    ...children
  );
}

export function HStack(...children: [Element | HStackProps, ...Element[]]) {
  return Stack(HStackClassMap, ...children);
}

export function VStack(...children: [Element | VStackProps, ...Element[]]) {
  return Stack(VStackClassMap, ...children);
}
