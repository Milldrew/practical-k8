/**
 *node.js console.log green check mark icon
 */
export const GREEN_IS_VALID_ICON = '\x1b[32m✓\x1b[0m';
export const RED_IS_INVALID_ICON = '\x1b[31m✗\x1b[0m';

export function compareStringsAndReturnIcon(
  str1: string,
  str2: string,
): string {
  return str1 === str2 ? GREEN_IS_VALID_ICON : RED_IS_INVALID_ICON;
}
