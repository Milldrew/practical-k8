const BAR =
  '───────────────────────────────────────────────────────────────────────────────────────';
export function logHeadline(text: string) {
  let originalText = text;
  text = text.trim();
  text = centerHeadlineText(text);
  text = text.toUpperCase();
  text = `${BAR}\n${text}\n${BAR}`;
  console.log(text);
}
function centerHeadlineText(text: string) {
  const width = BAR.length;
  const textLength = text.length;
  if (textLength >= width) {
    return text;
  }
  const leftPadding = Math.floor((width - textLength) / 2);
  const rightPadding = width - textLength - leftPadding;
  return ' '.repeat(leftPadding) + text + ' '.repeat(rightPadding);
}

export function logParagraph(text: string) {
  text = `${text}`;
  text = text;
  text = breakLine(text);
  console.log(BAR);
  console.log(text);
  console.log(BAR);
}

export function unorderedList(texts: string[]) {
  const text = texts.map((text) => `- ${text}`).join('\n');
  console.log(text);
}

function breakLine(text: string) {
  const lineLength = BAR.length - 2; // Subtract 2 for the surrounding spaces
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = ' ';

  for (const word of words) {
    const potentialLineLength = currentLine.length + word.length + 1; // +1 for space
    if (potentialLineLength > lineLength) {
      lines.push(currentLine);
      currentLine = ' ';
    }
    currentLine += `${word} `;
  }

  if (currentLine.length > 0) {
    lines.push(currentLine);
  }
  lines.map((text) => ` ${text} `); // Add spaces around each line for consistency

  return lines.join('\n');
}
