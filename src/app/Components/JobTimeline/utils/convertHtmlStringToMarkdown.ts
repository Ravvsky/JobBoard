import TurndownService from "turndown";

const transformStringWithLineBreaks = (inputString: string) => {
  // Replace any list item (numbered or bullet point) with \n
  let transformedString = inputString.replace(
    /(\d+\.|-)\s/g,
    (match) => `\n${match}`,
  );

  // Remove any extra leading whitespace after the \n
  transformedString = transformedString.replace(/\n\s+/g, "\n");
  return transformedString.trim();
};

const convertHtmlStringToMarkdown = (
  stringToTransform: string | TurndownService.Node,
) => {
  const turndownService = new TurndownService();
  turndownService.addRule("listItem", {
    filter: "li",
    replacement: function (content, node) {
      const parent = node.parentNode;
      if (parent && parent.nodeName === "OL") {
        const index = Array.prototype.indexOf.call(parent.children, node) + 1;
        return `${index}. ${content}\n`;
      }
      return `- ${content}\n`;
    },
  });

  turndownService.addRule("underline", {
    filter: "u",
    replacement: function (content) {
      return `<u>${content}</u>`;
    },
  });
  turndownService.addRule("headingOne", {
    filter: "h1",
    replacement: function (content) {
      return `# ${content}`;
    },
  });
  turndownService.addRule("headingTwo", {
    filter: "h2",
    replacement: function (content) {
      return `## ${content}`;
    },
  });

  const turndownedContent = turndownService.turndown(stringToTransform);

  return transformStringWithLineBreaks(turndownedContent);
};

export default convertHtmlStringToMarkdown;
