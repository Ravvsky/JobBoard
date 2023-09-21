import React from "react";
import {
  RenderElementProps,
  useFocused,
  useSelected,
  useSlateStatic,
} from "slate-react";
import { removeLink } from "../utils/link";
import Unlink from "../Toolbar/toolbarIcons/unlink.svg";
import { Descendant } from "slate";
export interface LinkElementProps extends RenderElementProps {
  element: {
    type: "link";
    href: string;
    target: string;
    attr?: {
      type: string;
      href: string;
      target: "_self" | "_blank" | "_parent" | "_top";
    };
    children: Descendant[];
  };
}

const Link = (props: LinkElementProps) => {
  const { element, children, attributes } = props;
  const editor = useSlateStatic();
  const selected = useSelected();
  const focused = useFocused();

  return (
    <div>
      <a
        href={element.href}
        {...attributes}
        {...element.attr}
        target={element.target}
      >
        {children}
      </a>
      {selected && focused && (
        <div contentEditable={false}>
          <a href={element.href} target={element.target}>
            {element.href}
          </a>
          <button onClick={() => removeLink(editor)}>
            <Unlink />
          </button>
        </div>
      )}
    </div>
  );
};

export default Link;
