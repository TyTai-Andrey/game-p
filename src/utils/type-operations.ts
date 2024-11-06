const isNumber = (value: any): value is number => typeof value === 'number';
const isBoolean = (value: any): value is boolean => typeof value === 'boolean';

export { isBoolean, isNumber };
