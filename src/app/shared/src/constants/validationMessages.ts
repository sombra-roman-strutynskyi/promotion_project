export function getDefaultValidationMessage(
  type,
  label = 'data',
  val: any = ''
) {
  switch (type) {
    case 'required':
      return requiredValidationMessage(label);
    case 'pattern':
      return patternValidationMessage(label);
    case 'minLength':
      return minLengthValidationMessage(val);
    case 'maxLength':
      return maxLengthValidationMessage(val);
    case 'min':
      return minValueValidationMessage(val);
    case 'max':
      return maxValueValidationMessage(val);
    default:
      return 'Error';
  }
}

export function requiredValidationMessage(label) {
  return `Please enter ${label}`;
}
export function patternValidationMessage(label) {
  return `Please enter a valid ${label}`;
}
export function minLengthValidationMessage(minLength) {
  return `Should have ${minLength} characters`;
}
export function maxLengthValidationMessage(maxLength) {
  return `Should have less ${maxLength} characters`;
}
export function minValueValidationMessage(min) {
  return `Should be more then ${min}`;
}
export function maxValueValidationMessage(max) {
  return `Should be less then ${max}`;
}
