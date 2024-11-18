const isNumber = (value: unknown): value is number => typeof value === 'number';
const isBoolean = (value: unknown): value is boolean => typeof value === 'boolean';
const isString = (value: unknown): value is string => typeof value === 'string';
const isUndefined = (value: unknown): value is undefined => typeof value === 'undefined';

export { isBoolean, isNumber, isString, isUndefined };
