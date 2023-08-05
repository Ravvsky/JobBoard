import { useEffect, useState } from "react";
import { BaseEditor, Editor, Element } from "slate";

// Custom element type extending BaseElement
interface CustomElement extends Element {
  type: string;
}

// This hook returns if the node in the current selection matches the format passed to it.
const useFormat = (editor: BaseEditor, format: string) => {
  const [isFormat, setIsFormat] = useState(false);
  useEffect(() => {
    if (editor.selection) {
      // It matches at the editor.selection location by default, so if null handle it separately.
      const nodes = Editor.nodes(editor, {
        match: (n) =>
          !Editor.isEditor(n) &&
          Element.isElement(n) &&
          (n as CustomElement).type === format,
      });
      const [node] = Array.from(nodes);

      setIsFormat(!!node);
    } else {
      setIsFormat(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor.selection]);

  return isFormat;
};

export default useFormat;
