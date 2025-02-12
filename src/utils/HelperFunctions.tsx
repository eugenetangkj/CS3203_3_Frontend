//Test if an input string is a valid hexadecimal colour code value
export const isStringValidHex = (color: string) => /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);