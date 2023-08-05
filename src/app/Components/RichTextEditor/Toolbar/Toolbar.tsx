import React, { useEffect, useState } from "react";
import { useSlate } from "slate-react";
import Button from "../common/Button";
import Icon, { IconKey } from "../common/Icon";

import {
  toggleBlock,
  toggleMark,
  isMarkActive,
  isBlockActive,
} from "../utils/SlateUtilityFunctions";
import useFormat from "../utils/customHooks/useFormat";
import defaultToolbarGroups from "./toolbarGroups";
import LinkButton from "../LinkButton/LinkButton";

const Toolbar = () => {
  const editor = useSlate();
  const isTable = useFormat(editor, "table");
  const [toolbarGroups, setToolbarGroups] = useState(defaultToolbarGroups);

  useEffect(() => {
    let filteredGroups = [...defaultToolbarGroups];
    if (isTable) {
      filteredGroups = toolbarGroups.map((grp) =>
        grp.filter(
          (element) =>
            //groups that are not supported inside the table
            !["codeToText"].includes(element.type),
        ),
      );
      filteredGroups = filteredGroups.filter((elem) => elem.length);
    }
    setToolbarGroups(filteredGroups);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTable]);

  const BlockButton = ({ format }: { format: IconKey }) => {
    return (
      <Button
        active={isBlockActive(editor, format)}
        format={format}
        onMouseDown={(e: { preventDefault: () => void }) => {
          e.preventDefault();
          toggleBlock(editor, format);
        }}
      >
        <Icon icon={format} />
      </Button>
    );
  };
  const MarkButton = ({ format }: { format: IconKey }) => {
    return (
      <Button
        active={isMarkActive(editor, format)}
        format={format}
        onMouseDown={(e: { preventDefault: () => void }) => {
          e.preventDefault();
          toggleMark(editor, format);
        }}
      >
        <Icon icon={format} />
      </Button>
    );
  };

  return (
    <div className="flex pl-[3rem] pt-[1.5rem]">
      {toolbarGroups.map((group, index) => (
        <span key={index} className="flex">
          {group.map((element) => {
            switch (element.type) {
              case "block":
                return <BlockButton key={element.id} {...element} />;
              case "mark":
                return <MarkButton key={element.id} {...element} />;
              case "link":
                return (
                  <LinkButton
                    key={element.id}
                    active={isBlockActive(editor, "link")}
                    editor={editor}
                  />
                );

              default:
                return null;
            }
          })}
        </span>
      ))}
    </div>
  );
};

export default Toolbar;
