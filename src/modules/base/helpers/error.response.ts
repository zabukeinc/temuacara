import { ValidationError } from '@nestjs/common';

export interface ValidationErrorResponse {
  field: string;
  message: string;
}

export function validationFormaterResponse(
  errors: ValidationError[],
  parent_field?: string,
): ValidationErrorResponse[] {
  let validation_errors: ValidationErrorResponse[] = [];

  errors.forEach((err: ValidationError) => {
    if (err.children && err.children.length > 0) {
      const error_children = validationFormaterResponse(
        err.children,
        err.property,
      );
      validation_errors = [...validation_errors, ...error_children];
    } else {
      const field =
        parent_field && parent_field !== ''
          ? `${parent_field}.${err.property}`
          : err.property;

      const messages = Object.values(err?.constraints || {});
      messages.forEach((message) => {
        validation_errors.push({
          field,
          message,
        });
      });
    }
  });

  return validation_errors;
}
