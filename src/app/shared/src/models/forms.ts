export interface ISelectOption {
  label: string;
  value: string;
}
export interface IFormFieldSyncValidation {
  required?: boolean;
  pattern?: RegExp;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

export interface IFormField {
  key: string;
  type: string;
  label?: string;
  options?: ISelectOption[];
  syncValidator?: IFormFieldSyncValidation;
  validationMessages?: { [key: string]: string };
}
