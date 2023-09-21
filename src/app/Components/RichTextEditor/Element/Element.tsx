import { CustomElement, getBlock } from "../utils/SlateUtilityFunctions";
import { LinkElementProps } from "../Link/Link";
import { RenderElementProps } from "slate-react";
export type ElementProps =
  | RenderElementProps
  | {
      attributes: object;
      element: CustomElement;
      children: string;
      type: string;
    }
  | LinkElementProps;

const Element = (props: ElementProps) => {
  return <>{getBlock(props)}</>;
};
export default Element;
