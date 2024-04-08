export interface UserType {
  _id: string;
  username: string;
  password: string;
  weights: WeightType[];
}

export interface InputField {
  name: string;
  label: string;
  inputType: string;
  value: string;
  setValue: (value: string) => void;
}

export interface CheckboxField {
  name: string;
  label: string;
  value: boolean;
  setValue: (value: boolean) => void;
}

export interface AuthResult {
  success: boolean;
  message: string;
  user?: UserType;
  token?: string;
}

export interface UserResult {
  success: boolean;
  message: string;
}

export interface WeightFormData {
  weight: number;
  date: string;
}

export interface WeightType {
  _id: string;
  weight: number;
  date: string;
}

export interface EventStyleType {
  style: {
    backgroundColor: string | undefined;
    borderColor: string | undefined;
  };
}

export interface CurrentDayType {
  currentMonth: boolean;
  date: Date;
  month: number;
  number: number;
  selected: boolean;
  year: number;
}
