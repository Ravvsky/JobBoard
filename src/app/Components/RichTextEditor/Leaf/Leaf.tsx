import { BaseText } from "slate";
import { getMarked } from "../utils/SlateUtilityFunctions";
import { FormattedText } from "../utils/slateObjectToMarked";

const Leaf = ({
  attributes,
  children,
  leaf,
}: {
  attributes?: { "data-slate-leaf": boolean };
  children?: React.ReactNode;
  leaf: BaseText;
  text: BaseText;
}) => {
  const formattedLeaf: FormattedText = {
    children: [],
    type: "",
    href: "",
    ...leaf, // Include any additional properties from BaseText
  };
  children = getMarked(formattedLeaf, children);
  return <span {...attributes}>{children}</span>;
};
export default Leaf;
