const toolbarGroups: {
  id: number;
  format:
    | "bold"
    | "italic"
    | "underline"
    | "headingOne"
    | "headingTwo"
    | "headingThree"
    | "orderedList"
    | "unorderedList"
    | "link";
  type: string;
}[][] = [
  [
    {
      id: 3,
      format: "bold",
      type: "mark",
    },
    {
      id: 4,
      format: "italic",
      type: "mark",
    },
    {
      id: 5,
      format: "underline",
      type: "mark",
    },
  ],
  [
    {
      id: 11,
      format: "headingOne",
      type: "block",
    },
    {
      id: 12,
      format: "headingTwo",
      type: "block",
    },
    {
      id: 13,
      format: "headingThree",
      type: "block",
    },
  ],
  [
    {
      id: 15,
      format: "orderedList",
      type: "block",
    },
    {
      id: 16,
      format: "unorderedList",
      type: "block",
    },
  ],

  [
    {
      id: 20,
      format: "link",
      type: "link",
    },
  ],
];

export default toolbarGroups;
