export const isObject = (value: any) => value && typeof value === 'object' && !Array.isArray(value)
export const extend = Object.assign
export const isResource = (event) => event.target && (event.target?.src || event.target?.href)

export const getLines = (stack: string) => {
  return stack
    .split("\n")
    .slice(1)
    .map((item) => item.replace(/^\s+at\s+/g, ""))
    .join("^");
}
