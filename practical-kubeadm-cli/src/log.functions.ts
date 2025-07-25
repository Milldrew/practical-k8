const BAR = '──────────────────────────────────────────────────────────────';
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
    console.log(width);
    console.log(textLength);
    console.log('too long');
    return text;
  }
  const leftPadding = Math.floor((width - textLength) / 2);
  const rightPadding = width - textLength - leftPadding;
  console.log('left');
  console.log(leftPadding);
  console.log(rightPadding);
  return ' '.repeat(leftPadding) + text + ' '.repeat(rightPadding);
}

export function logParagraph(text: string) {
  text = `${text}\n${BAR}`;
  text = text.trim();
  text = breakLine(text);
  console.log(text);
}

function breakLine(text: string) {
  const lineLength = BAR.length - 2; // Subtract 2 for the surrounding spaces
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    if (currentLine.length + word.length + 1 > lineLength) {
      lines.push(currentLine.trim());
      currentLine = '';
    }
    currentLine += `${word} `;
  }

  if (currentLine.length > 0) {
    lines.push(currentLine.trim());
  }

  return lines.join('\n');
}
