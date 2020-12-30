export interface ISelectOption {
  label: string;
  value: string;
}
export interface IFormFieldSyncValidation {
  required?: boolean;
  pattern?: RegExp;
}

export interface IFormField {
  key: string;
  type: string;
  label?: string;
  options?: ISelectOption[];
  syncValidator?: IFormFieldSyncValidation;
}
