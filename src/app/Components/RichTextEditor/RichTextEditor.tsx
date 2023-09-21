"use client";

import { useMemo, useCallback, useState, useEffect } from "react";
import { Descendant, createEditor } from "slate";
import {
  Slate,
  Editable,
  withReact,
  RenderLeafProps,
  RenderElementProps,
} from "slate-react";
import { withHistory } from "slate-history";
import Toolbar from "./Toolbar/Toolbar";
import Element from "./Element/Element";
import Leaf from "./Leaf/Leaf";
import withLinks from "./utils/withLinks";
import slateObjectToMarked, {
  ExtendedDescendant,
} from "./utils/slateObjectToMarked";
import markedToSlateObject from "./utils/markedToSlateObject";

const RichTextEditor = ({
  onProcessedValueChange,
  initialValue,
}: {
  onProcessedValueChange: (value: string) => void;
  initialValue: string;
}) => {
  const editor = useMemo(
    () => withHistory(withLinks(withReact(createEditor()))),
    [],
  );

  const renderElement = useCallback(
    (props: RenderElementProps) => <Element {...props} />,
    [],
  );

  const renderLeaf = useCallback((props: RenderLeafProps) => {
    return <Leaf {...props} />;
  }, []);
  const [value, setValue] = useState<Descendant[]>([]);

  useEffect(() => {
    onProcessedValueChange(slateObjectToMarked(value as ExtendedDescendant[]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleEditorChange = (
    newValue: ExtendedDescendant[] | Descendant[],
  ) => {
    slateObjectToMarked(newValue as ExtendedDescendant[]);
    setValue(newValue);
  };
  return (
    <Slate
      editor={editor}
      initialValue={markedToSlateObject(initialValue)}
      onChange={handleEditorChange}
    >
      <div className="rounded-[5rem] border-[2px] border-solid border-main-blue">
        <Toolbar />
        <div className=" focus:outline-none focus-visible:outline-none">
          <Editable
            name="content"
            placeholder="Write something"
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            className="my-[1.5rem] mt-[0.5rem] pl-[3.5rem] focus:outline-none focus-visible:outline-none"
          />
        </div>
      </div>
    </Slate>
  );
};

export default RichTextEditor;
