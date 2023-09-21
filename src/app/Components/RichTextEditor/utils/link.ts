import {
  Editor,
  Transforms,
  Path,
  Range,
  Element,
  BaseEditor,
  Ancestor,
  NodeEntry,
} from "slate";

export type ExtendedAncestor = NodeEntry<Ancestor> & {
  type: string;
};

const isExtendedAncestor = (
  node: ExtendedAncestor | NodeEntry<Ancestor> | unknown,
): node is ExtendedAncestor => {
  return (
    typeof node === "object" &&
    node !== null &&
    "type" in node &&
    typeof node.type === "string"
  );
};

export const createLinkNode = (
  href: string,
  showInNewTab: boolean,
  text: string,
) => ({
  type: "link",
  href,
  target: showInNewTab ? "_blank" : "_self",
  children: [{ text }],
});

export const insertLink = (
  editor: BaseEditor,
  { url, showInNewTab }: { url: string; showInNewTab: boolean },
) => {
  if (!url) return;

  const { selection } = editor;
  const link = createLinkNode(url, showInNewTab, "Link");
  if (!!selection) {
    const [parent, parentPath] = Editor.parent(editor, selection.focus.path);
    if (isExtendedAncestor(parent) && parent.type === "link") {
      removeLink(editor);
    }

    if (editor.isVoid(parent)) {
      // Create a paragraph node with the link as its child
      const paragraphNode = {
        type: "paragraph",
        children: [link],
      };
      Transforms.insertNodes(editor, paragraphNode, {
        at: Path.next(parentPath),
        select: true,
      });
    } else if (Range.isCollapsed(selection)) {
      Transforms.insertNodes(editor, link, { select: true });
    } else {
      Transforms.wrapNodes(editor, link, { split: true });
    }
  } else {
    const paragraphNode = {
      type: "paragraph",
      children: [link],
    };
    Transforms.insertNodes(editor, paragraphNode);
  }
};

export const removeLink = (editor: BaseEditor) => {
  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && Element.isElement(n) && isLinkElement(n),
  });
};
const isLinkElement = (node: Element) => {
  return "type" in node && node.type === "link";
};
