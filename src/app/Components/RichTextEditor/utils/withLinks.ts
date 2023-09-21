import { BaseEditor, BaseElement } from "slate";
import { ReactEditor } from "slate-react";

interface LinkElement extends BaseElement {
  type: "link";
}

const isLinkElement = (element: BaseElement): element is LinkElement => {
  return (element as LinkElement).type === "link";
};

const withLinks = (editor: BaseEditor & ReactEditor) => {
  const { isInline } = editor;

  editor.isInline = (element: BaseElement) =>
    isLinkElement(element) ? true : isInline(element);

  return editor;
};

export default withLinks;
