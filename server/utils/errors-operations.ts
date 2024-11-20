import { Response } from 'express';
import { FieldValidationError, Result, ValidationError } from 'express-validator';

type ICreateError = (res: Response, settings: {
  status?: number,
  message?: string,
  errors?: Result<ValidationError>
}) => void;

const createError: ICreateError = (res, {
  status = 400,
  message = 'Something went wrong',
  errors,
}) => res.status(status).json({
  message,
  errors: (errors?.array() as FieldValidationError[])
    ?.reduce((acc, error) => ({ ...acc, [error.path]: error.msg }), {})
    ?? {},
});

const createDefaultError = (res: Response) => createError(res, {
  message: 'Что-то пошло не так',
  status: 500,
});

export { createError, createDefaultError };
