import { CamelObjectError, SnakeObjectError } from './error-types';
import {snakeToCamelObj, camelToSnakeObj } from './snake-camel'

const snakeObj = {
  hello_world: 'Hello World',
  my_prop: 'My Prop'
}

const camelObj = {
  helloWorld: 'Hello World',
  myProp: 'My Prop'
}

describe('snakeToCamelObj', () => {
  it('should transform object with "snake: properties to object with "camel" properties', () => {
    const result = snakeToCamelObj(snakeObj);
    expect(result).toEqual(camelObj);
  });

  it('should throw CamelObjectError', () => {
    expect(() => snakeToCamelObj([])).toThrow(SnakeObjectError);
    expect(() => snakeToCamelObj([])).toThrow('Wrong Snake Object property names');
  })
});

describe('camelToSnakeObj', () => {
  it('should transform object with "camel: properties to object with "snake" properties', () => {
    const result = camelToSnakeObj(camelObj);
    expect(result).toEqual(snakeObj);
  });

  it('should throw CamelObjectError', () => {
    expect(() => camelToSnakeObj([])).toThrow(CamelObjectError);
    expect(() => camelToSnakeObj([])).toThrow('Wrong Camel Object property names');
  })
});