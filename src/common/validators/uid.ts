import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator'

/**
 * ValidatorConstraintInterface validate if a string has uid format.
 */
@ValidatorConstraint()
export class UID implements ValidatorConstraintInterface {
  validate(value: string): boolean {
    return /^u(?:[0-9]{8}|[xyz][0-9]{7})/.test(value)
  }

  defaultMessage({ value }: ValidationArguments): string {
    return `${value} has not correct format.`
  }
}
