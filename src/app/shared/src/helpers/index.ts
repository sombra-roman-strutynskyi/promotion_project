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

/**
 * @description get nested property
 * @param keys  String | String[]
 * @param o Object
 * @tutorial https://glebbahmutov.com/blog/call-me-maybe/
 */
export function get(keys: string | string[], o: object) {
  keys = isArray(keys) ? keys : keys.split('.');
  return keys.reduce((xs, x) => (xs && xs[x] ? xs[x] : null), o);
}

/**
 * @tutorial https://stackoverflow.com/a/25835337/4115894
 * @description Creates an object composed of the picked object properties.
 * @param o Object
 * @param fields []
 */
export function pick(o, ...fields) {
  return fields.reduce((a, x) => {
    if (o.hasOwnProperty(x)) {
      a[x] = o[x];
    }
    return a;
  }, {});
}

/**
 * @tutorial https://gist.github.com/bisubus/2da8af7e801ffd813fab7ac221aa7afc#file-omit-es2017-js
 * @description this method creates an object composed of the own and inherited enumerable property paths of object that are not omitted.
 * @param obj Object
 * @param fields []
 */
export function omit(o, ...fields) {
  return Object.entries(o)
    .filter(([key]) => !fields.includes(key))
    .reduce((obj, [key, val]) => ({ ...obj, [key]: val }), {});
}

export function isEmptyObject(object, deep = false) {
  if (object == null) {
    return true;
  } else {
    if (Object.keys(object).length) {
      return deep
        ? Object.values(object).every((val) => isUndefined(val) || val === null)
        : false;
    }
    return true;
  }
}

export function deepMerge(source, obj) {
  const newObj = {};
  for (const key of Object.keys(source)) {
    if (obj instanceof Object && key in obj) {
      if (source[key] instanceof Object) {
        newObj[key] = deepMerge(source[key], obj[key]);
      } else {
        newObj[key] = isNullOrUndefined(obj[key]) ? source[key] : obj[key];
      }
    } else {
      newObj[key] = source[key];
    }
  }
  return newObj;
}

export function deepRemoveEmptyObjProperty(object) {
  const obj = { ...object };
  Object.keys(obj).forEach((key) => {
    const val = obj[key];
    if (isObject(val) && !isEmptyObject(val)) {
      obj[key] = deepRemoveEmptyObjProperty(val);
    }
    if (isNullOrUndefined(obj[key]) || isEmptyString(obj[key])) {
      delete obj[key];
    }
  });
  return obj;
}
