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
  value: string | Date;
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
  label: string;
  date: Date;
}

export interface WeightType {
  _id: string;
  weight: number;
  label: string;
  date: Date;
}

export interface DatasetType {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
}

export interface TimeFrameType {
  labels: string[];
  weights: WeightType[];
}

export interface ChartDataType {
  labels: string[];
  datasets: DatasetType[];
}
