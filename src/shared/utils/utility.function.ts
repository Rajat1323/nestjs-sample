import { GenericItem } from "./utility.interface";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const generateGUID = (upperCase: boolean = true) => {
  const guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });

  return upperCase ? guid.toUpperCase() : guid.toLowerCase();
};

export const generateRandomAlphanumeric = (length: number = 6, uppercase: boolean = false) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return uppercase ? result.toUpperCase() : result;

}

/**
 * Generate 6 digit positive interger number range from 100000 - 900000
 * @returns 6 digit positive interger number
 */
export const generateRandomNumber = () => {
  return Math.floor(100000 + Math.random() * 900000);
}

export const objectToQueryString = (obj: any) => {
  const s = Object.keys(obj).map(function (key) {
    return key + '=' + obj[key];
  }).join('&');
  return s;
}

export const buildHierarchy = (
  data: GenericItem[],
  idKey: string,
  parentKey: string,
  childrenKey: string = 'childs'
) => {
  const map: { [key: string]: GenericItem } = {};
  const roots: GenericItem[] = [];

  // Initialize the map and children array
  data.forEach(item => {
    map[item[idKey]] = { ...item, [childrenKey]: [] };
  });

  // Build the hierarchical structure
  data.forEach(item => {
    if (item[parentKey] !== 0) {
      if (map[item[parentKey]]) {
        map[item[parentKey]][childrenKey].push(map[item[idKey]]);
      }
    } else {
      roots.push(map[item[idKey]]);
    }
  });

  return roots;
}

export const removeSpaces = (actualString: string, replaceString: string) => {
  return `${actualString.replace(/\s+/g, replaceString)}`;
}