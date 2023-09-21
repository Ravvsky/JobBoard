import React from "react";
import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatUnderlined,
  MdFormatListNumbered,
  MdFormatListBulleted,
  MdInsertLink,
  MdVideoLibrary,
  MdImage,
  MdAdd,
  MdArrowForward,
} from "react-icons/md";
import {
  BsTypeH1,
  BsTypeH2,
  BsTypeH3,
  BsCameraVideoFill,
} from "react-icons/bs";
import {
  AiFillEdit,
  AiOutlineTable,
  AiOutlineInsertRowBelow,
  AiOutlineInsertRowRight,
  AiOutlineDelete,
  AiFillTag,
  AiOutlineUpload,
  AiOutlineArrowsAlt,
  AiOutlineInsertRowAbove,
  AiOutlineInsertRowLeft,
  AiFillHtml5,
} from "react-icons/ai";
import { SiLatex } from "react-icons/si";

export type IconKey =
  | "bold"
  | "italic"
  | "underline"
  | "headingOne"
  | "headingTwo"
  | "headingThree"
  | "orderedList"
  | "unorderedList"
  | "link"
  | "image"
  | "video"
  | "add"
  | "table"
  | "insertRowBelow"
  | "insertColumnRight"
  | "insertColumnLeft"
  | "insertRowAbove"
  | "trashCan"
  | "addId"
  | "upload"
  | "equation"
  | "resize"
  | "videoPlayer"
  | "insertHtml"
  | "arrowRight"
  | "pen";

const iconList: { [key in IconKey]: React.ReactNode } = {
  bold: <MdFormatBold size={20} />,
  italic: <MdFormatItalic size={20} />,
  underline: <MdFormatUnderlined size={20} />,
  headingOne: <BsTypeH1 size={20} />,
  headingTwo: <BsTypeH2 size={20} />,
  headingThree: <BsTypeH3 size={20} />,
  orderedList: <MdFormatListNumbered size={20} />,
  unorderedList: <MdFormatListBulleted size={20} />,
  link: <MdInsertLink size={20} />,
  image: <MdImage size={20} />,
  video: <MdVideoLibrary size={20} />,
  add: <MdAdd size={20} />,
  table: <AiOutlineTable size={20} />,
  insertRowBelow: <AiOutlineInsertRowBelow size={25} />,
  insertColumnRight: <AiOutlineInsertRowRight size={25} />,
  insertColumnLeft: <AiOutlineInsertRowLeft size={25} />,
  insertRowAbove: <AiOutlineInsertRowAbove size={25} />,
  trashCan: <AiOutlineDelete size={25} />,
  addId: <AiFillTag size={20} />,
  upload: <AiOutlineUpload size={20} />,
  equation: <SiLatex size={20} />,
  resize: <AiOutlineArrowsAlt size={20} />,
  videoPlayer: <BsCameraVideoFill size={20} />,
  insertHtml: <AiFillHtml5 size={20} />,
  arrowRight: <MdArrowForward size={35} />,
  pen: <AiFillEdit size={20} />,
};

const Icon = (props: { icon: IconKey }) => {
  const { icon } = props;
  return <>{iconList[icon]}</>;
};

export default Icon;
