import { dbObject } from './interfaces';
import { CamelObjectError, SnakeObjectError } from './error-types';


const isArray = (obj: any): boolean => Array.isArray(obj);
const isObject = (obj: any): boolean => obj === Object(obj) && !isArray(obj) && typeof obj !== 'function';

const snakeToCamel = (key: string): string => {
  // '_c' => 'C', _1 => 1
  return key.replace(/([-_][a-z0-9])/ig, foundSubstr => {
    return foundSubstr.toUpperCase()
      .replace('-', '')
      .replace('_', '');
  });
};

const camelToSnake = (key: string): string => {
  // 'cC' => 'c_c',
  return key.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase();
};

export const snakeToCamelObj = (snakeObj: dbObject): dbObject => {
  if (isObject(snakeObj)) {
    const camelObj = {};
    Object.keys(snakeObj).forEach(key => camelObj[snakeToCamel(key)] = snakeObj[key]);
    return camelObj;
  } else {
    throw new SnakeObjectError('Wrong Snake Object property names');
  }
};

export const camelToSnakeObj = (camelObj: dbObject): dbObject => {
  if (isObject(camelObj)) {
    const snakeObj = {};
    Object.keys(camelObj).forEach(key => snakeObj[camelToSnake(key)] = camelObj[key]);
    return snakeObj;
  } else {
    throw new CamelObjectError('Wrong Camel Object property names');
  }
};