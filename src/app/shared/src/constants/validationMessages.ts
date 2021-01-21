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

function requiredValidationMessage(label) {
  return `Please enter ${label}`;
}
function patternValidationMessage(label) {
  return `Please enter a valid ${label}`;
}
function minLengthValidationMessage(minLength) {
  return `Should have ${minLength} characters`;
}
function maxLengthValidationMessage(maxLength) {
  return `Should have less ${maxLength} characters`;
}
function minValueValidationMessage(min) {
  return `Should be more then ${min}`;
}
function maxValueValidationMessage(max) {
  return `Should be less then ${max}`;
}
