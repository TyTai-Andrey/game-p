const isNumber = (value: any): value is number => typeof value === 'number';
const isBoolean = (value: any): value is boolean => typeof value === 'boolean';
const isString = (value: any): value is string => typeof value === 'string';
const isUndefined = (value: any): value is undefined => typeof value === 'undefined';

export { isBoolean, isNumber, isString, isUndefined };
