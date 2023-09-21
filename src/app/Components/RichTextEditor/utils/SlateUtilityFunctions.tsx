import {
  Editor,
  Transforms,
  Element as SlateElement,
  BaseEditor,
  BaseText,
  BaseElement,
} from "slate";
import Link, { LinkElementProps } from "../Link/Link";
import { ReactFragment } from "react";
import { FormattedText } from "./slateObjectToMarked";
import { ElementProps } from "../Element/Element";
const list_types = ["orderedList", "unorderedList"];
interface BlockElement extends SlateElement {
  type: string;
}
type NodeProperties = Partial<SlateElement> & { type?: string };
type MarkProperties = Partial<BaseText>;

interface Marks {
  [key: string]: MarkProperties | undefined;
}
export const sizeMap = {
  small: "0.75em",
  normal: "1em",
  medium: "1.75em",
  huge: "2.5em",
};

export const toggleBlock = (editor: BaseEditor, format: string) => {
  const isActive = isBlockActive(editor, format);
  const isList = list_types.includes(format);

  /*If the node is already aligned and change in indent is called we should unwrap it first and split the node to prevent
    messy, nested DOM structure and bugs due to that.*/

  /* Wraping the nodes for alignment, to allow it to co-exist with other block level operations*/

  Transforms.unwrapNodes(editor, {
    match: (n) => {
      if (!Editor.isEditor(n) && SlateElement.isElement(n) && "type" in n) {
        return list_types.includes((n as BlockElement).type);
      }
      return false;
    },
    split: true,
  });

  Transforms.setNodes(editor, {
    type: isActive ? "paragraph" : isList ? "list-item" : format,
  } as NodeProperties);

  if (isList && !isActive) {
    const newElement: BlockElement = { type: format, children: [] };
    Transforms.wrapNodes(editor, newElement);
  }
};

export const toggleMark = (editor: BaseEditor, format: string) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

export const isMarkActive = (editor: BaseEditor, format: string) => {
  const marks = Editor.marks(editor) as Marks;
  return marks ? marks[format] !== undefined : false;
};
export const isBlockActive = (editor: BaseEditor, format: string) => {
  const matches = Editor.nodes(editor, {
    match: (n) => {
      // Assign the BlockElement type to the individual n variable
      const node = n as BlockElement;
      return (
        !Editor.isEditor(n) && SlateElement.isElement(n) && node.type === format
      );
    },
  });

  const matchArray = Array.from(matches);
  return matchArray.length > 0;
};

export const activeMark = (editor: BaseEditor, format: string | number) => {
  const defaultMarkData = {
    color: "black",
    bgColor: "black",
    fontSize: "normal",
    fontFamily: "sans",
  };

  // Use type assertion here to let TypeScript know that `format` is a valid property for `defaultMarkData`
  const defaultValue = defaultMarkData[format as keyof typeof defaultMarkData];

  const marks = Editor.marks(editor);

  // Use type assertion here to let TypeScript know that `format` is a valid property for `marks`
  return marks?.[format as keyof typeof marks] ?? defaultValue;
};

export const getMarked = (
  leaf: FormattedText,
  children:
    | string
    | number
    | boolean
    | JSX.Element
    | ReactFragment
    | null
    | undefined,
) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return children;
};
export interface CustomElement extends BaseElement {
  type: string;
}

export const getBlock = (props: ElementProps) => {
  const { element, children } = props;
  const attributes = props.attributes ?? {};

  if ("type" in element) {
    switch (element.type) {
      case "headingOne":
        return <h1 {...attributes}>{children}</h1>;
      case "headingTwo":
        return <h2 {...attributes}>{children}</h2>;
      case "headingThree":
        return <h3 {...attributes}>{children}</h3>;
      case "list-item":
        return <li {...attributes}>{children}</li>;
      case "orderedList":
        return (
          <ol type="1" {...attributes}>
            {children}
          </ol>
        );
      case "unorderedList":
        return <ul {...attributes}>{children}</ul>;
      case "link":
        return <Link {...(props as LinkElementProps)} />;

      default:
        return <div {...attributes}>{children}</div>;
    }
  }
};
