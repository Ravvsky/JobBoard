import { BaseText, Descendant } from "slate";
export type ExtendedDescendant = Descendant & {
  type:
    | "paragraph"
    | "headingOne"
    | "headingTwo"
    | "headingThree"
    | "orderedList"
    | "unorderedList"
    | "link";
  children: FormattedText[];
};
export type FormattedText = BaseText & {
  children: FormattedText[];
  type: string;
  href: string;
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
};
const slateObjectToMarked = (value: ExtendedDescendant[]) => {
  if (!value) return "";
  let fullValue = "";
  value.forEach((n) => {
    const formatChildren = (child: FormattedText) => {
      let formattedText = child.text;

      if (child.bold) {
        formattedText = `<strong>${formattedText}</strong>`;
      }
      if (child.italic) {
        formattedText = `<i>${formattedText}</i>`;
      }
      if (child.underline) {
        formattedText = `<u>${formattedText}</u>`;
      }

      return formattedText;
    };

    switch (n.type) {
      case "paragraph":
        let paragraphText = "";
        n.children.forEach((child) => {
          if (child.type === "link") {
            const linkText = formatChildren(child.children[0]);
            const linkHref = child.href;
            paragraphText += `<a href="${linkHref}" target="_self">${linkText}</a>`;
          } else if (child.text) {
            const formattedText = formatChildren(child);
            paragraphText += formattedText;
          }
        });
        fullValue += `<p>${paragraphText}</p>`;
        break;

      case "headingOne":
        const headingOneText = formatChildren(n.children[0]);
        fullValue += `<h1>${headingOneText}</h1>`;
        break;

      case "headingTwo":
        const headingTwoText = formatChildren(n.children[0]);
        fullValue += `<h2>${headingTwoText}</h2>`;
        break;

      case "headingThree":
        const headingThreeText = formatChildren(n.children[0]);
        fullValue += `<h3>${headingThreeText}</h3>`;
        break;

      case "orderedList":
        let orderedListText = `<ol>`;
        n.children.forEach((listItem: { children: FormattedText[] }) => {
          if (listItem.children && listItem.children[0].text) {
            const listItemText = formatChildren(listItem.children[0]);
            orderedListText += `<li>${listItemText}</li>`;
          }
        });
        orderedListText += `</ol>`;
        fullValue += orderedListText;
        break;

      case "unorderedList":
        let unorderedListText = `<ul>`;
        n.children.forEach((listItem: { children: FormattedText[] }) => {
          if (listItem.children && listItem.children[0].text) {
            const listItemText = formatChildren(listItem.children[0]);
            unorderedListText += `<li>${listItemText}</li>`;
          }
        });
        unorderedListText += `</ul>`;
        fullValue += unorderedListText;
        break;

      default:
        console.log("Unknown type:", n.type);
    }
  });
  return fullValue;
};

export default slateObjectToMarked;
