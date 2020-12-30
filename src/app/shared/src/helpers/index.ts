export function isUndefined(value: any) {
  return typeof value === 'undefined';
}

export function isNullOrUndefined(value: any) {
  return value === null || isUndefined(value);
}

export function isFunction(value: any) {
  return typeof value === 'function';
}

export function isNumber(value: any) {
  return typeof value === 'number';
}

export function isString(value: any) {
  return typeof value === 'string';
}

export function isBoolean(value: any) {
  return typeof value === 'boolean';
}

export function isObject(value: any) {
  return value !== null && typeof value === 'object';
}

export function isArray<T>(item: T[] | any): item is Array<T> {
  return !!(item && item.constructor === Array);
}

export function isEmptyString(value) {
  return isUndefined(value) || (isString(value) && !value.length);
}
// Capitalize first letter in a string
// From: https://stackoverflow.com/a/43237732
export const capitalize = (str: string) =>
  `${str.charAt(0).toUpperCase()}${str.toLowerCase().substring(1)}`;

export function removeEmptyObjProperty(myObj: object) {
  const obj = { ...myObj };
  Object.keys(obj).forEach(
    (key) =>
      (isNullOrUndefined(obj[key]) || isEmptyString(obj[key])) &&
      delete obj[key]
  );
  return obj;
}
