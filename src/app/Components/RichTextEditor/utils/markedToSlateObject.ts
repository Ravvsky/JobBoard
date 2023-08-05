"use client";
const isOrderedList = (text: string) => {
  return /^\d+\.\s/.test(text.trim());
};

const isUnorderedList = (text: string) => {
  return /^[*-]\s/.test(text.trim());
};

const markedToSlateObject = (markedText: string) => {
  if (!markedText) {
    return [{ type: "paragraph", children: [{ text: "" }] }];
  }

  const paragraphs = [];
  let currentParagraph = "";
  let orderedListItems = [];
  let isInsideOrderedList = false;

  const lines = markedText.split("\n");
  for (const line of lines) {
    if (isOrderedList(line) || isUnorderedList(line)) {
      if (currentParagraph) {
        const paragraphLines = currentParagraph.split("\n");
        for (const paragraphLine of paragraphLines) {
          paragraphs.push({
            type: "paragraph",
            children: parseFormattedText(paragraphLine),
          });
        }
        currentParagraph = "";
      }

      const listItemText = line.replace(/^\d+\.\s|^[*-]\s/, "").trim();
      const listItem = {
        type: "list-item",
        children: parseFormattedText(listItemText),
      };

      if (isOrderedList(line)) {
        if (!isInsideOrderedList) {
          paragraphs.push({
            type: "ordered-list",
            children: [listItem],
          });
          isInsideOrderedList = true;
        } else {
          orderedListItems.push(listItem);
        }
      } else {
        if (isInsideOrderedList) {
          paragraphs.push({
            type: "ordered-list",
            children: orderedListItems,
          });
          orderedListItems = [];
          isInsideOrderedList = false;
        }
        paragraphs.push({
          type: "unordered-list",
          children: [listItem],
        });
      }
    } else {
      currentParagraph += (currentParagraph ? "\n" : "") + line;
    }
  }

  if (currentParagraph) {
    const paragraphLines = currentParagraph.split("\n");
    for (const paragraphLine of paragraphLines) {
      paragraphs.push({
        type: "paragraph",
        children: parseFormattedText(paragraphLine),
      });
    }
  }

  if (isInsideOrderedList) {
    paragraphs.push({
      type: "ordered-list",
      children: orderedListItems,
    });
  }

  return paragraphs;
};

const parseFormattedText = (text: string) => {
  const children = [];
  let remainingText = text;
  while (remainingText.length > 0) {
    if (remainingText.startsWith("**")) {
      const boldEndIndex = remainingText.indexOf("**", 2);
      if (boldEndIndex !== -1) {
        const boldText = remainingText.slice(2, boldEndIndex);
        children.push({ text: boldText, bold: true });
        remainingText = remainingText.slice(boldEndIndex + 2);
      } else {
        children.push({ text: remainingText });
        remainingText = "";
      }
    } else {
      const nextBoldIndex = remainingText.indexOf("**");
      if (nextBoldIndex !== -1) {
        const plainText = remainingText.slice(0, nextBoldIndex);
        children.push({ text: plainText });
        remainingText = remainingText.slice(nextBoldIndex);
      } else {
        children.push({ text: remainingText });
        remainingText = "";
      }
    }
  }

  return children;
};

export default markedToSlateObject;
