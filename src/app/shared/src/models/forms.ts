
export interface UiFormButton {
  label?: string;
  type?: string;
  classNames?: string;
  classWrapper?: string;
  action?: {
    type?: string;
    payload?: any;
    handler?: () => void;
  };
  style?: {
    type?: string;
    color?: string;
  };
}
